"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Zap, Star } from "lucide-react";

const floatingElements = [
  { icon: "₹", size: "text-4xl", delay: 0, x: "10%", y: "20%" },
  { icon: "📈", size: "text-3xl", delay: 0.5, x: "85%", y: "15%" },
  { icon: "💰", size: "text-3xl", delay: 1, x: "75%", y: "70%" },
  { icon: "🏦", size: "text-2xl", delay: 1.5, x: "15%", y: "75%" },
  { icon: "📊", size: "text-3xl", delay: 2, x: "90%", y: "45%" },
  { icon: "💎", size: "text-2xl", delay: 0.8, x: "5%", y: "50%" },
];

const stats = [
  { value: "30+", label: "Calculators" },
  { value: "10L+", label: "Users" },
  { value: "100%", label: "Free & Accurate" },
  { value: "4.9★", label: "Rating" },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ users: 0, calculators: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Floating elements */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className={`absolute ${el.size} opacity-30 float-animation select-none pointer-events-none`}
          style={{
            left: el.x,
            top: el.y,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.icon}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          India&apos;s #1 Financial Calculator Platform
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Calculate Your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
            Financial Future
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-xl sm:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          India&apos;s Most Advanced Financial Calculator Platform — SIP, FD, EMI, Tax, and 30+ tools. Free, accurate, instant.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/calculators"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
          >
            Start Calculating
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#featured"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1"
          >
            Explore Tools
            <TrendingUp className="w-5 h-5" />
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>100% Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>SEBI-Approved Formulas</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
    </section>
  );
}
