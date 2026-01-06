'use client';

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  postContent: string;
};

export default function PostQABot({ postContent }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ask me anything about this post. I’ll answer based only on its content.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/posts/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          postContent,
        }),
      });

      if (!res.ok) throw new Error("Failed to get answer.");

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong." },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // async function sendMessage() {
  //   if (!input.trim() || loading) return;

  //   const userMessage: Message = {
  //     role: "user",
  //     content: input,
  //   };

  //   setMessages(prev => [...prev, userMessage]);
  //   setInput("");
  //   setLoading(true);

  //   // TEMP mock response
  //   setTimeout(() => {
  //     setMessages(prev => [
  //       ...prev,
  //       {
  //         role: "assistant",
  //         content:
  //           "Based on the post, Array.map does not mutate the original array. It always returns a new one.",
  //       },
  //     ]);
  //     setLoading(false);
  //   }, 800);
  // }

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-center border-b py-3 text-sm font-medium text-gray-700">
        Your personal assistant
      </div>

      {/* Messages */}
      <div className="h-[300px] overflow-y-auto space-y-4 p-4">
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            role={msg.role}
            content={msg.content}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          rows={1}
          className="flex-1 resize-none rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-md bg-[rgb(var(--primary))] px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </section>
  );
}
