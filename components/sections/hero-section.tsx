"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Scene3D = dynamic(() => import("@/components/hero-3d"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
      const handler = (e: Event) => {
        e.preventDefault();
        setInstallPrompt(e as BeforeInstallPromptEvent);
      };
      window.addEventListener("beforeinstallprompt", handler);
      window.addEventListener("appinstalled", () => setIsInstalled(true));
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setInstallPrompt(null);
  };

  const scrollDown = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#03060f" }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        {mounted && <Scene3D />}
      </div>

      {/* Radial glow behind orb */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(29,78,216,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3,6,15,0.85) 100%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-8 flex flex-col items-center text-center pt-20">

        {/* Overline */}
        <p
          className={`text-xs font-semibold tracking-[0.25em] uppercase mb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{ color: "rgba(96,165,250,0.7)" }}
        >
          India&apos;s Financial Intelligence Platform
        </p>

        {/* Headline */}
        <h1
          className={`font-black text-white leading-[1.02] tracking-tight mb-8 transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)" }}
        >
          Calculate Your{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #60a5fa 0%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Wealth
          </span>
          {" "}with{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Precision
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-slate-400 max-w-xl mx-auto leading-relaxed mb-12 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
        >
          30+ financial calculators — SIP, FD, EMI, Income Tax, Mutual Funds.
          Live bank interest rates. Built for India. Completely free.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 mb-16 transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <Link
            href="/calculators"
            className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/40 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              boxShadow: "0 0 40px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span>Start Calculating</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/mutual-funds"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            Explore Mutual Funds
          </Link>

          {!isInstalled && (
            <button
              onClick={handleInstall}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: "#34d399",
                background: "rgba(52,211,153,0.06)",
                border: "1px solid rgba(52,211,153,0.18)",
              }}
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          )}
        </div>

        {/* Stat strip */}
        <div
          className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-4 transition-all duration-1000 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          {[
            { value: "30+", label: "Calculators" },
            { value: "20+", label: "Banks Compared" },
            { value: "100%", label: "Free Forever" },
            { value: "0", label: "Registration Required" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              {i > 0 && (
                <span className="mr-8 hidden sm:block w-px h-5 bg-white/10" />
              )}
              <span className="text-2xl font-black text-white">{s.value}</span>
              <span className="text-xs font-medium" style={{ color: "rgba(148,163,184,0.6)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        aria-label="Scroll down"
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-all duration-1000 delay-700 hover:opacity-60 ${mounted ? "opacity-30" : "opacity-0"}`}
        style={{ color: "#94a3b8" }}
      >
        <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none dark:hidden"
        style={{ background: "linear-gradient(to top, #ffffff 0%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none hidden dark:block"
        style={{ background: "linear-gradient(to top, #0f172a 0%, transparent 100%)" }}
      />
    </section>
  );
}
