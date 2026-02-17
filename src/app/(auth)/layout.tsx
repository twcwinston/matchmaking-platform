"use client";

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-md mx-auto">
          <Link href="/" className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-burgundy flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">M</span>
            </div>
            <span className="font-serif text-2xl font-bold text-dark">
              Matrimony
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[16px] shadow-[var(--shadow-md)] border border-rose-muted/50 p-8">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 text-center">
        <p className="text-sm text-warm-gray">
          © 2026 Matrimony. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
