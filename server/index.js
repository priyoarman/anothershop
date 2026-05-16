import dotenv from "dotenv";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: join(projectRoot, ".env") });

const PORT = process.env.PORT || 3002;

const SYSTEM_PROMPT = `You are the AnotherShop assistant, a friendly and helpful AI for an online store called AnotherShop.
Help customers with product questions, orders, shipping, returns, and general shopping advice.
Keep responses concise, warm, and practical. If you do not have specific order data, say so and suggest checking the cart or contacting support.`;

function getApiKey() {
  return process.env.OPENAI_API_KEY?.trim();
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
      res.end(
        JSON.stringify({
          error:
          "No API key found. Add OPENAI_API_KEY to .env",
        })
      );
      return;
    }

    const result = streamText({
      model: openai("gpt-4o"),
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
  console.log(`Chat API server running at http://localhost:${PORT}`);
  console.log("Using OpenAI GPT-4o");

  if (!getApiKey()) {
    console.warn(
      "\n⚠️  OPENAI_API_KEY is missing from .env\n" +
        "   Get a key: https://platform.openai.com/api-keys\n" +
        "   Then add to .env:\n" +
        "   OPENAI_API_KEY=your-key-here\n"
    );
  } else {
    console.log("OpenAI API key loaded.");
  }
});
