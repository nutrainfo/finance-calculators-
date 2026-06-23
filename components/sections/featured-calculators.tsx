"use client";

import Link from "next/link";
import { TrendingUp, Building2, CreditCard, Receipt, BarChart3, Calculator, ArrowUpRight } from "lucide-react";

const calculators = [
  { icon: TrendingUp, title: "SIP Calculator", description: "Project SIP returns using the AMFI-standard compounding formula.", href: "/calculators/sip-calculator", accent: "#3b82f6", popular: true },
  { icon: Building2, title: "FD Calculator", description: "Fixed Deposit maturity with quarterly compounding across 20+ banks.", href: "/calculators/fd-calculator", accent: "#10b981", popular: true },
  { icon: CreditCard, title: "EMI Calculator", description: "Home, car and personal loan EMI with full amortization schedule.", href: "/calculators/home-loan-emi-calculator", accent: "#8b5cf6", popular: true },
  { icon: Receipt, title: "Income Tax", description: "New vs Old regime for FY 2024-25 with Section 87A rebate.", href: "/calculators/income-tax-calculator", accent: "#f59e0b", popular: false },
  { icon: BarChart3, title: "Lumpsum Calculator", description: "One-time investment growth projection with CAGR analysis.", href: "/calculators/lumpsum-calculator", accent: "#06b6d4", popular: false },
  { icon: Calculator, title: "Retirement Planner", description: "Inflation-adjusted corpus planning with SIP recommendations.", href: "/calculators/retirement-calculator", accent: "#f43f5e", popular: false },
];

export default function FeaturedCalculators() {
  return (
    <section className="py-20" style={{ background: "#060c18" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">Most Used</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Featured Calculators</h2>
          </div>
          <Link href="/calculators" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors">
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="group relative flex flex-col p-5 rounded-2xl border border-[#1e2d4a] bg-[#0d1526] hover:border-[#2d4466] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-250"
              >
                {/* Gold top accent line */}
                <div
                  className="absolute top-0 left-5 right-5 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${calc.accent}, transparent)` }}
                />

                {calc.popular && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                    Popular
                  </span>
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${calc.accent}15`, border: `1px solid ${calc.accent}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: calc.accent }} />
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">{calc.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{calc.description}</p>

                <div className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200" style={{ color: calc.accent }}>
                  Calculate
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/calculators" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-all">
            View All 30+ Calculators <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
