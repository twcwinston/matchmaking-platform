"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Heart, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

// Unsplash images - elegant South Asian wedding/couple imagery
const HERO_IMAGE = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80";
const CTA_BG = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80";

const stats = [
  { value: 1200, suffix: "+", label: "Verified Profiles" },
  { value: 340, suffix: "+", label: "Happy Couples" },
  { value: 98, suffix: "%", label: "Satisfaction" },
];

const steps = [
  { icon: Heart, title: "Tell Your Story", desc: "Share who you are" },
  { icon: Sparkles, title: "Get Matched", desc: "Curated by experts" },
  { icon: Shield, title: "Meet Safely", desc: "Verified connections" },
];

// testimonials removed

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + suffix;
          },
        });
      },
      once: true,
    });
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  // testimonialsRef removed
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      mm.add("(min-width: 768px)", () => {
        gsap.to(".hero-image", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(".hero-image", { yPercent: 0 });
      });

      // Hero text stagger
      gsap.from(".hero-text-item", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Steps stagger reveal
      gsap.from(".step-item", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 80%",
        },
      });

      // CTA fade up
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <main className="overflow-hidden -mt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[620px] sm:h-screen flex items-center justify-center">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Elegant couple"
            fill
            className="hero-image object-cover scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D1318]/60 via-[#2D1318]/40 to-[#2D1318]/80" />
        </div>

        {/* Hero Content */}
        <div ref={heroTextRef} className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <p className="hero-text-item text-[#C9956B] font-medium tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 sm:mb-6">
            Where Love Finds Its Way
          </p>
          <h1 className="hero-text-item font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Meaningful Matches,
            <br />
            <span className="text-[#C9956B]">Timeless Bonds</span>
          </h1>
          <p className="hero-text-item text-white/80 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
            Expert matchmakers. Verified profiles. Real connections.
          </p>
          <div className="hero-text-item flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#C9956B] hover:bg-[#B8845A] text-white text-lg px-10 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(201,149,107,0.4)]"
              asChild
            >
              <Link href="/signup">
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={stepsRef} className="py-20 sm:py-24 md:py-32 bg-[#FFF8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9956B] font-medium tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">Simple & Elegant</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-[#2D1318]">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="step-item text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F5E0E8] flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-[#7B1E3A]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2D1318] mb-2">{step.title}</h3>
                <p className="text-[#7B1E3A]/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 sm:py-16 bg-[#2D1318]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="font-serif text-3xl md:text-5xl font-bold text-[#C9956B] mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="relative py-24 sm:py-32 md:py-40">
        <div className="absolute inset-0">
          <Image src={CTA_BG} alt="Elegant background" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#7B1E3A]/85" />
        </div>

        <div className="cta-content relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Your Story Awaits
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 sm:mb-10">
            Join hundreds of families who found love through thoughtful matchmaking.
          </p>
          <Button
            size="lg"
            className="bg-[#C9956B] hover:bg-[#B8845A] text-white text-lg px-12 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(201,149,107,0.5)]"
            asChild
          >
            <Link href="/signup">
              Start Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
