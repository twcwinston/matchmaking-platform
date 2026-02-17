"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const colorClasses = {
    light: "text-white",
    dark: "text-burgundy",
  };

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative">
        <svg
          className={`${size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : "w-12 h-12"}`}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Two intertwining rings symbolizing union */}
          <circle
            cx="18"
            cy="24"
            r="12"
            stroke="#7B1E3A"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="30"
            cy="24"
            r="12"
            stroke="#C9956B"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Small heart at intersection */}
          <path
            d="M24 20C24 20 22 18 20.5 18C18.5 18 17 19.5 17 21.5C17 25 24 28 24 28C24 28 31 25 31 21.5C31 19.5 29.5 18 27.5 18C26 18 24 20 24 20Z"
            fill="#7B1E3A"
          />
        </svg>
      </div>
      <span
        className={`font-serif font-bold ${sizeClasses[size]} ${colorClasses[variant]}`}
      >
        Sandhani
      </span>
    </Link>
  );
}
