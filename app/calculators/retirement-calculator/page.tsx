"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateRetirement, formatCurrency } from "@/lib/calculators";

function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [expenses, setExpenses] = useState(50000);
  const [savings, setSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(20000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflation, setInflation] = useState(6);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const result = calculateRetirement({
    currentAge, retirementAge, monthlyExpenses: expenses,
    currentSavings: savings, monthlySavings, expectedReturn,
    inflationRate: inflation, lifeExpectancy,
  });

  const inputs = [
    { label: "Current Age", value: currentAge, set: setCurrentAge, min: 18, max: 59, step: 1, suffix: " Yr" },
    { label: "Retirement Age", value: retirementAge, set: setRetirementAge, min: currentAge + 1, max: 70, step: 1, suffix: " Yr" },
    { label: "Life Expectancy", value: lifeExpectancy, set: setLifeExpectancy, min: 70, max: 100, step: 1, suffix: " Yr" },
    { label: "Monthly Expenses Today", value: expenses, set: setExpenses, min: 10000, max: 500000, step: 1000, isAmt: true },
    { label: "Current Savings", value: savings, set: setSavings, min: 0, max: 10000000, step: 10000, isAmt: true },
    { label: "Monthly Savings", value: monthlySavings, set: setMonthlySavings, min: 1000, max: 500000, step: 1000, isAmt: true },
    { label: "Expected Return (% p.a.)", value: expectedReturn, set: setExpectedReturn, min: 6, max: 18, step: 0.5, suffix: "%" },
    { label: "Inflation Rate (% p.a.)", value: inflation, set: setInflation, min: 3, max: 12, step: 0.5, suffix: "%" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Retirement Details</h2>
        <div className="space-y-6">
          {inputs.map((inp) => (
            <div key={inp.label}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">{inp.label}</label>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {inp.isAmt ? formatCurrency(inp.value) : `${inp.value}${inp.suffix || ""}`}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">

        {/* Status */}
        <div className={`rounded-3xl p-8 border-2 ${result.isOnTrack
          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
          : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/50"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${result.isOnTrack ? "text-emerald-500" : "text-rose-500"}`}>
            {result.isOnTrack ? "On Track" : "Shortfall Detected"}
          </p>
          <p className={`text-2xl font-black mb-2 ${result.isOnTrack ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
            {result.isOnTrack
              ? `Surplus of ${formatCurrency(result.surplus)}`
              : `Shortfall of ${formatCurrency(result.shortfall)}`}
          </p>
          <p className={`text-sm ${result.isOnTrack ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
            {result.isOnTrack
              ? "You will exceed your retirement corpus target."
              : "Increase your monthly savings to meet your retirement goals."}
          </p>
        </div>

        {/* Key metrics */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Corpus Summary</h2>
          <div className="space-y-4 mb-6">
            {[
              { label: "Corpus Needed", value: formatCurrency(result.corpusNeeded) },
              { label: "Corpus You'll Build", value: formatCurrency(result.totalCorpus) },
              { label: "Future Monthly Expense", value: formatCurrency(result.futureMonthlyExpense) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">{r.label}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-300">Years to retirement:</strong> {retirementAge - currentAge} &nbsp;|&nbsp;
            <strong className="text-slate-700 dark:text-slate-300">Retirement duration:</strong> {lifeExpectancy - retirementAge} years &nbsp;|&nbsp;
            Rule: 25× annual expenses minimum corpus
          </div>
        </div>

        {/* Corpus breakdown bars */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Corpus Breakdown</h3>
          <div className="space-y-5">
            {[
              { label: "From SIP investments", value: result.sipCorpus, color: "blue" as const },
              { label: "From existing savings growth", value: result.lumpsumCorpus, color: "emerald" as const },
            ].map((item) => {
              const pct = Math.min(Math.round((item.value / result.corpusNeeded) * 100), 100);
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                    <span className={`font-bold ${item.color === "emerald" ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: item.color === "emerald"
                          ? "linear-gradient(90deg, #059669, #10b981)"
                          : "linear-gradient(90deg, #1d4ed8, #3b82f6)",
                      }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RetirementPage() {
  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Calculate how much you need for retirement in India. Accounts for inflation, investment returns, and life expectancy to give you a realistic retirement plan."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Retirement Calculator", href: "/calculators/retirement-calculator" },
      ]}
      faqs={[
        {
          q: "How much corpus do I need to retire in India?",
          a: "A common rule is 25× your annual expenses (4% withdrawal rule). If you spend ₹1L/month, you need ₹3 crore (inflation-adjusted at retirement). Our calculator gives you the exact figure based on your age, expenses, and inflation assumptions.",
        },
        {
          q: "What is a safe withdrawal rate in India?",
          a: "Financial planners suggest 3–4% withdrawal rate adjusted for Indian inflation. With 7% post-retirement return and 6% inflation, a 3.5% withdrawal rate ensures corpus lasts 25+ years.",
        },
      ]}
    >
      <RetirementCalculator />
    </CalculatorLayout>
  );
}
