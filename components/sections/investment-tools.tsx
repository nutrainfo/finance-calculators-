"use client";

import Link from "next/link";
import { TrendingUp, Landmark, Home, Receipt, ArrowRight, LucideProps } from "lucide-react";

type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

interface ToolCategory {
  title: string;
  icon: LucideIcon;
  cfg: {
    sectionBg: string;
    sectionBorder: string;
    headerText: string;
    linkBg: string;
    linkText: string;
    linkHoverBg: string;
    arrowColor: string;
  };
  tools: { name: string; href: string }[];
}

const toolCategories: ToolCategory[] = [
  {
    title: "Investment Calculators",
    icon: TrendingUp,
    cfg: {
      sectionBg: "bg-blue-50 dark:bg-blue-950/20",
      sectionBorder: "border-blue-200 dark:border-blue-800/50",
      headerText: "text-blue-700 dark:text-blue-400",
      linkBg: "bg-white dark:bg-slate-900",
      linkText: "text-slate-700 dark:text-slate-300",
      linkHoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700 dark:hover:text-blue-400",
      arrowColor: "text-blue-400",
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
      sectionBg: "bg-emerald-50 dark:bg-emerald-950/20",
      sectionBorder: "border-emerald-200 dark:border-emerald-800/50",
      headerText: "text-emerald-700 dark:text-emerald-400",
      linkBg: "bg-white dark:bg-slate-900",
      linkText: "text-slate-700 dark:text-slate-300",
      linkHoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400",
      arrowColor: "text-emerald-400",
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
      sectionBg: "bg-violet-50 dark:bg-violet-950/20",
      sectionBorder: "border-violet-200 dark:border-violet-800/50",
      headerText: "text-violet-700 dark:text-violet-400",
      linkBg: "bg-white dark:bg-slate-900",
      linkText: "text-slate-700 dark:text-slate-300",
      linkHoverBg: "hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:text-violet-700 dark:hover:text-violet-400",
      arrowColor: "text-violet-400",
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
      sectionBg: "bg-amber-50 dark:bg-amber-950/20",
      sectionBorder: "border-amber-200 dark:border-amber-800/50",
      headerText: "text-amber-700 dark:text-amber-400",
      linkBg: "bg-white dark:bg-slate-900",
      linkText: "text-slate-700 dark:text-slate-300",
      linkHoverBg: "hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 dark:hover:text-amber-400",
      arrowColor: "text-amber-400",
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
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400 mb-4">
            All Tools
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Complete Calculator Library
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Everything you need to plan your financial future — investments, deposits, loans, and taxes.
          </p>
        </div>

        {/* 2-col grid on md+, single col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {toolCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`rounded-2xl border p-5 sm:p-6 ${cat.cfg.sectionBg} ${cat.cfg.sectionBorder}`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${cat.cfg.headerText}`} />
                  <h3 className={`text-base font-bold ${cat.cfg.headerText}`}>{cat.title}</h3>
                </div>

                {/* Tool links — single col on mobile, 2-col on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium border border-transparent transition-all duration-150 ${cat.cfg.linkBg} ${cat.cfg.linkText} ${cat.cfg.linkHoverBg} hover:border-current hover:shadow-sm`}
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
