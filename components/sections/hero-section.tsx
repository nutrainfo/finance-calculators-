"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Landmark, CreditCard, Receipt } from "lucide-react";
import { useEffect, useState } from "react";

const quickLinks = [
  { icon: TrendingUp, label: "SIP Calculator", sub: "Plan MF returns", href: "/calculators/sip-calculator", color: "#3b82f6" },
  { icon: Landmark, label: "FD Calculator", sub: "Bank deposit yield", href: "/calculators/fd-calculator", color: "#10b981" },
  { icon: CreditCard, label: "EMI Calculator", sub: "Loan repayment", href: "/calculators/home-loan-emi-calculator", color: "#8b5cf6" },
  { icon: Receipt, label: "Income Tax", sub: "FY 2024-25", href: "/calculators/income-tax-calculator", color: "#f59e0b" },
];

const stats = [
  { value: "30+", label: "Calculators" },
  { value: "20+", label: "Banks Tracked" },
  { value: "100%", label: "Free Forever" },
  { value: "₹0", label: "Commission" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060c18 0%, #091222 45%, #0a1628 70%, #060c18 100%)" }}
    >
      {/* Gold radial glow top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(245,158,11,0.08) 0%, transparent 65%)" }}
      />
      {/* Blue glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, rgba(59,130,246,0.07) 0%, transparent 65%)" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Overline badge */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              India&apos;s Financial Intelligence Platform
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`text-center font-black text-white leading-[1.0] tracking-tight mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          Plan Your Wealth.<br />
          <span
            style={{
              background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Calculate Your Future.
          </span>
        </h1>

        {/* Sub */}
        <p
          className={`text-center text-slate-400 max-w-xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}
        >
          30+ precision financial calculators — SIP, FD, EMI, Income Tax, Mutual Funds, Retirement.
          Built for India. Completely free.
        </p>

        {/* CTA row */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Link
            href="/calculators"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-black bg-amber-500 hover:bg-amber-400 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-amber-600/25"
          >
            Start Calculating
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/mutual-funds"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-slate-300 hover:text-white border border-[#1e2d4a] hover:border-[#2d4466] bg-[#0d1526]/60 hover:bg-[#0d1526] transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Explore Mutual Funds
          </Link>
        </div>

        {/* Quick access calculator tiles */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 mb-14 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {quickLinks.map((q) => {
            const Icon = q.icon;
            return (
              <Link
                key={q.href}
                href={q.href}
                className="group flex items-center gap-3 p-4 rounded-xl border border-[#1e2d4a] bg-[#0d1526]/70 hover:border-[#2d4466] hover:bg-[#0d1526] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${q.color}18`, border: `1px solid ${q.color}30` }}
                >
                  <Icon className="w-4 h-4" style={{ color: q.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{q.label}</p>
                  <p className="text-[10px] text-slate-500 truncate">{q.sub}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stat strip */}
        <div
          className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-4 transition-all duration-700 delay-400 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-baseline gap-2">
              {i > 0 && <span className="mr-8 hidden sm:block w-px h-5 bg-[#1e2d4a]" />}
              <span className="text-2xl font-black text-amber-400">{s.value}</span>
              <span className="text-xs font-medium text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #060c18 0%, transparent 100%)" }}
      />
    </section>
  );
}
