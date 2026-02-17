"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    if (scrolled) {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(255, 248, 240, 0.98)",
        borderBottomColor: "rgba(201, 149, 107, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(255, 248, 240, 0)",
        borderBottomColor: "rgba(201, 149, 107, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [scrolled]);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm transition-all duration-300"
      style={{ backgroundColor: "transparent", borderBottomColor: "transparent" }}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`font-serif text-2xl font-bold transition-colors duration-300 ${
                scrolled ? "text-[#7B1E3A]" : "text-white"
              }`}
            >
              Soulmate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm transition-colors duration-300 hover:text-[#C9956B] ${
                  scrolled ? "text-[#2D1318]/70" : "text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className={`transition-colors duration-300 ${
                  scrolled
                    ? "text-[#7B1E3A] hover:bg-[#F5E0E8]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#C9956B] hover:bg-[#B8845A] text-white rounded-full px-6 transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled ? "text-[#7B1E3A]" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-2 bg-[#FFF8F0] rounded-b-2xl shadow-lg -mx-4 px-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-[#2D1318]/80 hover:text-[#7B1E3A] hover:bg-[#F5E0E8] rounded-xl transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-[#C9956B]/20" />
              <Link
                href="/login"
                className="px-4 py-3 text-[#7B1E3A] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#C9956B] hover:bg-[#B8845A] text-white rounded-full py-6">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
