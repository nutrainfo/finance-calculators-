"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateSWP, formatCurrency } from "@/lib/calculators";

function SWPCalculator() {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(30000);
  const [rate, setRate] = useState(10);

  const result = calculateSWP(corpus, withdrawal, rate);
  const yearsToDeplete = Math.floor(result.months / 12);
  const monthsLeft = result.months % 12;
  const isCorpusSustainable = result.months >= 600;

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">SWP Parameters</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Investment Corpus</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{formatCurrency(corpus)}</span>
            </div>
            <input type="range" min={100000} max={50000000} step={100000} value={corpus}
              onChange={(e) => setCorpus(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={corpus} onChange={(e) => setCorpus(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Monthly Withdrawal</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{formatCurrency(withdrawal)}</span>
            </div>
            <input type="range" min={1000} max={500000} step={1000} value={withdrawal}
              onChange={(e) => setWithdrawal(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={withdrawal} onChange={(e) => setWithdrawal(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Expected Return (% p.a.)</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{rate}% p.a.</span>
            </div>
            <input type="range" min={4} max={18} step={0.5} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>4%</span><span>18%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Withdrawal Rate Analysis</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Annual withdrawal</span>
              <span className="font-semibold text-white">{formatCurrency(withdrawal * 12)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Withdrawal rate</span>
              <span className={`font-semibold ${(withdrawal * 12 / corpus) * 100 <= 4 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {((withdrawal * 12 / corpus) * 100).toFixed(2)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Below 4% withdrawal rate is generally considered safe for long-term sustainability.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${isCorpusSustainable
          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
          : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isCorpusSustainable ? "text-emerald-500" : "text-amber-500"}`}>
            {isCorpusSustainable ? "Corpus is Sustainable (50+ Years)" : "Corpus Duration"}
          </p>
          <p className={`text-4xl font-black mb-2 ${isCorpusSustainable ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
            {isCorpusSustainable ? "50+ Years" : `${yearsToDeplete} Yrs ${monthsLeft} Mo`}
          </p>
          <p className="text-sm text-slate-500">
            {isCorpusSustainable
              ? "At this withdrawal rate, your corpus grows faster than withdrawals."
              : `Total withdrawal: ${formatCurrency(result.totalWithdrawn)}`}
          </p>
        </div>

        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">Summary</h2>
          <div className="space-y-4 mb-6">
            {[
              { label: "Initial Corpus", value: formatCurrency(corpus) },
              { label: "Monthly Withdrawal", value: formatCurrency(withdrawal) },
              { label: "Total Amount Withdrawn", value: formatCurrency(result.totalWithdrawn), accent: true },
              { label: "Remaining Balance", value: formatCurrency(result.finalBalance) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <span className="text-sm text-slate-500">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-blue-600 dark:text-blue-400" : "text-white"}`}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl border border-[#1e2d4a] overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-white">First 24 Months</h3>
          </div>
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 sticky top-0">
                <tr>
                  {["Month", "Withdrawal", "Balance"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.schedule.slice(0, 24).map((row) => (
                  <tr key={row.month} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-3 font-medium text-[slate-300]">Month {row.month}</td>
                    <td className="px-6 py-3 text-blue-600 dark:text-blue-400">{formatCurrency(row.withdrawal)}</td>
                    <td className="px-6 py-3 font-semibold text-white">{formatCurrency(row.balance)}</td>
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

export default function SWPPage() {
  return (
    <CalculatorLayout
      title="SWP Calculator"
      description="Calculate how long your investment corpus will last with Systematic Withdrawal Plan. Find the optimal monthly withdrawal amount to sustain your retirement income."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "SWP Calculator", href: "/calculators/swp-calculator" },
      ]}
      faqs={[
        {
          q: "What is SWP and how does it work?",
          a: "SWP (Systematic Withdrawal Plan) lets you withdraw a fixed amount monthly from your mutual fund corpus while the remaining amount continues to grow. It's commonly used as a retirement income strategy to generate regular cash flow.",
        },
        {
          q: "What is a safe withdrawal rate?",
          a: "The 4% rule suggests withdrawing no more than 4% of your corpus annually — this historically sustains a 30-year retirement. In India, with equity funds at 10–12% return and 6% inflation, a 4–5% withdrawal rate is generally considered sustainable.",
        },
      ]}
    >
      <SWPCalculator />
    </CalculatorLayout>
  );
}
