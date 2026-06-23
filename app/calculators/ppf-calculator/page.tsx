"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculatePPF, formatCurrency } from "@/lib/calculators";
import { GrowthAreaChart } from "@/components/result-chart";

function PPFCalculator() {
  const [yearly, setYearly] = useState(150000);
  const [years, setYears] = useState(15);
  const result = calculatePPF(yearly, years);

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">PPF Details</h2>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">Current PPF Rate</div>
            <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">7.1% p.a.</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-500">Tax-free returns (EEE)</div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Yearly Investment</label>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{formatCurrency(yearly)}</span>
            </div>
            <input type="range" min={500} max={150000} step={500} value={yearly}
              onChange={(e) => setYearly(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹500 (min)</span><span>₹1.5L (max)</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Investment Period</label>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{years} Years</span>
            </div>
            <input type="range" min={15} max={50} step={5} value={years}
              onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>15 Yr (min)</span><span>50 Yr (extended)</span>
            </div>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-800 dark:text-amber-300">
              PPF has a lock-in of 15 years. Extensions in blocks of 5 years. Section 80C deduction up to ₹1.5L per year. Maturity proceeds are completely tax-free.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Invested", value: formatCurrency(result.totalInvested) },
            { label: "Interest Earned (Tax-Free)", value: formatCurrency(result.totalInterest), em: "emerald" },
            { label: "Maturity Value", value: formatCurrency(result.maturityValue), em: "amber" },
          ].map((c) => (
            <div key={c.label} className={`p-5 rounded-2xl border ${c.em === "amber" ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800" : c.em === "emerald" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
              <div className={`text-2xl font-extrabold mb-1 ${c.em === "amber" ? "text-amber-700 dark:text-amber-400" : c.em === "emerald" ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>{c.value}</div>
              <div className="text-xs text-slate-500">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">PPF Growth Projection</h3>
          <GrowthAreaChart data={result.yearlyBreakdown} dataKey="balance" investedKey={undefined} />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Year-wise Balance</h3>
          </div>
          <div className="overflow-x-auto max-h-60">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-500 font-medium">Year</th>
                  <th className="px-4 py-3 text-right text-slate-500 font-medium">Interest</th>
                  <th className="px-4 py-3 text-right text-slate-500 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">Year {row.year}</td>
                    <td className="px-4 py-2 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(row.interest)}</td>
                    <td className="px-4 py-2 text-right font-semibold text-blue-700 dark:text-blue-400">{formatCurrency(row.balance)}</td>
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
      title="PPF Calculator — Public Provident Fund Returns"
      description="Calculate your PPF maturity amount at 7.1% p.a. PPF offers tax-free returns under EEE category with Section 80C deduction up to ₹1.5 lakh."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "PPF Calculator", href: "/calculators/ppf-calculator" }]}
      faqs={[
        { q: "What is the current PPF interest rate?", a: "The current PPF interest rate is 7.1% per annum (Q1 FY 2025-26). The government reviews PPF rates quarterly, though rates have been stable for several quarters." },
        { q: "Can I withdraw from PPF before 15 years?", a: "Partial withdrawal is allowed from the 7th year (up to 50% of balance at end of 4th year). Full premature closure is allowed under special circumstances like medical emergency, education of children." },
      ]}
    >
      <PPFCalculator />
    </CalculatorLayout>
  );
}
