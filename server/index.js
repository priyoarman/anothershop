import dotenv from "dotenv";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText } from "ai";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: join(projectRoot, ".env") });

const PORT = process.env.PORT || 3002;
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
    return "Add GOOGLE_GENERATIVE_AI_API_KEY to .env (free: https://aistudio.google.com/apikey)";
  }
  return "Add GROQ_API_KEY to .env (free: https://console.groq.com/keys)";
}

async function handleChat(req, res) {
  try {
    let body = "";
    for await (const chunk of req) {
      body += chunk;
    }

    const { messages } = JSON.parse(body);

    if (!getApiKey()) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `No API key found. ${getKeyHint()}` }));
      return;
    }

    const { model } = getModel();

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
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
