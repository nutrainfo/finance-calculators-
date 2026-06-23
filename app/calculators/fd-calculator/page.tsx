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

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">FD Details</h2>

          {/* Principal */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Principal Amount</label>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                {formatCurrency(principal)}
              </span>
            </div>
            <input type="range" min={1000} max={10000000} step={1000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full" />
            <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Rate */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={1} max={15} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
          </div>

          {/* Duration */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration</label>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{years} Years</span>
            </div>
            <input type="range" min={1} max={10} step={1} value={years}
              onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
          </div>

          {/* Compounding */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-3">Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {compoundingOptions.map((opt) => (
                <button key={opt.value}
                  onClick={() => setCompounding(opt.value)}
                  className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                    compounding === opt.value
                      ? "bg-blue-800 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Principal Amount", value: formatCurrency(result.principal) },
            { label: "Total Interest Earned", value: formatCurrency(result.totalInterest), highlight: true },
            { label: "Maturity Value", value: formatCurrency(result.maturityValue), big: true },
            { label: "Effective Rate", value: `${result.effectiveRate}% p.a.` },
          ].map((card) => (
            <div key={card.label}
              className={`p-5 rounded-2xl border ${
                card.big ? "col-span-2 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                  : card.highlight ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className={`text-2xl font-extrabold mb-1 ${
                card.big ? "text-emerald-700 dark:text-emerald-400 text-3xl"
                  : card.highlight ? "text-blue-700 dark:text-blue-400"
                  : "text-slate-900 dark:text-white"
              }`}>
                {card.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Visual bar */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Principal vs Interest Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">Principal</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(result.principal)}</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-800 to-blue-500 rounded-full"
                  style={{ width: `${(result.principal / result.maturityValue) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">Interest Earned</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(result.totalInterest)}</span>
              </div>
              <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                  style={{ width: `${(result.totalInterest / result.maturityValue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800">
          <h3 className="font-semibold text-amber-900 dark:text-amber-400 mb-2">💡 Tax on FD Interest</h3>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            FD interest is taxable as per your income tax slab. TDS of 10% is deducted if interest exceeds ₹40,000/year (₹50,000 for senior citizens). Submit Form 15G/15H to avoid TDS if your total income is below taxable limit.
          </p>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Which bank offers the highest FD interest rate?",
    a: "Small finance banks and private banks like IDFC FIRST, IndusInd, Yes Bank typically offer higher FD rates (7-7.5%) compared to PSU banks (6.5-7%). Check our Live Rates page for updated rates.",
  },
  {
    q: "Is FD interest taxable?",
    a: "Yes, FD interest is fully taxable as per your income tax slab. TDS at 10% is deducted at source if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). You can submit Form 15G/H to avoid TDS.",
  },
  {
    q: "What is the difference between monthly and quarterly compounding?",
    a: "With more frequent compounding, you earn slightly higher returns. Quarterly compounding (4 times/year) is standard for most bank FDs. Monthly compounding gives the highest effective yield.",
  },
];

export default function FDCalculatorPage() {
  return (
    <CalculatorLayout
      title="FD Calculator — Fixed Deposit Returns Calculator"
      description="Calculate Fixed Deposit maturity amount and interest earned with our accurate FD calculator. Compare quarterly, monthly and annual compounding."
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
