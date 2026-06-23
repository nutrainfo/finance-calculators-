"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateLumpsum, formatCurrency } from "@/lib/calculators";
import { InvestmentPieChart, GrowthAreaChart } from "@/components/result-chart";

function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const result = calculateLumpsum(principal, rate, years);

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-6">Investment Details</h2>
          {[
            { label: "Investment Amount", value: principal, set: setPrincipal, min: 1000, max: 10000000, step: 1000, isAmt: true },
            { label: "Expected Return (% p.a.)", value: rate, set: setRate, min: 1, max: 30, step: 0.5, suffix: "%" },
            { label: "Time Period (Years)", value: years, set: setYears, min: 1, max: 40, step: 1, suffix: " Yr" },
          ].map((inp) => (
            <div key={inp.label} className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-[#b7bdc6]">{inp.label}</label>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {inp.isAmt ? formatCurrency(inp.value) : `${inp.value}${inp.suffix || ""}`}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
              {inp.isAmt && (
                <input type="number" value={inp.value} onChange={(e) => inp.set(Number(e.target.value))}
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Principal", value: formatCurrency(result.principal) },
            { label: "Est. Returns", value: formatCurrency(result.totalReturns), em: "emerald" },
            { label: "Maturity Value", value: formatCurrency(result.maturityValue), em: "amber" },
            { label: "Absolute Return", value: `${result.absoluteReturn}%` },
            { label: "CAGR", value: `${result.cagr}%` },
          ].map((c) => (
            <div key={c.label} className={`p-4 rounded-2xl border ${c.em === "amber" ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800" : c.em === "emerald" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
              <div className={`text-xl font-extrabold mb-1 ${c.em === "amber" ? "text-amber-700 dark:text-amber-400" : c.em === "emerald" ? "text-emerald-700 dark:text-emerald-400" : "text-white"}`}>{c.value}</div>
              <div className="text-xs text-slate-500">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-white mb-4">Growth Chart</h3>
          <GrowthAreaChart data={result.yearlyBreakdown} dataKey="value" investedKey={undefined} />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-white mb-4">Breakdown</h3>
          <InvestmentPieChart invested={result.principal} returns={result.totalReturns} />
        </div>
      </div>
    </div>
  );
}

export default function LumpsumPage() {
  return (
    <CalculatorLayout
      title="Lumpsum Calculator — One-Time Investment Returns"
      description="Calculate returns on a one-time lumpsum investment in mutual funds or any instrument. See how your investment grows with compounding."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" }]}
      faqs={[{ q: "SIP vs Lumpsum — which is better?", a: "If markets are at a low point, lumpsum can give better returns. For volatile markets, SIP averages out the cost through rupee cost averaging. Financial advisors often recommend a hybrid approach." }]}
    >
      <LumpsumCalculator />
    </CalculatorLayout>
  );
}
