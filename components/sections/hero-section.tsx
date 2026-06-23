"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Scene3D = dynamic(() => import("@/components/hero-3d"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const stats = [
  { value: "30+", label: "Financial Calculators" },
  { value: "20+", label: "Banks Covered" },
  { value: "SEBI", label: "Compliant Formulas" },
  { value: "Free", label: "No Registration" },
];

const trustItems = [
  { icon: Shield, label: "SEBI-Standard Formulas" },
  { icon: Zap, label: "Instant Calculations" },
  { icon: TrendingUp, label: "Verified Data Sources" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        {mounted && <Scene3D />}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#0a0f1e]/20 to-[#0a0f1e]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]/60" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,179,237,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          India&apos;s Most Accurate Financial Calculator Platform
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Calculate Your{" "}
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #63b3ed 0%, #48bb78 50%, #ecc94b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Financial Future
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Accurate SIP, FD, EMI, Income Tax and 30+ financial calculators. Live bank interest rates. Mutual fund comparisons. Built for India.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link
            href="/calculators"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Start Calculating
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/mutual-funds"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-base rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            Explore Mutual Funds
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-4"
            >
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div
          className={`flex flex-wrap justify-center gap-8 text-slate-500 text-xs font-medium transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-slate-600" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-900 to-transparent z-10" />
    </section>
  );
}
