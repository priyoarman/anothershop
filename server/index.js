import dotenv from "dotenv";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText } from "ai";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: join(projectRoot, ".env") });

const PORT = process.env.PORT || 3002;
const AI_PROVIDER = (process.env.AI_PROVIDER || "groq").toLowerCase();

// ─── Base system prompt ───────────────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are the AnotherShop assistant, a friendly and helpful AI for an online store called AnotherShop.
Help customers with product questions, orders, shipping, returns, and general shopping advice.
Keep responses concise, warm, and practical. If you do not have specific information, say so and suggest contacting support.`;

// ─── Model helpers ────────────────────────────────────────────────────────────

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

// ─── RAG: PDF parsing, chunking, retrieval ────────────────────────────────────

let _catalogChunks = null;

async function getCatalogChunks() {
  if (_catalogChunks) return _catalogChunks;

  try {
    const pdfPath = join(projectRoot, "public", "rag_product_data_catalog.pdf");
    const buffer = readFileSync(pdfPath);
    const { text } = await pdfParse(buffer);
    _catalogChunks = chunkText(text, 500, 80);
    console.log(`[RAG] Loaded PDF → ${_catalogChunks.length} chunks`);
  } catch (err) {
    console.error("[RAG] Failed to load PDF:", err.message);
    _catalogChunks = [];
  }

  return _catalogChunks;
}

function chunkText(text, chunkSize = 500, overlap = 80) {
  const lines = text.split(/\n+/).filter((l) => l.trim().length > 15);
  const chunks = [];
  let current = "";

  for (const line of lines) {
    if (current.length + line.length > chunkSize && current) {
      chunks.push(current.trim());
      current = current.slice(-overlap) + line + "\n";
    } else {
      current += line + "\n";
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function scoreChunk(chunk, query) {
  const cl = chunk.toLowerCase();
  const words = query.toLowerCase().match(/\w{3,}/g) ?? [];
  return words.reduce(
    (score, word) => score + (cl.match(new RegExp(word, "g")) ?? []).length,
    0
  );
}

function retrieveRelevantChunks(chunks, query, topN = 5) {
  return chunks
    .map((c) => ({ c, s: scoreChunk(c, query) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, topN)
    .filter((x) => x.s > 0)
    .map((x) => x.c);
}

function extractLastUserQuery(messages) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "user") continue;

    if (typeof msg.content === "string" && msg.content) return msg.content;

    if (Array.isArray(msg.parts)) {
      const text = msg.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join(" ");
      if (text) return text;
    }

    if (Array.isArray(msg.content)) {
      const text = msg.content
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join(" ");
      if (text) return text;
    }
  }
  return "";
}

// ─── Request handler ──────────────────────────────────────────────────────────

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

    // ── RAG: retrieve relevant catalog chunks ────────────────────────────────
    const query = extractLastUserQuery(messages);
    const chunks = await getCatalogChunks();
    const relevantChunks = retrieveRelevantChunks(chunks, query);

    const systemPrompt =
      relevantChunks.length > 0
        ? `${BASE_SYSTEM_PROMPT}

[PRODUCT CATALOG CONTEXT — answer based on this information]
${relevantChunks.join("\n\n---\n\n")}

Instructions:
- Answer ONLY using the product catalog context provided above.
- If the question cannot be answered from the context, say "I don't have that information — please contact our support team."
- Do not make up products, prices, or details not present in the context.`
        : BASE_SYSTEM_PROMPT;

    // ── Stream response ──────────────────────────────────────────────────────
    const { model } = getModel();
    const result = streamText({
      model,
      system: systemPrompt,
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

// ─── HTTP Server ──────────────────────────────────────────────────────────────

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

server.listen(PORT, async () => {
  const { label } = getModel();
  console.log(`Chat API server running at http://localhost:${PORT}`);
  console.log(`AI provider: ${label}`);

  if (!getApiKey()) {
    console.warn(`\n⚠️  API key missing for ${AI_PROVIDER}\n   ${getKeyHint()}\n`);
  } else {
    console.log("API key loaded.");
  }

  // Pre-warm the PDF cache on startup
  await getCatalogChunks();
});
