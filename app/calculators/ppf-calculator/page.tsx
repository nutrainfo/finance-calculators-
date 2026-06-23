"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculatePPF, formatCurrency } from "@/lib/calculators";
import { GrowthAreaChart } from "@/components/result-chart";

function PPFCalculator() {
  const [yearly, setYearly] = useState(150000);
  const [years, setYears] = useState(15);
  const result = calculatePPF(yearly, years);
  const principalPct = Math.round((result.totalInvested / result.maturityValue) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="space-y-6">
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h2 className="text-lg font-bold text-white mb-8">PPF Details</h2>

          {/* Rate display */}
          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 mb-8">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Current PPF Rate</p>
            <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">7.1% p.a.</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">Tax-free returns — EEE category</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Yearly Investment</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                {formatCurrency(yearly)}
              </span>
            </div>
            <input type="range" min={500} max={150000} step={500} value={yearly}
              onChange={(e) => setYearly(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={yearly} onChange={(e) => setYearly(Math.min(150000, Number(e.target.value)))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>₹500 (min)</span><span>₹1.5L (max)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Investment Period</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{years} Years</span>
            </div>
            <input type="range" min={15} max={50} step={5} value={years}
              onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>15 Yr (min)</span><span>50 Yr (extended)</span>
            </div>
          </div>
        </div>

        {/* Tax note */}
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/40">
          <h3 className="font-bold text-amber-900 dark:text-amber-400 text-sm mb-2">PPF Tax Benefits</h3>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            PPF has a lock-in of 15 years. Extensions in blocks of 5 years. Section 80C deduction up to ₹1.5 lakh per year. Interest earned and maturity proceeds are completely tax-free under EEE status.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h2 className="text-lg font-bold text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Total Invested", value: formatCurrency(result.totalInvested) },
              { label: "Interest Earned (Tax-Free)", value: formatCurrency(result.totalInterest), accent: true },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-[#707a8a]">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-emerald-600 dark:text-emerald-400" : "text-white"}`}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Maturity Value</p>
            <p className="text-4xl font-black text-emerald-700 dark:text-emerald-400">{formatCurrency(result.maturityValue)}</p>
          </div>

          {/* Breakdown bars */}
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#707a8a]">Principal</span>
                <span className="font-semibold text-white">({principalPct}%)</span>
              </div>
              <div className="h-2.5 bg-[#252b33] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#707a8a]">Tax-Free Interest</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">({interestPct}%)</span>
              </div>
              <div className="h-2.5 bg-[#252b33] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #059669, #10b981)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Growth chart */}
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h3 className="text-base font-bold text-white mb-6">PPF Growth Projection</h3>
          <GrowthAreaChart data={result.yearlyBreakdown} dataKey="balance" investedKey={undefined} />
        </div>

        {/* Year-wise table */}
        <div className="bg-[#1a1e24] rounded-3xl border border-[#2a303a] overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-white">Year-wise Balance</h3>
          </div>
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 sticky top-0">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Interest</th>
                  <th className="px-8 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-8 py-4 font-semibold text-[#b7bdc6]">Year {row.year}</td>
                    <td className="px-6 py-4 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(row.interest)}</td>
                    <td className="px-8 py-4 text-right font-bold text-blue-600 dark:text-blue-400">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PPFCalculatorPage() {
  return (
    <CalculatorLayout
      title="PPF Calculator"
      description="Calculate your PPF maturity amount at 7.1% p.a. PPF offers tax-free returns under EEE category with Section 80C deduction up to ₹1.5 lakh."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "PPF Calculator", href: "/calculators/ppf-calculator" },
      ]}
      faqs={[
        {
          q: "What is the current PPF interest rate?",
          a: "The current PPF interest rate is 7.1% per annum (Q1 FY 2025-26). The government reviews PPF rates quarterly, though rates have been stable for several quarters.",
        },
        {
          q: "Can I withdraw from PPF before 15 years?",
          a: "Partial withdrawal is allowed from the 7th year (up to 50% of balance at end of 4th year). Full premature closure is allowed under special circumstances like medical emergency or education of children.",
        },
      ]}
    >
      <PPFCalculator />
    </CalculatorLayout>
  );
}
