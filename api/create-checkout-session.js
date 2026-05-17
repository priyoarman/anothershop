import Stripe from "stripe";
import { getCheckoutProduct, getPriceCents } from "../lib/checkoutCatalog.js";

const CURRENCY = "eur";

function sendJson(res, statusCode, data) {
  res.status(statusCode).json(data);
}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY in Vercel environment variables.");
  }

  if (
    secretKey.includes("_live_") &&
    process.env.STRIPE_ALLOW_LIVE_PAYMENTS !== "true"
  ) {
    throw new Error(
      "Live Stripe key detected. Set STRIPE_ALLOW_LIVE_PAYMENTS=true to enable live checkout sessions."
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
    });
  }

  return { validatedItems };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

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
