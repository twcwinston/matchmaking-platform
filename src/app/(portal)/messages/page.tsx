"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/portal/chat-interface";
import { messages, currentUser } from "@/lib/mock-data";
import type { Message } from "@/lib/mock-data";

export default function MessagesPage() {
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.photoUrl,
      content,
      timestamp: new Date().toISOString(),
      isFromMatchmaker: false,
    };
    setChatMessages((prev) => [...prev, newMessage]);

    // Simulate matchmaker response after a delay
    setTimeout(() => {
      const responses = [
        "Thank you for your message! I'll look into this and get back to you shortly.",
        "That's a great question! Let me check on that for you.",
        "I appreciate you reaching out. I'll review this and respond soon.",
        "Thanks for keeping me updated! I'll take care of this.",
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];

      const matchmakerReply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: "matchmaker",
        senderName: "Sabrina Chowdhury",
        senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        content: response,
        timestamp: new Date().toISOString(),
        isFromMatchmaker: true,
      };
      setChatMessages((prev) => [...prev, matchmakerReply]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#FECDD3]/50 p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#2D1318] mb-1">Messages</h1>
        <p className="text-[#6B5B5E] text-sm">
          Chat with your dedicated matchmaker for guidance and updates.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface
          messages={chatMessages}
          currentUserId={currentUser.id}
          matchmakerName="Sabrina Chowdhury"
          matchmakerAvatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
          onSendMessage={handleSendMessage}
          className="h-full"
        />
      </div>
    </div>
  );
}
