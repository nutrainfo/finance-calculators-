"use client";

import Link from "next/link";

const toolCategories = [
  {
    title: "Investment Calculators",
    emoji: "📈",
    color: "blue",
    tools: [
      { name: "SIP Calculator", href: "/calculators/sip-calculator" },
      { name: "Step-Up SIP Calculator", href: "/calculators/step-up-sip-calculator" },
      { name: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" },
      { name: "SWP Calculator", href: "/calculators/swp-calculator" },
      { name: "Mutual Fund Returns", href: "/calculators/mutual-fund-calculator" },
      { name: "Goal Planning", href: "/calculators/goal-planning-calculator" },
      { name: "Retirement Calculator", href: "/calculators/retirement-calculator" },
      { name: "FIRE Calculator", href: "/calculators/fire-calculator" },
      { name: "Inflation Calculator", href: "/calculators/inflation-calculator" },
    ],
  },
  {
    title: "Deposit Calculators",
    emoji: "🏦",
    color: "emerald",
    tools: [
      { name: "Fixed Deposit (FD)", href: "/calculators/fd-calculator" },
      { name: "Recurring Deposit (RD)", href: "/calculators/rd-calculator" },
      { name: "PPF Calculator", href: "/calculators/ppf-calculator" },
      { name: "Senior Citizen FD", href: "/calculators/senior-citizen-fd-calculator" },
      { name: "Tax Saver FD", href: "/calculators/tax-saver-fd-calculator" },
      { name: "NPS Calculator", href: "/calculators/nps-calculator" },
    ],
  },
  {
    title: "Loan Calculators",
    emoji: "🏠",
    color: "violet",
    tools: [
      { name: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator" },
      { name: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator" },
      { name: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator" },
      { name: "Education Loan", href: "/calculators/education-loan-calculator" },
      { name: "Loan Eligibility", href: "/calculators/loan-eligibility-calculator" },
      { name: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator" },
    ],
  },
  {
    title: "Tax Calculators",
    emoji: "📋",
    color: "amber",
    tools: [
      { name: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
      { name: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator" },
      { name: "Capital Gains Tax", href: "/calculators/capital-gains-calculator" },
      { name: "HRA Exemption", href: "/calculators/hra-calculator" },
      { name: "TDS Calculator", href: "/calculators/tds-calculator" },
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-600 to-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400",
  emerald: "from-emerald-600 to-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400",
  violet: "from-violet-600 to-violet-400 bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400",
  amber: "from-amber-600 to-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400",
};

export default function InvestmentTools() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 text-sm font-medium mb-4">
            🛠️ All Tools
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Complete Calculator Library
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Everything you need to plan your financial future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toolCategories.map((cat) => {
            const colors = colorMap[cat.color].split(" ");
            return (
              <div
                key={cat.title}
                className={`p-6 rounded-2xl border ${colors[1]} ${colors[2]} ${colors[3]} ${colors[4]}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {cat.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`px-3 py-2 rounded-xl text-sm font-medium ${colors[5]} ${colors[6]} bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-current transition-all`}
                    >
                      {tool.name}
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
