import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText } from "ai";

export const config = {
  runtime: 'edge',
};

const AI_PROVIDER = (process.env.AI_PROVIDER || "groq").toLowerCase();

const SYSTEM_PROMPT = `You are the AnotherShop assistant, a friendly and helpful AI for an online store called AnotherShop.
Help customers with product questions, orders, shipping, returns, and general shopping advice.
Keep responses concise, warm, and practical. If you do not have specific order data, say so and suggest checking the cart or contacting support.`;

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

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();

    if (!getApiKey()) {
      return new Response(JSON.stringify({ error: `No API key found. ${getKeyHint()}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const { model } = getModel();

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to process chat request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
