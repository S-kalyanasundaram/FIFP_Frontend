import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage"; // Make sure this exists

export default function ChatWindow({ messages, loading }) {
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg, i) => (
        <ChatMessage key={i} sender={msg.sender} text={msg.text} />
      ))}

      {loading && (
        <div className="flex items-center gap-2 py-2">
          <div
            className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <span className="ml-2 text-gray-500">Bot is typing...</span>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
