"use client";

interface CompatibilityScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function CompatibilityScore({
  score,
  size = "md",
  showLabel = false,
}: CompatibilityScoreProps) {
  const sizeConfig = {
    sm: {
      container: "w-12 h-12",
      stroke: 3,
      text: "text-xs",
      radius: 18,
    },
    md: {
      container: "w-20 h-20",
      stroke: 4,
      text: "text-lg",
      radius: 30,
    },
    lg: {
      container: "w-28 h-28",
      stroke: 5,
      text: "text-2xl",
      radius: 45,
    },
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const offset = circumference - (score / 100) * circumference;

  // Color based on score
  const getColor = () => {
    if (score >= 90) return "#166534"; // Green for excellent
    if (score >= 80) return "#7B1E3A"; // Burgundy for great
    if (score >= 70) return "#C9956B"; // Gold for good
    return "#6B5B5E"; // Gray for moderate
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${config.container} relative bg-white rounded-full shadow-md flex items-center justify-center`}
      >
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={config.radius}
            fill="none"
            stroke="#F5E0E8"
            strokeWidth={config.stroke}
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={config.radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <span
          className={`${config.text} font-bold text-dark relative z-10`}
        >
          {score}%
        </span>
      </div>
      {showLabel && (
        <span className="mt-2 text-xs text-warm-gray font-medium">
          Compatibility
        </span>
      )}
    </div>
  );
}
