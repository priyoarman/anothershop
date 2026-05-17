import dotenv from "dotenv";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import Stripe from "stripe";
import { convertToModelMessages, streamText } from "ai";
import { getCheckoutProduct, getPriceCents } from "../lib/checkoutCatalog.js";
import { getProductCatalogContext } from "../lib/productCatalogRag.js";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: join(projectRoot, ".env") });

const PORT = process.env.PORT || 3002;
const AI_PROVIDER = (process.env.AI_PROVIDER || "groq").toLowerCase();
const CURRENCY = "eur";

const SYSTEM_PROMPT = `You are the AnotherShop assistant, a friendly and helpful AI for an online store called AnotherShop.
Help customers with product questions, orders, shipping, returns, and general shopping advice.
Keep responses concise, warm, and practical.
When answering product questions, use the Product Catalog Context below as your source of truth.
If the catalog context does not contain the requested product detail, say you could not find that detail in the catalog instead of guessing.
If you do not have specific order data, say so and suggest checking the cart or contacting support.`;

function getModel() {
  if (AI_PROVIDER === "gemini") {
    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash-lite";
    return { model: google(modelName), label: `Gemini (${modelName})` };
  }

  const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  return { model: groq(groqModel), label: `Groq (${groqModel})` };
}

function getApiKey() {
  if (AI_PROVIDER === "gemini") {
    return (
      process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
      process.env.GEMINI_API_KEY?.trim()
    );
  }
  return process.env.GROQ_API_KEY?.trim();
}

function getKeyHint() {
  if (AI_PROVIDER === "gemini") {
    return "Add GOOGLE_GENERATIVE_AI_API_KEY to .env (free: https://aistudio.google.com/apikey)";
  }
  return "Add GROQ_API_KEY to .env (free: https://console.groq.com/keys)";
}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY in .env.");
  }

  if (secretKey.includes("_live_") && process.env.STRIPE_ALLOW_LIVE_PAYMENTS !== "true") {
    throw new Error(
      "Live Stripe key detected. Use a test key for development, or set STRIPE_ALLOW_LIVE_PAYMENTS=true to enable live checkout sessions."
    );
  }

  return new Stripe(secretKey);
}

function getAppUrl(req) {
  return (
    req.headers.origin ||
    process.env.CLIENT_URL?.trim() ||
    "http://localhost:5173"
  );
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

async function readJsonBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  return body ? JSON.parse(body) : {};
}

function validateCheckoutItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: "Checkout requires at least one cart item." };
  }

  const validatedItems = [];

  for (const item of items) {
    const product = getCheckoutProduct(item?.id);
    const quantity = Number(item?.quantity);

    if (!product) {
      return { error: `Unknown product id: ${item?.id}` };
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return {
        error: `Invalid quantity for product id ${item?.id}. Quantity must be between 1 and 99.`,
      };
    }

    const unitAmount = getPriceCents(product.price);

    validatedItems.push({
      id: product.id,
      title: product.title,
      quantity,
      unitAmount,
      lineAmount: unitAmount * quantity,
    });
  }

  return { validatedItems };
}

async function handleCreateCheckoutSession(req, res) {
  try {
    const { items } = await readJsonBody(req);
    const { validatedItems, error } = validateCheckoutItems(items);

    if (error) {
      sendJson(res, 400, { error });
      return;
    }

    const appUrl = getAppUrl(req);
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: validatedItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: CURRENCY,
          unit_amount: item.unitAmount,
          product_data: {
            name: item.title,
          },
        },
      })),
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata: {
        productIds: validatedItems.map((item) => item.id).join(","),
      },
    });

    sendJson(res, 200, {
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    sendJson(res, 500, {
      error: error.message || "Failed to create checkout session.",
    });
  }
}

async function handleChat(req, res) {
  try {
    const { messages } = await readJsonBody(req);

    if (!getApiKey()) {
      sendJson(res, 500, { error: `No API key found. ${getKeyHint()}` });
      return;
    }

    const { model } = getModel();
    const productCatalogContext = await getProductCatalogContext(messages);
    const system = productCatalogContext
      ? `${SYSTEM_PROMPT}\n\nProduct Catalog Context:\n${productCatalogContext}`
      : SYSTEM_PROMPT;

    const result = streamText({
      model,
      system,
      messages: await convertToModelMessages(messages),
    });

    const response = result.toUIMessageStreamResponse();

    res.writeHead(response.status, Object.fromEntries(response.headers));

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }

    res.end();
  } catch (error) {
    console.error("Chat API error:", error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: error.message || "Failed to process chat request.",
        })
      );
    }
  }
}

const server = createServer(async (req, res) => {
  const path = req.url?.split("?")[0];

  if (req.method === "POST" && path === "/api/chat") {
    await handleChat(req, res);
    return;
  }

  if (req.method === "POST" && path === "/api/create-checkout-session") {
    await handleCreateCheckoutSession(req, res);
    return;
  }

  res.writeHead(404);
  res.end();
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the other process or set PORT in .env.`
    );
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  const { label } = getModel();
  console.log(`Chat API server running at http://localhost:${PORT}`);
  console.log(`AI provider: ${label}`);

  if (!getApiKey()) {
    console.warn(`\n⚠️  API key missing for ${AI_PROVIDER}\n   ${getKeyHint()}\n`);
  } else {
    console.log("API key loaded.");
  }
});
