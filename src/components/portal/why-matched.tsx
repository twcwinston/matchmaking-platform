"use client";

import { cn } from "@/lib/utils";
import {
  Heart,
  Sun,
  GraduationCap,
  Laptop,
  ChefHat,
  MessageCircle,
  Handshake,
  Home,
  BookOpen,
  Palette,
  Plane,
  Briefcase,
  Cpu,
  Globe,
  Target,
  Rocket,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  sun: Sun,
  "graduation-cap": GraduationCap,
  laptop: Laptop,
  "chef-hat": ChefHat,
  "message-circle": MessageCircle,
  "heart-handshake": Handshake,
  home: Home,
  "book-open": BookOpen,
  palette: Palette,
  plane: Plane,
  briefcase: Briefcase,
  cpu: Cpu,
  globe: Globe,
  target: Target,
  rocket: Rocket,
  "trending-up": TrendingUp,
  users: Users,
};

interface WhyMatchedItem {
  area: string;
  description: string;
  icon: string;
}

interface WhyMatchedProps {
  items: WhyMatchedItem[];
  className?: string;
}

export function WhyMatched({ items, className }: WhyMatchedProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 p-6", className)}>
      <h3 className="text-lg font-semibold text-[#2D1318] font-serif mb-4">
        Why You Matched
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon] || Heart;
          return (
            <div key={index} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5E0E8] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#7B1E3A]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#2D1318] mb-0.5">
                  {item.area}
                </h4>
                <p className="text-sm text-[#6B5B5E]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
