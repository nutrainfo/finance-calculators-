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
  iconColor: string;
  cardHoverBorder: string;
  linkColor: string;
  badge: string;
  borderColor: string;
}> = {
  blue: {
    iconColor: "text-blue-400",
    cardHoverBorder: "hover:border-blue-500/40",
    linkColor: "text-blue-400",
    badge: "bg-blue-600/15 text-blue-400 border-blue-500/30",
    borderColor: "border-blue-500/20",
  },
  emerald: {
    iconColor: "text-emerald-400",
    cardHoverBorder: "hover:border-emerald-500/40",
    linkColor: "text-emerald-400",
    badge: "bg-emerald-600/15 text-emerald-400 border-emerald-500/30",
    borderColor: "border-emerald-500/20",
  },
  violet: {
    iconColor: "text-violet-400",
    cardHoverBorder: "hover:border-violet-500/40",
    linkColor: "text-violet-400",
    badge: "bg-violet-600/15 text-violet-400 border-violet-500/30",
    borderColor: "border-violet-500/20",
  },
  amber: {
    iconColor: "text-amber-400",
    cardHoverBorder: "hover:border-amber-500/40",
    linkColor: "text-amber-400",
    badge: "bg-amber-600/15 text-amber-400 border-amber-500/30",
    borderColor: "border-amber-500/20",
  },
};

export default function CalculatorsPage() {
  const totalTools = categories.reduce((s, c) => s + c.tools.length, 0);

  return (
    <div className="min-h-screen bg-[#0b0e11] pt-14">
      {/* Page header */}
      <div className="bg-[#1a1e24] border-b border-[#2a303a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <nav className="flex items-center gap-1.5 text-xs text-[#707a8a] mb-5">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#b7bdc6]">All Calculators</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            All Financial Calculators
          </h1>
          <p className="text-[#707a8a] mb-6">
            {totalTools}+ free, accurate calculators built on verified financial formulas.
          </p>
          {/* Stat strip */}
          <div className="flex flex-wrap gap-2">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {categories.map((cat) => {
          const cfg = accentConfig[cat.accent];
          const Icon = cat.icon;
          return (
            <div key={cat.title}>
              {/* Category header */}
              <div className={`flex items-center gap-3 mb-5 pb-4 border-b ${cfg.borderColor}`}>
                <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{cat.title}</h2>
                  <p className="text-xs text-[#707a8a]">{cat.description}</p>
                </div>
              </div>

              {/* Tool cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`group flex flex-col p-4 bg-[#1a1e24] rounded-xl border border-[#2a303a] ${cfg.cardHoverBorder} hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    <div className="font-semibold text-white text-sm mb-1 leading-snug">
                      {tool.name}
                    </div>
                    <div className="text-xs text-[#707a8a] leading-relaxed flex-1">
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
