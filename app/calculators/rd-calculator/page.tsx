"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateRD, formatCurrency } from "@/lib/calculators";

function RDCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(3);
  const result = calculateRD(monthly, rate, years);
  const principalPct = Math.round((result.totalInvested / result.maturityValue) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">RD Details</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Monthly Deposit</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">
                {formatCurrency(monthly)}
              </span>
            </div>
            <input type="range" min={100} max={100000} step={100} value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={4} max={10} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>4%</span><span>10%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Duration</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{years} Years</span>
            </div>
            <input type="range" min={1} max={10} step={1} value={years}
              onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>1 Year</span><span>10 Years</span>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="bg-blue-950/20 rounded-3xl p-6 border border-blue-200 dark:border-blue-800/40">
          <h3 className="font-bold text-blue-900 text-blue-400 text-sm mb-2">RD vs SIP</h3>
          <p className="text-xs text-blue-800 text-blue-400 leading-relaxed">
            RD is bank-guaranteed (up to ₹5L DICGC insurance) with fixed returns. SIP in mutual funds carries market risk but can deliver 10–15% returns long-term vs RD&apos;s 6–7%. Choose RD for short-term goals and SIP for long-term wealth creation.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Total Deposited", value: formatCurrency(result.totalInvested) },
              { label: "Interest Earned", value: formatCurrency(result.totalInterest), accent: true },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-[#1e2d4a]">
                <span className="text-sm text-slate-500">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-emerald-400" : "text-white"}`}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Maturity Amount</p>
            <p className="text-4xl font-black text-emerald-700 text-emerald-400">{formatCurrency(result.maturityValue)}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h3 className="text-base font-bold text-white mb-6">Deposited vs Interest</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Total Deposited</span>
                <span className="font-semibold text-white">
                  {formatCurrency(result.totalInvested)} <span className="text-slate-400 font-normal">({principalPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-[#162038] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Interest Earned</span>
                <span className="font-semibold text-emerald-400">
                  {formatCurrency(result.totalInterest)} <span className="text-slate-400 font-normal">({interestPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-[#162038] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #059669, #10b981)" }} />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Return on Investment</span>
              <span className="text-lg font-bold text-emerald-400">
                {((result.totalInterest / result.totalInvested) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RDCalculatorPage() {
  return (
    <CalculatorLayout
      title="RD Calculator"
      description="Calculate Recurring Deposit maturity amount and interest earned. See how your monthly deposits grow with compound interest over time."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "RD Calculator", href: "/calculators/rd-calculator" },
      ]}
      faqs={[
        {
          q: "How is RD interest calculated?",
          a: "RD interest is compounded quarterly in India. Each monthly installment is treated as a separate deposit earning compound interest for its remaining tenure. Our calculator uses this standard bank formula.",
        },
        {
          q: "Is RD interest taxable?",
          a: "Yes, RD interest is fully taxable as per your income slab. TDS at 10% is deducted if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Submit Form 15G/15H to avoid TDS if your income is below the taxable threshold.",
        },
      ]}
    >
      <RDCalculator />
    </CalculatorLayout>
  );
}
