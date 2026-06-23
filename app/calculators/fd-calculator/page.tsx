"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateFD, formatCurrency } from "@/lib/calculators";

function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.0);
  const [years, setYears] = useState(3);
  const [compounding, setCompounding] = useState(4);

  const result = calculateFD(principal, rate, years, compounding);

  const compoundingOptions = [
    { label: "Monthly", value: 12 },
    { label: "Quarterly", value: 4 },
    { label: "Half-Yearly", value: 2 },
    { label: "Annually", value: 1 },
  ];

  const principalPct = Math.round((result.principal / result.maturityValue) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">FD Details</h2>

          {/* Principal */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Principal Amount</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">
                {formatCurrency(principal)}
              </span>
            </div>
            <input type="range" min={1000} max={10000000} step={1000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Rate */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={1} max={15} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>1%</span><span>15%</span>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-8">
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

          {/* Compounding */}
          <div>
            <label className="text-sm font-semibold text-slate-300 block mb-4">
              Compounding Frequency
            </label>
            <div className="grid grid-cols-2 gap-2">
              {compoundingOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCompounding(opt.value)}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    compounding === opt.value
                      ? "bg-slate-900 dark:bg-white text-white text-slate-300"
                      : "bg-[#162038] text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tax note */}
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/40">
          <h3 className="font-bold text-amber-900 text-amber-400 text-sm mb-2">Tax on FD Interest</h3>
          <p className="text-xs text-amber-800 text-amber-400 leading-relaxed">
            FD interest is taxable as per your income slab. TDS of 10% is deducted if annual interest exceeds
            ₹40,000 (₹50,000 for senior citizens). Submit Form 15G/15H to avoid TDS if your income is below the
            taxable threshold.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Principal Amount", value: formatCurrency(result.principal) },
              { label: "Total Interest Earned", value: formatCurrency(result.totalInterest), accent: true },
              { label: "Effective Annual Rate", value: `${result.effectiveRate}% p.a.` },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-[#1e2d4a]">
                <span className="text-sm text-slate-500">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-emerald-400" : "text-white"}`}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          {/* Maturity value hero */}
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Maturity Value</p>
            <p className="text-4xl font-black text-emerald-700 text-emerald-400">{formatCurrency(result.maturityValue)}</p>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h3 className="text-base font-bold text-white mb-6">Principal vs Interest</h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Principal</span>
                <span className="font-semibold text-white">
                  {formatCurrency(result.principal)} <span className="text-slate-400 font-normal">({principalPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-[#162038] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }}
                />
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
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #059669, #10b981)" }}
                />
              </div>
            </div>
          </div>

          {/* Combined stacked bar */}
          <div className="mt-6 h-3 rounded-full overflow-hidden flex">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }}
            />
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #059669, #10b981)" }}
            />
          </div>
          <div className="flex items-center gap-6 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Principal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Interest
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Which bank offers the highest FD interest rate?",
    a: "Small Finance Banks (SFBs) like Suryoday, Jana, and Ujjivan typically offer 8–8.6% p.a. compared to private banks at 7–7.5% and PSU banks at 6.5–7%. Check our Live Rates page for current rates.",
  },
  {
    q: "Is FD interest taxable?",
    a: "Yes, FD interest is taxable as per your income tax slab rate. TDS at 10% is deducted at source if total interest from a bank exceeds ₹40,000/year (₹50,000 for senior citizens). Submit Form 15G (below 60 years) or Form 15H (60+) to avoid TDS if income is below the taxable threshold.",
  },
  {
    q: "What is the difference between monthly and quarterly compounding?",
    a: "More frequent compounding produces a slightly higher effective yield. Quarterly compounding (4×/year) is the RBI standard for most bank FDs. Monthly compounding (12×/year) produces the highest effective annual rate. Our calculator applies the exact formula: M = P × (1 + r/n)^(n×t).",
  },
];

export default function FDCalculatorPage() {
  return (
    <CalculatorLayout
      title="FD Calculator"
      description="Calculate Fixed Deposit maturity amount and total interest earned. Compare monthly, quarterly, and annual compounding across different tenures."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "FD Calculator", href: "/calculators/fd-calculator" },
      ]}
      faqs={faqs}
    >
      <FDCalculator />
    </CalculatorLayout>
  );
}
