"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateRD, formatCurrency } from "@/lib/calculators";

function RDCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(3);
  const result = calculateRD(monthly, rate, years);

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">RD Details</h2>
          {[
            { label: "Monthly Deposit", value: monthly, set: setMonthly, min: 100, max: 100000, step: 100, isAmt: true },
            { label: "Interest Rate (% p.a.)", value: rate, set: setRate, min: 4, max: 10, step: 0.1, suffix: "%" },
            { label: "Duration (Years)", value: years, set: setYears, min: 1, max: 10, step: 1, suffix: " Yr" },
          ].map((inp) => (
            <div key={inp.label} className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{inp.label}</label>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {inp.isAmt ? formatCurrency(inp.value) : `${inp.value}${inp.suffix || ""}`}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
              {inp.isAmt && (
                <input type="number" value={inp.value} onChange={(e) => inp.set(Number(e.target.value))}
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Deposited", value: formatCurrency(result.totalInvested) },
            { label: "Interest Earned", value: formatCurrency(result.totalInterest), em: "emerald" },
            { label: "Maturity Amount", value: formatCurrency(result.maturityValue), em: "amber" },
          ].map((c) => (
            <div key={c.label} className={`p-5 rounded-2xl border ${c.em === "amber" ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800" : c.em === "emerald" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
              <div className={`text-2xl font-extrabold mb-1 ${c.em === "amber" ? "text-amber-700 dark:text-amber-400" : c.em === "emerald" ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>{c.value}</div>
              <div className="text-xs text-slate-500">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-600 dark:text-slate-400">Return on Investment</span>
            <span className="text-2xl font-bold text-emerald-600">
              {((result.totalInterest / result.totalInvested) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"
              style={{ width: `${(result.totalInvested / result.maturityValue) * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Principal: {((result.totalInvested / result.maturityValue) * 100).toFixed(1)}%</span>
            <span>Interest: {((result.totalInterest / result.maturityValue) * 100).toFixed(1)}%</span>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">💡 RD vs SIP</h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            RD is bank-guaranteed (up to ₹5L DICGC insurance) with fixed returns. SIP in mutual funds carries market risk but can give 10-15% returns long-term vs RD&apos;s 6-7%. Choose RD for short-term goals and SIP for long-term wealth creation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RDCalculatorPage() {
  return (
    <CalculatorLayout
      title="RD Calculator — Recurring Deposit Returns Calculator"
      description="Calculate Recurring Deposit maturity amount and interest earned. See how your monthly deposits grow with compound interest over time."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "RD Calculator", href: "/calculators/rd-calculator" }]}
      faqs={[{ q: "How is RD interest calculated?", a: "RD interest is compounded quarterly in India. Each monthly installment is treated as a separate deposit earning compound interest for its remaining tenure. Our calculator uses this standard bank formula." }]}
    >
      <RDCalculator />
    </CalculatorLayout>
  );
}
