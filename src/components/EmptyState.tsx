"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-soft-rose flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-burgundy" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-dark mb-2">
        {title}
      </h3>
      <p className="text-warm-gray max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && (actionHref || onAction) && (
        <Button
          onClick={onAction}
          asChild={!!actionHref}
        >
          {actionHref ? (
            <a href={actionHref}>{actionLabel}</a>
          ) : (
            actionLabel
          )}
        </Button>
      )}
    </div>
  );
}
