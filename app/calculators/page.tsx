import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Financial Calculators — 30+ Free Tools",
  description: "Browse 30+ free financial calculators including SIP, FD, EMI, income tax, retirement, FIRE, and more. India's most comprehensive financial calculator library.",
};

const categories = [
  {
    title: "Investment Calculators",
    emoji: "📈",
    description: "Plan your investments and calculate returns",
    tools: [
      { name: "SIP Calculator", href: "/calculators/sip-calculator", desc: "Monthly mutual fund SIP returns" },
      { name: "Step-Up SIP Calculator", href: "/calculators/step-up-sip-calculator", desc: "SIP with annual increment" },
      { name: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator", desc: "One-time investment returns" },
      { name: "SWP Calculator", href: "/calculators/swp-calculator", desc: "Systematic withdrawal plan" },
      { name: "Goal Planning Calculator", href: "/calculators/goal-planning-calculator", desc: "Plan for specific goals" },
      { name: "Retirement Calculator", href: "/calculators/retirement-calculator", desc: "Retirement corpus planning" },
      { name: "FIRE Calculator", href: "/calculators/fire-calculator", desc: "Financial independence age" },
      { name: "Inflation Calculator", href: "/calculators/inflation-calculator", desc: "Inflation impact on money" },
    ],
  },
  {
    title: "Deposit Calculators",
    emoji: "🏦",
    description: "Calculate returns on bank deposits",
    tools: [
      { name: "FD Calculator", href: "/calculators/fd-calculator", desc: "Fixed deposit returns" },
      { name: "RD Calculator", href: "/calculators/rd-calculator", desc: "Recurring deposit maturity" },
      { name: "PPF Calculator", href: "/calculators/ppf-calculator", desc: "Public Provident Fund returns" },
      { name: "Senior Citizen FD", href: "/calculators/senior-citizen-fd-calculator", desc: "Higher FD rates for seniors" },
      { name: "Compound Interest", href: "/calculators/compound-interest-calculator", desc: "Compound interest formula" },
      { name: "Simple Interest", href: "/calculators/simple-interest-calculator", desc: "Simple interest calculation" },
    ],
  },
  {
    title: "Loan & EMI Calculators",
    emoji: "🏠",
    description: "Calculate loan EMI and total interest",
    tools: [
      { name: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator", desc: "Housing loan EMI & schedule" },
      { name: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator", desc: "Personal loan repayment" },
      { name: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator", desc: "Vehicle loan calculator" },
      { name: "Education Loan", href: "/calculators/education-loan-calculator", desc: "Student loan EMI" },
      { name: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator", desc: "Save on loan interest" },
    ],
  },
  {
    title: "Tax Calculators",
    emoji: "📋",
    description: "Calculate income tax and capital gains",
    tools: [
      { name: "Income Tax Calculator", href: "/calculators/income-tax-calculator", desc: "FY 2024-25 tax liability" },
      { name: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator", desc: "Compare tax regimes" },
      { name: "Capital Gains Calculator", href: "/calculators/capital-gains-calculator", desc: "LTCG and STCG tax" },
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/10 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            All Financial Calculators
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            30+ free, accurate financial calculators for every need
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{cat.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 card-hover transition-all"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {tool.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{tool.desc}</div>
                    <div className="mt-3 text-blue-600 dark:text-blue-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Calculate →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
