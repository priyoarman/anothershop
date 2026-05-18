import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoChatbubbleEllipses,
  IoClose,
  IoSend,
  IoChevronDown,
  IoArrowBack,
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

  if (
    raw.includes("quota") ||
    raw.includes("Quota exceeded") ||
    raw.includes("rate-limit")
  ) {
    return "Free tier limit hit. Switch to Groq: set AI_PROVIDER=groq and GROQ_API_KEY in .env (free key at console.groq.com), then restart npm run dev.";
  }

  if (raw.includes("insufficient_quota")) {
    return "API quota exceeded. Try Groq (free) or wait a minute and retry.";
  }

  if (raw.includes("API key") || raw.includes("GROQ_API_KEY")) {
    return "Add GROQ_API_KEY to .env — free key at console.groq.com/keys";
  }

  if (raw.includes("GOOGLE_GENERATIVE_AI")) {
    return "Add GOOGLE_GENERATIVE_AI_API_KEY to .env — free key at aistudio.google.com/apikey";
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
    document.body.classList.contains("bg-gray-950"),
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 639px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
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

function ChatPanel({ isPage = false, onClose }) {
  const isDarkMode = useDarkMode();
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
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || !isReady) {
      inputRef.current?.focus();
      return;
    }

    sendMessage({ text: trimmed });
    setInput("");
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
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

  const panelSizeClasses = isPage
    ? "h-[calc(100dvh-3.75rem)] w-full border-0 shadow-none sm:h-[calc(100dvh-4.25rem)]"
    : "h-[min(30rem,calc(100vh-6rem))] w-[min(100vw-2.5rem,24rem)] rounded-2xl border shadow-2xl shadow-black/20";

  return (
    <div
      role={isPage ? undefined : "dialog"}
      aria-label="Shop assistant chat"
      className={`flex overscroll-contain flex-col overflow-hidden transition-all duration-300 ${panelSizeClasses} ${panelClasses}`}
    >
      <header
        className={`flex shrink-0 items-center justify-between border-b px-4 py-3 ${headerClasses}`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white">
            <IoChatbubbleEllipses className="text-lg" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-yellow-600">
              Shop Assistant
            </h3>
            <p
              className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              {error ? "Connection issue" : isLoading ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg p-1.5 transition-colors hover:bg-black/10 ${
              isDarkMode
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-500"
            }`}
            aria-label={isPage ? "Back from chat" : "Minimize chat"}
          >
            {isPage ? (
              <IoArrowBack className="text-xl" />
            ) : (
              <IoChevronDown className="text-xl" />
            )}
          </button>
        )}
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
        className={`shrink-0 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${isDarkMode ? "border-slate-700/80 bg-slate-950/50" : "border-slate-200 bg-white"}`}
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className={`max-h-24 min-h-[2.5rem] flex-1 resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-orange-500/40 ${
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
  );
}

export function ChatPage() {
  const navigate = useNavigate();

  return (
    <section className="flex h-[calc(100dvh-3.75rem)] w-full">
      <ChatPanel isPage onClose={() => navigate(-1)} />
    </section>
  );
}

function Chatbot() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (location.pathname === "/chat") return null;

  const handleToggle = () => {
    if (isMobile) {
      navigate("/chat");
      return;
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed right-5 bottom-5 z-[9999] flex flex-col items-end gap-3">
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}

      <button
        type="button"
        onClick={handleToggle}
        className={`group h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? "hidden sm:flex" : "flex"
        } ${
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
