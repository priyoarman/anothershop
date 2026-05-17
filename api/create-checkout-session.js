import Stripe from "stripe";
import { getCheckoutProduct, getPriceCents } from "../lib/checkoutCatalog.js";

const CURRENCY = "eur";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
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
    req.headers.get("origin") ||
    process.env.CLIENT_URL?.trim() ||
    "http://localhost:5173"
  );
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

export default async function handler(req) {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const { items } = await req.json();
    const { validatedItems, error } = validateCheckoutItems(items);

    if (error) {
      return jsonResponse({ error }, 400);
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

    return jsonResponse({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return jsonResponse(
      { error: error.message || "Failed to create checkout session." },
      500
    );
  }
}
