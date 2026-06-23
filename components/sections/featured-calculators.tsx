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
    accent: "#10b981",
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
    <section id="featured" className="py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            Most Used Tools
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-5 leading-tight tracking-tight">
            Featured Calculators
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Accurate, fast, and built on verified financial formulas used by AMFI, RBI, and the Income Tax department.
          </p>
        </div>

        {/* Calculator grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50"
              >
                {calc.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800">
                    Popular
                  </span>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${calc.accent}14` }}
                >
                  <Icon className="w-5 h-5" style={{ color: calc.accent }} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {calc.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">
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
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${calc.accent}, transparent)` }}
                />
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:-translate-y-0.5 transition-all duration-200 hover:shadow-lg"
          >
            View All 30+ Calculators
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
