import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  IoChatbubbleEllipses,
  IoClose,
  IoSend,
  IoChevronDown,
} from "react-icons/io5";

const INITIAL_MESSAGES = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi! I'm your AnotherShop assistant. Ask me about products, orders, or shipping.",
      },
    ],
  },
];

function getFriendlyErrorMessage(error) {
  const raw = error?.message ?? "";

  if (raw.includes("insufficient_quota")) {
    return "Your OpenAI account has no remaining quota. Add billing or credits at platform.openai.com, then try again.";
  }

  if (raw.includes("API key") || raw.includes("GOOGLE_GENERATIVE_AI")) {
    return "Add a free Gemini API key to .env. Get one at aistudio.google.com/apikey";
  }

  try {
    const parsed = JSON.parse(raw);
    const apiMessage =
      parsed?.error?.message ?? parsed?.message ?? parsed?.error;
    if (typeof apiMessage === "string") return apiMessage;
  } catch {
    // not JSON — use raw message below
  }

  return raw || "Something went wrong. Please try again.";
}

function getMessageText(message) {
  if (message.parts?.length) {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");
  }
  return message.content ?? "";
}

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.body.classList.contains("bg-gray-950")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains("bg-gray-950"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDarkMode;
}

function ChatMessage({ message, isDarkMode }) {
  const isUser = message.role === "user";
  const text = getMessageText(message);

  if (!text) return null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "rounded-br-md bg-orange-600 text-white"
            : isDarkMode
              ? "rounded-bl-md bg-slate-800 text-slate-100"
              : "rounded-bl-md bg-slate-100 text-slate-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function Chatbot() {
  const isDarkMode = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: INITIAL_MESSAGES,
  });

  const isLoading = status === "submitted" || status === "streaming";
  const isReady = status === "ready";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !isReady) return;

    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const panelClasses = isDarkMode
    ? "bg-slate-900 border-slate-700/80 text-slate-100"
    : "bg-white border-slate-200 text-slate-900";

  const headerClasses = isDarkMode
    ? "bg-slate-950/90 border-slate-700/80"
    : "bg-amber-50 border-slate-200";

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Shop assistant chat"
          className={`flex w-[min(100vw-2.5rem,24rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl shadow-black/20 transition-all duration-300 ${panelClasses}`}
          style={{ height: "min(30rem, calc(100vh - 6rem))" }}
        >
          <header
            className={`flex shrink-0 items-center justify-between border-b px-4 py-3 ${headerClasses}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-white">
                <IoChatbubbleEllipses className="text-lg" />
              </span>
              <div>
                <h3 className="font-semibold text-yellow-600">Shop Assistant</h3>
                <p
                  className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  {error ? "Connection issue" : isLoading ? "Typing…" : "Online"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`rounded-lg p-1.5 transition-colors hover:bg-black/10 ${
                isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500"
              }`}
              aria-label="Minimize chat"
            >
              <IoChevronDown className="text-xl" />
            </button>
          </header>

          <div
            className={`flex-1 space-y-3 overflow-y-auto px-4 py-4 ${
              isDarkMode ? "bg-slate-900/50" : "bg-slate-50/80"
            }`}
          >
            {error && (
              <div
                className={`rounded-xl border px-3 py-2 text-xs ${
                  isDarkMode
                    ? "border-red-900/50 bg-red-950/40 text-red-300"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {getFriendlyErrorMessage(error)}
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isDarkMode={isDarkMode}
              />
            ))}

            {status === "submitted" && (
              <div className="flex justify-start">
                <div
                  className={`flex items-center gap-1 rounded-2xl rounded-bl-md px-4 py-3 ${
                    isDarkMode ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className={`shrink-0 border-t p-3 ${isDarkMode ? "border-slate-700/80 bg-slate-950/50" : "border-slate-200 bg-white"}`}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                rows={1}
                disabled={!isReady}
                className={`max-h-24 min-h-[2.5rem] flex-1 resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-orange-500/40 disabled:opacity-60 ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                    : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                }`}
              />
              <button
                type="submit"
                disabled={!input.trim() || !isReady}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <IoSend className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-slate-700 text-white hover:bg-slate-600"
            : "bg-orange-600 text-white hover:bg-orange-500"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <IoClose className="text-2xl" />
        ) : (
          <IoChatbubbleEllipses className="text-2xl" />
        )}
      </button>
    </div>
  );
}

export default Chatbot;
