"use client";

import { cn } from "@/lib/utils";
import { Inbox, Users, MessageCircle, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateType = "matches" | "introductions" | "messages" | "notifications" | "search";

interface EmptyStateProps {
  type: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const emptyStateConfig = {
  matches: {
    icon: Users,
    title: "No matches yet",
    description: "Your curated matches will appear here. Our matchmaker is reviewing profiles to find your perfect match.",
  },
  introductions: {
    icon: Heart,
    title: "No introductions yet",
    description: "When you express interest in a match, your introductions will be tracked here.",
  },
  messages: {
    icon: MessageCircle,
    title: "No messages yet",
    description: "Your conversations with the matchmaker will appear here.",
  },
  notifications: {
    icon: Inbox,
    title: "All caught up!",
    description: "You have no new notifications. We'll let you know when something happens.",
  },
  search: {
    icon: Search,
    title: "No results found",
    description: "Try adjusting your search criteria to find what you're looking for.",
  },
};

export function EmptyState({
  type,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div className="w-20 h-20 rounded-full bg-[#F5E0E8] flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-[#7B1E3A]" />
      </div>
      <h3 className="text-xl font-semibold text-[#2D1318] font-serif mb-2">
        {title || config.title}
      </h3>
      <p className="text-[#6B5B5E] max-w-sm mb-6">
        {description || config.description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#7B1E3A] hover:bg-[#5C1229] text-white rounded-lg px-6"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
