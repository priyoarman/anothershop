import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText } from "ai";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const _pdfParseModule = require("pdf-parse");
const pdfParse = typeof _pdfParseModule === "function" ? _pdfParseModule : (_pdfParseModule.default ?? _pdfParseModule);

// ─── Config ───────────────────────────────────────────────────────────────────

const AI_PROVIDER = (process.env.AI_PROVIDER || "groq").toLowerCase();

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
    return "Add GOOGLE_GENERATIVE_AI_API_KEY to Vercel environment variables.";
  }
  return "Add GROQ_API_KEY to Vercel environment variables.";
}

// ─── RAG: PDF parsing, chunking, retrieval ────────────────────────────────────

/** Module-level cache so the PDF is parsed only once per cold start. */
let _catalogChunks = null;

async function getCatalogChunks() {
  if (_catalogChunks) return _catalogChunks;

  try {
    const pdfPath = join(process.cwd(), "public", "rag_product_data_catalog.pdf");
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

/**
 * Split text into overlapping chunks.
 * @param {string} text
 * @param {number} chunkSize  Target chunk character length
 * @param {number} overlap    Characters from the previous chunk to carry over
 */
function chunkText(text, chunkSize = 500, overlap = 80) {
  const lines = text.split(/\n+/).filter((l) => l.trim().length > 15);
  const chunks = [];
  let current = "";

  for (const line of lines) {
    if (current.length + line.length > chunkSize && current) {
      chunks.push(current.trim());
      // carry the tail of the previous chunk for context continuity
      current = current.slice(-overlap) + line + "\n";
    } else {
      current += line + "\n";
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

/** TF-IDF-style keyword overlap score for a single chunk vs. query. */
function scoreChunk(chunk, query) {
  const cl = chunk.toLowerCase();
  const words = query.toLowerCase().match(/\w{3,}/g) ?? [];
  return words.reduce(
    (score, word) => score + (cl.match(new RegExp(word, "g")) ?? []).length,
    0
  );
}

/** Return the top-N most relevant chunks for a given query. */
function retrieveRelevantChunks(chunks, query, topN = 5) {
  return chunks
    .map((c) => ({ c, s: scoreChunk(c, query) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, topN)
    .filter((x) => x.s > 0)
    .map((x) => x.c);
}

/** Extract plain text from the last user UIMessage. */
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

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { messages } = await req.json();

    if (!getApiKey()) {
      return new Response(
        JSON.stringify({ error: `No API key found. ${getKeyHint()}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── RAG: retrieve relevant catalog chunks for the user's query ───────────
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

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process chat request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
