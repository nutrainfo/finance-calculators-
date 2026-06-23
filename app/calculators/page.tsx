import Link from "next/link";
import { Metadata } from "next";
import { TrendingUp, Landmark, Home, Receipt, ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Financial Calculators — 30+ Free Tools | Calculate Future",
  description: "Browse 30+ free financial calculators including SIP, FD, EMI, income tax, retirement, FIRE, and more. India's most comprehensive financial calculator library.",
};

const categories = [
  {
    title: "Investment Calculators",
    description: "Plan your investments and calculate returns",
    icon: TrendingUp,
    accent: "blue",
    tools: [
      { name: "SIP Calculator", href: "/calculators/sip-calculator", desc: "Monthly mutual fund SIP returns" },
      { name: "Step-Up SIP Calculator", href: "/calculators/step-up-sip-calculator", desc: "SIP with annual increment" },
      { name: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator", desc: "One-time investment returns" },
      { name: "SWP Calculator", href: "/calculators/swp-calculator", desc: "Systematic withdrawal plan" },
      { name: "Retirement Calculator", href: "/calculators/retirement-calculator", desc: "Retirement corpus planning" },
      { name: "FIRE Calculator", href: "/calculators/fire-calculator", desc: "Financial independence age" },
      { name: "Inflation Calculator", href: "/calculators/inflation-calculator", desc: "Inflation impact on money" },
    ],
  },
  {
    title: "Deposit Calculators",
    description: "Calculate returns on bank deposits",
    icon: Landmark,
    accent: "emerald",
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
    description: "Calculate loan EMI and total interest",
    icon: Home,
    accent: "violet",
    tools: [
      { name: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator", desc: "Housing loan EMI & schedule" },
      { name: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator", desc: "Personal loan repayment" },
      { name: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator", desc: "Vehicle loan calculator" },
      { name: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator", desc: "Save on loan interest" },
    ],
  },
  {
    title: "Tax Calculators",
    description: "Calculate income tax and capital gains",
    icon: Receipt,
    accent: "amber",
    tools: [
      { name: "Income Tax Calculator", href: "/calculators/income-tax-calculator", desc: "FY 2024-25 tax liability" },
      { name: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator", desc: "Compare tax regimes" },
      { name: "Capital Gains Calculator", href: "/calculators/capital-gains-calculator", desc: "LTCG and STCG tax" },
    ],
  },
];

const accentConfig: Record<string, {
  sectionBorder: string;
  iconBg: string;
  iconColor: string;
  cardHoverBorder: string;
  linkColor: string;
  badge: string;
}> = {
  blue: {
    sectionBorder: "border-blue-200 dark:border-blue-800/50",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    cardHoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
    linkColor: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  },
  emerald: {
    sectionBorder: "border-emerald-200 dark:border-emerald-800/50",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    cardHoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-600",
    linkColor: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  },
  violet: {
    sectionBorder: "border-violet-200 dark:border-violet-800/50",
    iconBg: "bg-violet-50 dark:bg-violet-950/40",
    iconColor: "text-violet-600 dark:text-violet-400",
    cardHoverBorder: "hover:border-violet-300 dark:hover:border-violet-600",
    linkColor: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  },
  amber: {
    sectionBorder: "border-amber-200 dark:border-amber-800/50",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-amber-600 dark:text-amber-400",
    cardHoverBorder: "hover:border-amber-300 dark:hover:border-amber-600",
    linkColor: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  },
};

export default function CalculatorsPage() {
  const totalTools = categories.reduce((s, c) => s + c.tools.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 sm:pt-20">
      {/* Page header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600 dark:text-slate-300 font-medium">All Calculators</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            All Financial Calculators
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl">
            {totalTools}+ free, accurate calculators built on verified financial formulas.
          </p>
          {/* Stat strip */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const cfg = accentConfig[cat.accent];
              return (
                <span key={cat.title} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${cfg.badge}`}>
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.tools.length} {cat.title.split(" ")[0]}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calculator categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {categories.map((cat) => {
          const cfg = accentConfig[cat.accent];
          const Icon = cat.icon;
          return (
            <div key={cat.title}>
              {/* Category header */}
              <div className={`flex items-center gap-4 mb-6 pb-5 border-b ${cfg.sectionBorder}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
                  <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{cat.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{cat.description}</p>
                </div>
              </div>

              {/* Tool cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`group flex flex-col p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 ${cfg.cardHoverBorder} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    <div className="font-semibold text-slate-900 dark:text-white text-sm mb-1.5 leading-snug group-hover:text-inherit transition-colors">
                      {tool.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                      {tool.desc}
                    </div>
                    <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${cfg.linkColor}`}>
                      Calculate
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
