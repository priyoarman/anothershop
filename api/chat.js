import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText } from "ai";
import { getProductCatalogContext } from "../lib/productCatalogRag.js";

export const maxDuration = 30;

const AI_PROVIDER = (process.env.AI_PROVIDER || "groq").toLowerCase();

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
    return "Add GOOGLE_GENERATIVE_AI_API_KEY to Vercel environment variables.";
  }
  return "Add GROQ_API_KEY to Vercel environment variables.";
}

function sendJson(res, statusCode, data) {
  res.status(statusCode).json(data);
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  return body ? JSON.parse(body) : {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

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
      sendJson(res, 500, {
        error: error.message || "Failed to process chat request.",
      });
      return;
    }

    res.end();
  }
}
