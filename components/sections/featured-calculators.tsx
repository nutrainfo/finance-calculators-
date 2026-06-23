"use client";

import Link from "next/link";
import { TrendingUp, Building2, CreditCard, Receipt, BarChart3, Calculator, ArrowUpRight } from "lucide-react";

const calculators = [
  {
    icon: TrendingUp,
    title: "SIP Calculator",
    description: "Project Systematic Investment Plan returns using AMFI-standard compounding formula.",
    href: "/calculators/sip-calculator",
    accent: "#3b82f6",
    popular: true,
  },
  {
    icon: Building2,
    title: "FD Calculator",
    description: "Fixed Deposit maturity value with quarterly compounding across all major banks.",
    href: "/calculators/fd-calculator",
    accent: "#0ecb81",
    popular: true,
  },
  {
    icon: CreditCard,
    title: "EMI Calculator",
    description: "Home, car and personal loan EMI with full amortization schedule breakdown.",
    href: "/calculators/home-loan-emi-calculator",
    accent: "#8b5cf6",
    popular: true,
  },
  {
    icon: Receipt,
    title: "Income Tax",
    description: "New vs Old regime comparison for FY 2024-25 with Section 87A rebate applied.",
    href: "/calculators/income-tax-calculator",
    accent: "#f59e0b",
    popular: false,
  },
  {
    icon: BarChart3,
    title: "Lumpsum Calculator",
    description: "One-time investment growth projection over any time horizon with CAGR analysis.",
    href: "/calculators/lumpsum-calculator",
    accent: "#06b6d4",
    popular: false,
  },
  {
    icon: Calculator,
    title: "Retirement Planner",
    description: "Inflation-adjusted retirement corpus planning with monthly SIP recommendations.",
    href: "/calculators/retirement-calculator",
    accent: "#f43f5e",
    popular: false,
  },
];

export default function FeaturedCalculators() {
  return (
    <section id="featured" className="py-20 bg-[#0b0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-3">
            Most Used Tools
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
            Featured Calculators
          </h2>
          <p className="text-[#707a8a] leading-relaxed">
            Accurate, fast, and built on verified financial formulas used by AMFI, RBI, and the Income Tax department.
          </p>
        </div>

        {/* Calculator grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="group relative p-5 rounded-2xl bg-[#1a1e24] border border-[#2a303a] hover:border-[#3a4150] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
              >
                {calc.popular && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-md border border-blue-600/30">
                    Popular
                  </span>
                )}

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${calc.accent}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color: calc.accent }} />
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">
                  {calc.title}
                </h3>
                <p className="text-[#707a8a] text-sm leading-relaxed mb-4">
                  {calc.description}
                </p>

                <div
                  className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                  style={{ color: calc.accent }}
                >
                  Calculate Now
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${calc.accent}, transparent)` }}
                />
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30"
          >
            View All 30+ Calculators
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
