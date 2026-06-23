"use client";

import Link from "next/link";
import { TrendingUp, Landmark, Home, Receipt, ArrowRight, LucideProps } from "lucide-react";

type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

interface ToolCategory {
  title: string;
  icon: LucideIcon;
  cfg: {
    headerText: string;
    arrowColor: string;
    accentBorder: string;
  };
  tools: { name: string; href: string }[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "Investment Calculators",
    icon: TrendingUp,
    cfg: {
      headerText: "text-blue-400",
      arrowColor: "text-blue-400",
      accentBorder: "border-blue-500/30",
    },
    tools: [
      { name: "SIP Calculator", href: "/calculators/sip-calculator" },
      { name: "Step-Up SIP Calculator", href: "/calculators/step-up-sip-calculator" },
      { name: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" },
      { name: "SWP Calculator", href: "/calculators/swp-calculator" },
      { name: "Retirement Calculator", href: "/calculators/retirement-calculator" },
      { name: "FIRE Calculator", href: "/calculators/fire-calculator" },
      { name: "Inflation Calculator", href: "/calculators/inflation-calculator" },
    ],
  },
  {
    title: "Deposit Calculators",
    icon: Landmark,
    cfg: {
      headerText: "text-emerald-400",
      arrowColor: "text-emerald-400",
      accentBorder: "border-emerald-500/30",
    },
    tools: [
      { name: "Fixed Deposit (FD)", href: "/calculators/fd-calculator" },
      { name: "Recurring Deposit (RD)", href: "/calculators/rd-calculator" },
      { name: "PPF Calculator", href: "/calculators/ppf-calculator" },
      { name: "Senior Citizen FD", href: "/calculators/senior-citizen-fd-calculator" },
    ],
  },
  {
    title: "Loan Calculators",
    icon: Home,
    cfg: {
      headerText: "text-violet-400",
      arrowColor: "text-violet-400",
      accentBorder: "border-violet-500/30",
    },
    tools: [
      { name: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator" },
      { name: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator" },
      { name: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator" },
      { name: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator" },
    ],
  },
  {
    title: "Tax Calculators",
    icon: Receipt,
    cfg: {
      headerText: "text-amber-400",
      arrowColor: "text-amber-400",
      accentBorder: "border-amber-500/30",
    },
    tools: [
      { name: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
      { name: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator" },
      { name: "Capital Gains Tax", href: "/calculators/capital-gains-calculator" },
    ],
  },
];

export default function InvestmentTools() {
  return (
    <section className="py-20 bg-[#0b0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
            All Tools
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Complete Calculator Library
          </h2>
          <p className="text-[#707a8a] max-w-xl mx-auto">
            Everything you need to plan your financial future — investments, deposits, loans, and taxes.
          </p>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`rounded-2xl border border-[#2a303a] bg-[#1a1e24] p-5`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#2a303a]">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${cat.cfg.headerText}`} />
                  <h3 className={`text-sm font-bold ${cat.cfg.headerText}`}>{cat.title}</h3>
                </div>

                {/* Tool links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium bg-[#252b33] hover:bg-[#2e3540] text-[#b7bdc6] hover:text-white transition-all duration-150"
                    >
                      <span className="leading-tight">{tool.name}</span>
                      <ArrowRight className={`w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${cat.cfg.arrowColor}`} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
