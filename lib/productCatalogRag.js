import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const parsePdf = require("pdf-parse/lib/pdf-parse.js");

const CATALOG_PATH = join(process.cwd(), "public", "product_data_catalog.pdf");
const MAX_CONTEXT_CHUNKS = 4;
const MAX_CONTEXT_CHARS = 4200;
const MIN_TOKEN_LENGTH = 2;

let catalogPromise;

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function getMessageText(message) {
  if (Array.isArray(message?.parts)) {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ");
  }

  return typeof message?.content === "string" ? message.content : "";
}

function tokenize(text) {
  return normalizeText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s.'-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= MIN_TOKEN_LENGTH);
}

function getQueryPhrases(tokens) {
  const phrases = [];

  for (let size = 2; size <= 4; size += 1) {
    for (let index = 0; index <= tokens.length - size; index += 1) {
      phrases.push(tokens.slice(index, index + size).join(" "));
    }
  }

  return phrases;
}

function buildChunks(text) {
  const sections = text
    .split(/(?=PRODUCT REFERENCE ID:\s*\d+)/g)
    .map(normalizeText)
    .filter(Boolean);

  return sections.map((content, index) => {
    const referenceMatch = content.match(/PRODUCT REFERENCE ID:\s*(\d+)/i);
    const titleMatch = content.match(
      /PRODUCT REFERENCE ID:\s*\d+\s+(.+?)\s+Category:/i,
    );

    return {
      id: referenceMatch?.[1] ?? String(index + 1),
      title: titleMatch?.[1]?.trim() ?? `Catalog section ${index + 1}`,
      content,
      tokens: tokenize(content),
    };
  });
}

async function loadCatalog() {
  if (!catalogPromise) {
    catalogPromise = readFile(CATALOG_PATH)
      .then((buffer) => parsePdf(buffer))
      .then((parsed) => buildChunks(parsed.text));
  }

  return catalogPromise;
}

function scoreChunk(chunk, query, queryTokens) {
  const content = chunk.content.toLowerCase();
  const title = chunk.title.toLowerCase();
  const chunkTokenSet = new Set(chunk.tokens);
  const queryPhrases = getQueryPhrases(queryTokens);

  let score = 0;

  for (const token of queryTokens) {
    if (chunkTokenSet.has(token)) score += 2;
    if (title.includes(token)) score += 3;
  }

  if (query && content.includes(query)) score += 12;
  if (query && title.includes(query)) score += 16;

  for (const phrase of queryPhrases) {
    if (content.includes(phrase)) score += phrase.length;
    if (title.includes(phrase)) score += phrase.length * 3;
  }

  const idMatch = query.match(/\b(?:id|reference|product)\s*#?\s*(\d+)\b/i);
  if (idMatch?.[1] === chunk.id) score += 25;

  return score;
}

function getLatestUserMessage(messages) {
  return [...(messages ?? [])]
    .reverse()
    .find((message) => message?.role === "user");
}

export async function getProductCatalogContext(messages) {
  const latestUserMessage = getLatestUserMessage(messages);
  const userText = getMessageText(latestUserMessage);
  const query = normalizeText(userText).toLowerCase();
  const queryTokens = tokenize(userText);

  if (!queryTokens.length) return "";

  const chunks = await loadCatalog();
  const matches = chunks
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(chunk, query, queryTokens),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CONTEXT_CHUNKS);

  if (!matches.length) return "";

  let context = "";

  for (const match of matches) {
    const next = `[Product reference ${match.id}: ${match.title}]\n${match.content}\n\n`;
    if (context.length + next.length > MAX_CONTEXT_CHARS) break;
    context += next;
  }

  return context.trim();
}
