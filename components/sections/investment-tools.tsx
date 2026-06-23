"use client";

import Link from "next/link";
import { TrendingUp, Landmark, Home, Receipt, ArrowRight, LucideProps } from "lucide-react";

type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

interface ToolCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  tools: { name: string; href: string }[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "Investment",
    icon: TrendingUp,
    color: "#3b82f6",
    tools: [
      { name: "SIP Calculator", href: "/calculators/sip-calculator" },
      { name: "Step-Up SIP", href: "/calculators/step-up-sip-calculator" },
      { name: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" },
      { name: "SWP Calculator", href: "/calculators/swp-calculator" },
      { name: "Retirement Calculator", href: "/calculators/retirement-calculator" },
      { name: "FIRE Calculator", href: "/calculators/fire-calculator" },
      { name: "Inflation Calculator", href: "/calculators/inflation-calculator" },
    ],
  },
  {
    title: "Deposits",
    icon: Landmark,
    color: "#10b981",
    tools: [
      { name: "Fixed Deposit (FD)", href: "/calculators/fd-calculator" },
      { name: "Recurring Deposit (RD)", href: "/calculators/rd-calculator" },
      { name: "PPF Calculator", href: "/calculators/ppf-calculator" },
      { name: "Senior Citizen FD", href: "/calculators/senior-citizen-fd-calculator" },
      { name: "Compound Interest", href: "/calculators/compound-interest-calculator" },
      { name: "Simple Interest", href: "/calculators/simple-interest-calculator" },
    ],
  },
  {
    title: "Loans & EMI",
    icon: Home,
    color: "#8b5cf6",
    tools: [
      { name: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator" },
      { name: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator" },
      { name: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator" },
      { name: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator" },
    ],
  },
  {
    title: "Tax",
    icon: Receipt,
    color: "#f59e0b",
    tools: [
      { name: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
      { name: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator" },
      { name: "Capital Gains Tax", href: "/calculators/capital-gains-calculator" },
    ],
  },
];

export default function InvestmentTools() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(180deg, #060c18 0%, #091220 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">Complete Library</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Every Calculator You Need</h2>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="rounded-2xl border border-[#1e2d4a] bg-[#0d1526] p-5 overflow-hidden relative"
              >
                {/* Subtle colored glow in corner */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full blur-3xl"
                  style={{ background: `${cat.color}0a` }}
                />

                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                  <span
                    className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{ background: `${cat.color}15`, color: cat.color }}
                  >
                    {cat.tools.length} tools
                  </span>
                </div>

                {/* Tool links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm bg-[#060c18] hover:bg-[#162038] text-slate-400 hover:text-white border border-transparent hover:border-[#1e2d4a] transition-all duration-150"
                    >
                      <span className="leading-tight font-medium">{tool.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color: cat.color }} />
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
