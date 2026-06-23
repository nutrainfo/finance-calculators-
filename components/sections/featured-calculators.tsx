"use client";

import Link from "next/link";
import { TrendingUp, Building2, CreditCard, Receipt, Calculator, BarChart3 } from "lucide-react";

const calculators = [
  {
    icon: TrendingUp,
    title: "SIP Calculator",
    description: "Calculate returns on Systematic Investment Plans with compounding power",
    href: "/calculators/sip-calculator",
    color: "from-blue-600 to-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    popular: true,
  },
  {
    icon: Building2,
    title: "FD Calculator",
    description: "Fixed Deposit returns with quarterly compounding across all banks",
    href: "/calculators/fd-calculator",
    color: "from-emerald-600 to-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    popular: true,
  },
  {
    icon: CreditCard,
    title: "EMI Calculator",
    description: "Home, car & personal loan EMI with complete amortization schedule",
    href: "/calculators/home-loan-emi-calculator",
    color: "from-violet-600 to-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    popular: true,
  },
  {
    icon: Receipt,
    title: "Income Tax",
    description: "New vs Old regime comparison for FY 2024-25 with instant results",
    href: "/calculators/income-tax-calculator",
    color: "from-amber-600 to-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    popular: false,
  },
  {
    icon: BarChart3,
    title: "Lumpsum Calculator",
    description: "Calculate one-time investment growth over any time period",
    href: "/calculators/lumpsum-calculator",
    color: "from-cyan-600 to-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    border: "border-cyan-200 dark:border-cyan-800",
    popular: false,
  },
  {
    icon: Calculator,
    title: "Retirement Planner",
    description: "Plan your retirement corpus with inflation-adjusted projections",
    href: "/calculators/retirement-calculator",
    color: "from-rose-600 to-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800",
    popular: false,
  },
];

export default function FeaturedCalculators() {
  return (
    <section id="featured" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-sm font-medium mb-4">
            ⭐ Most Used Tools
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Featured Calculators
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            India&apos;s most accurate financial calculators trusted by lakhs of users
          </p>
        </div>

        {/* Calculator grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className={`relative group p-6 rounded-2xl border ${calc.bg} ${calc.border} card-hover transition-all duration-300`}
              >
                {calc.popular && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                    Popular
                  </span>
                )}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {calc.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {calc.description}
                </p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Calculate Now →
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
          >
            View All 30+ Calculators
          </Link>
        </div>
      </div>
    </section>
  );
}
