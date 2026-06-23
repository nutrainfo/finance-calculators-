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

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Retirement Details</h2>
          {[
            { label: "Current Age", value: currentAge, set: setCurrentAge, min: 18, max: 59, step: 1, suffix: " Yr" },
            { label: "Retirement Age", value: retirementAge, set: setRetirementAge, min: currentAge + 1, max: 70, step: 1, suffix: " Yr" },
            { label: "Life Expectancy", value: lifeExpectancy, set: setLifeExpectancy, min: 70, max: 100, step: 1, suffix: " Yr" },
            { label: "Monthly Expenses Today", value: expenses, set: setExpenses, min: 10000, max: 500000, step: 1000, isAmt: true },
            { label: "Current Savings", value: savings, set: setSavings, min: 0, max: 10000000, step: 10000, isAmt: true },
            { label: "Monthly Savings", value: monthlySavings, set: setMonthlySavings, min: 1000, max: 500000, step: 1000, isAmt: true },
            { label: "Expected Return (% p.a.)", value: expectedReturn, set: setExpectedReturn, min: 6, max: 18, step: 0.5, suffix: "%" },
            { label: "Inflation Rate (% p.a.)", value: inflation, set: setInflation, min: 3, max: 12, step: 0.5, suffix: "%" },
          ].map((inp) => (
            <div key={inp.label}>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">{inp.label}</label>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-lg">
                  {inp.isAmt ? formatCurrency(inp.value) : `${inp.value}${inp.suffix || ""}`}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        {/* Status card */}
        <div className={`p-6 rounded-2xl border-2 ${result.isOnTrack ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500" : "bg-rose-50 dark:bg-rose-950/30 border-rose-500"}`}>
          <div className={`text-2xl font-bold mb-2 ${result.isOnTrack ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
            {result.isOnTrack ? "✅ You are on track for retirement!" : "⚠️ Retirement corpus shortfall detected"}
          </div>
          <p className={`text-sm ${result.isOnTrack ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
            {result.isOnTrack
              ? `You will have a surplus of ${formatCurrency(result.surplus)} over your retirement needs.`
              : `You need an additional ${formatCurrency(result.shortfall)} to meet your retirement goals.`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Corpus Needed", value: formatCurrency(result.corpusNeeded), desc: "To sustain your lifestyle" },
            { label: "Corpus You'll Build", value: formatCurrency(result.totalCorpus), desc: "SIP + existing savings" },
            { label: "Future Monthly Expense", value: formatCurrency(result.futureMonthlyExpense), desc: `At ${retirementAge}, inflation-adjusted` },
            { label: result.isOnTrack ? "Surplus" : "Shortfall", value: formatCurrency(result.isOnTrack ? result.surplus : result.shortfall), desc: result.isOnTrack ? "Extra buffer" : "Increase monthly SIP", highlight: result.isOnTrack ? "emerald" : "rose" },
          ].map((c) => (
            <div key={c.label} className={`p-4 rounded-2xl border ${c.highlight === "emerald" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" : c.highlight === "rose" ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
              <div className={`text-xl font-extrabold mb-1 ${c.highlight === "emerald" ? "text-emerald-700 dark:text-emerald-400" : c.highlight === "rose" ? "text-rose-700 dark:text-rose-400" : "text-slate-900 dark:text-white"}`}>{c.value}</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Corpus Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: "From SIP investments", value: result.sipCorpus, color: "blue" },
              { label: "From existing savings growth", value: result.lumpsumCorpus, color: "emerald" },
              { label: "Total projected corpus", value: result.totalCorpus, color: "amber" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                  <span className={`font-bold ${item.color === "amber" ? "text-amber-600 dark:text-amber-400" : item.color === "emerald" ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                    {formatCurrency(item.value)}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color === "amber" ? "bg-amber-500" : item.color === "emerald" ? "bg-emerald-500" : "bg-blue-600"}`}
                    style={{ width: `${Math.min((item.value / result.corpusNeeded) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-300">
            <strong>Years to retirement:</strong> {retirementAge - currentAge} years |
            <strong> Retirement duration:</strong> {lifeExpectancy - retirementAge} years |
            <strong> Rule:</strong> Use 25× annual expenses as minimum corpus (4% withdrawal rule)
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RetirementPage() {
  return (
    <CalculatorLayout
      title="Retirement Calculator — Plan Your Retirement Corpus"
      description="Calculate how much you need for retirement in India. Accounts for inflation, investment returns, and life expectancy to give you a realistic retirement plan."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Retirement Calculator", href: "/calculators/retirement-calculator" }]}
      faqs={[
        { q: "How much corpus do I need to retire in India?", a: "A common rule is 25× your annual expenses (4% withdrawal rule). If you spend ₹1L/month, you need ₹3 crore (inflation-adjusted at retirement). Our calculator gives you the exact figure based on your age, expenses, and inflation assumptions." },
        { q: "What is a safe withdrawal rate in India?", a: "Financial planners suggest 3-4% withdrawal rate adjusted for Indian inflation. With 7% post-retirement return and 6% inflation, a 3.5% withdrawal rate ensures corpus lasts 25+ years." },
      ]}
    >
      <RetirementCalculator />
    </CalculatorLayout>
  );
}
