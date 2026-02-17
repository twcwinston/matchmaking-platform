"use client";

import { cn } from "@/lib/utils";
import { Check, Crown, Clock } from "lucide-react";

interface StatusBadgeProps {
  type: "verified" | "pending" | "premium";
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ type, size = "md", className }: StatusBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
  };

  const variants = {
    verified: {
      bg: "bg-gradient-to-r from-emerald-50 to-[#FFF8F0] border border-emerald-200",
      text: "text-emerald-700",
      icon: <Check className={cn("stroke-[2.5px]", size === "sm" ? "w-3 h-3" : "w-4 h-4")} />,
      label: "Verified",
    },
    pending: {
      bg: "bg-yellow-50 border border-yellow-200",
      text: "text-yellow-700",
      icon: <Clock className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4")} />,
      label: "Pending",
    },
    premium: {
      bg: "bg-gradient-to-r from-[#C9956B] to-[#E3C4A8] border border-[#C9956B]",
      text: "text-white",
      icon: <Crown className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4")} />,
      label: "Premium",
    },
  };

  const variant = variants[type];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variant.bg,
        variant.text,
        sizeClasses[size],
        className
      )}
    >
      {variant.icon}
      {variant.label}
    </span>
  );
}
