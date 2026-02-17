"use client";

import Link from "next/link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 border-b border-rose-muted/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center">
              <span className="text-white font-serif font-bold text-sm">M</span>
            </div>
            <span className="font-serif text-xl font-bold text-dark">
              Matrimony
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm text-warm-gray hover:text-burgundy transition-colors"
          >
            Save & Exit
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">{children}</main>
    </div>
  );
}
