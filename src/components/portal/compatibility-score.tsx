"use client";

import { cn } from "@/lib/utils";

interface CompatibilityScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function CompatibilityScore({
  score,
  size = "md",
  showLabel = true,
  className,
}: CompatibilityScoreProps) {
  const sizeConfig = {
    sm: {
      container: "w-12 h-12",
      strokeWidth: 3,
      fontSize: "text-sm",
      labelSize: "text-[8px]",
    },
    md: {
      container: "w-16 h-16",
      strokeWidth: 3.5,
      fontSize: "text-lg",
      labelSize: "text-[10px]",
    },
    lg: {
      container: "w-24 h-24",
      strokeWidth: 4,
      fontSize: "text-2xl",
      labelSize: "text-xs",
    },
  };

  const config = sizeConfig[size];

  // Calculate color based on score
  const getColor = (score: number) => {
    if (score >= 85) return "#166534"; // Green for excellent
    if (score >= 70) return "#C9956B"; // Gold for good
    if (score >= 50) return "#A16207"; // Yellow/amber for fair
    return "#6B5B5E"; // Gray for low
  };

  const color = getColor(score);

  // SVG calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", config.container, className)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#F5E0E8"
          strokeWidth={config.strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold", config.fontSize)} style={{ color }}>
          {score}%
        </span>
        {showLabel && size !== "sm" && (
          <span className={cn("text-[#6B5B5E] font-medium uppercase tracking-wider", config.labelSize)}>
            Match
          </span>
        )}
      </div>
    </div>
  );
}

interface CompatibilityBreakdownProps {
  breakdown: {
    values: number;
    lifestyle: number;
    family: number;
    personality: number;
  };
  className?: string;
}

export function CompatibilityBreakdown({ breakdown, className }: CompatibilityBreakdownProps) {
  const categories = [
    { key: "values", label: "Values", score: breakdown.values },
    { key: "lifestyle", label: "Lifestyle", score: breakdown.lifestyle },
    { key: "family", label: "Family", score: breakdown.family },
    { key: "personality", label: "Personality", score: breakdown.personality },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      {categories.map((category) => (
        <div key={category.key} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B5B5E] font-medium">{category.label}</span>
            <span className="text-[#2D1318] font-semibold">{category.score}%</span>
          </div>
          <div className="h-2 bg-[#F5E0E8] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${category.score}%`,
                backgroundColor: category.score >= 85 ? "#166534" : category.score >= 70 ? "#C9956B" : "#A16207",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
