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

function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const text = getMessageText(message);

  if (!text) return null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-bot"}`}
      >
        {text}
      </div>
    </div>
  );
}

function ChatPanel({ isPage = false, onClose }) {
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

  const panelSizeClasses = isPage
    ? "h-[calc(100dvh-3.75rem)] w-full border-0 shadow-none sm:h-[calc(100dvh-4.25rem)]"
    : "chat-panel-floating h-[min(28rem,calc(100vh-7rem))] w-[min(100vw-2.5rem,24rem)] rounded-[5px] border";

  return (
    <div
      role={isPage ? undefined : "dialog"}
      aria-label="Shop assistant chat"
      className={`chat-panel flex overscroll-contain flex-col overflow-hidden transition-all duration-300 ${panelSizeClasses}`}
    >
      <header className="chat-header flex shrink-0 items-center justify-between border-b px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="chat-avatar flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            <IoChatbubbleEllipses className="text-lg" />
          </span>
          <div className="min-w-0">
            <h3 className="chat-title truncate">AnotherShop Assistant</h3>
            <p className="chat-status">
              {error ? "Connection issue" : isLoading ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="chat-icon-button rounded-full p-1.5"
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

      <div className="chat-messages flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {error && (
          <div className="chat-error">{getFriendlyErrorMessage(error)}</div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="chat-bubble chat-bubble-bot flex items-center gap-1 px-4 py-3">
              <span className="chat-dot h-2 w-2 animate-bounce rounded-full [animation-delay:0ms]" />
              <span className="chat-dot h-2 w-2 animate-bounce rounded-full [animation-delay:150ms]" />
              <span className="chat-dot h-2 w-2 animate-bounce rounded-full [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="chat-form shrink-0 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="chat-input max-h-24 min-h-[2.5rem] flex-1 resize-none px-3 py-2.5 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || !isReady}
            className="chat-send flex h-10 w-10 shrink-0 items-center justify-center"
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
        className={`chat-launcher group h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? "hidden sm:flex" : "flex"
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
