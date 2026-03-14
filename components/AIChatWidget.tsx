"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    window.addEventListener("open-ai-chat", handler);
    return () => window.removeEventListener("open-ai-chat", handler);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!res.ok) throw new Error("Request failed");

      const data = (await res.json()) as { answer?: string; error?: string };
      const answer =
        data.answer ||
        data.error ||
        "Sorry, I couldn't generate a response right now.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while talking to the AI. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickAsk = (question: string) => {
    setInput(question);
    setTimeout(() => {
      void sendMessage();
    }, 0);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-20 right-4 z-30 rounded-full border border-primary bg-primary/90 px-4 py-2 text-xs font-semibold text-black shadow-glow-primary md:right-6 pb-safe"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close Chat" : "Ask About Murugan"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-[5.5rem] right-4 z-30 w-[90vw] max-w-sm rounded-2xl border border-gray-800 bg-accent/95 shadow-2xl backdrop-blur md:right-6"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Ask About Murugan"
          >
            <div className="flex items-center justify-between border-b border-gray-800 px-3 py-2">
              <div>
                <p className="text-xs font-semibold text-primary">
                  Ask About Murugan
                </p>
                <p className="text-[10px] text-gray-400">
                  Ask about skills, experience, projects, or contact.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-64 space-y-2 overflow-y-auto px-3 py-2 text-xs">
              {messages.length === 0 && (
                <p className="text-[11px] text-gray-400">
                  Example questions: &quot;Who are you?&quot;, &quot;What
                  technologies do you use?&quot;, &quot;What projects have you
                  worked on?&quot;, &quot;How can I contact you?&quot;
                </p>
              )}
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                      m.role === "user"
                        ? "bg-primary text-black"
                        : "bg-black/50 text-gray-100"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <p className="text-[11px] text-gray-400">
                  Thinking about the best answer…
                </p>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-gray-800 px-3 py-2">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  className="flex-1 rounded-full border border-gray-700 bg-black/40 px-3 py-1 text-xs text-gray-100 outline-none focus:border-primary"
                  placeholder="Ask something about Murugan…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full border border-primary bg-primary/90 px-3 py-1 text-[11px] font-semibold text-black disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-gray-600"
                >
                  Send
                </button>
              </form>
              <div className="mt-2 flex flex-wrap gap-1">
                {[
                  "Who are you?",
                  "What technologies do you use?",
                  "What projects have you worked on?",
                  "How can I contact you?"
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => quickAsk(q)}
                    className="rounded-full border border-gray-700 bg-black/40 px-2 py-1 text-[10px] text-gray-300 hover:border-primary hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

