"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Message } from "@/lib/mock-data";

interface ChatInterfaceProps {
  messages: Message[];
  currentUserId: string;
  matchmakerName?: string;
  matchmakerAvatar?: string;
  onSendMessage?: (content: string) => void;
  className?: string;
}

export function ChatInterface({
  messages,
  currentUserId,
  matchmakerName = "Your Matchmaker",
  matchmakerAvatar,
  onSendMessage,
  className,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = "";

  messages.forEach((message) => {
    const messageDate = formatDate(message.timestamp);
    if (messageDate !== currentDate) {
      currentDate = messageDate;
      groupedMessages.push({ date: messageDate, messages: [message] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    }
  });

  return (
    <div className={cn("flex flex-col h-full bg-[#FFF8F0]", className)}>
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 bg-white border-b border-[#FECDD3]/50">
        {matchmakerAvatar && (
          <img
            src={matchmakerAvatar}
            alt={matchmakerName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#F5E0E8]"
          />
        )}
        <div>
          <h3 className="font-semibold text-[#2D1318]">{matchmakerName}</h3>
          <p className="text-xs text-[#6B5B5E]">Your dedicated matchmaker</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Date Separator */}
            <div className="flex justify-center mb-4">
              <span className="text-xs text-[#6B5B5E] bg-white px-3 py-1 rounded-full shadow-sm border border-[#FECDD3]/50">
                {group.date}
              </span>
            </div>

            {/* Messages */}
            <div className="space-y-3">
              {group.messages.map((message) => {
                const isFromMatchmaker = message.isFromMatchmaker;

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      isFromMatchmaker ? "justify-start" : "justify-end"
                    )}
                  >
                    {isFromMatchmaker && (
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-[#F5E0E8]"
                      />
                    )}

                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm",
                        isFromMatchmaker
                          ? "bg-white border border-[#FECDD3]/50 rounded-tl-sm"
                          : "bg-[#7B1E3A] text-white rounded-tr-sm"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={cn(
                          "text-[10px] mt-1 text-right",
                          isFromMatchmaker ? "text-[#6B5B5E]" : "text-white/70"
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>

                    {!isFromMatchmaker && (
                      <img
                        src={message.senderAvatar}
                        alt={message.senderName}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-[#F5E0E8]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#FECDD3]/50">
        <div className="flex items-end gap-2">
          <button
            className="p-2 text-[#6B5B5E] hover:text-[#7B1E3A] hover:bg-[#F5E0E8] rounded-full transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full resize-none rounded-2xl border border-[#E3C4A8] px-4 py-2.5 text-sm 
                         focus:outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10
                         min-h-[44px] max-h-32"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-[#7B1E3A] hover:bg-[#5C1229] text-white rounded-full w-10 h-10 p-0 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
