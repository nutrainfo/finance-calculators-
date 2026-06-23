"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateIncomeTax, formatCurrency } from "@/lib/calculators";

function RegimeComparisonCalculator() {
  const [income, setIncome] = useState(1200000);
  const [sec80c, setSec80c] = useState(150000);
  const [hra, setHra] = useState(60000);
  const [nps, setNps] = useState(50000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const totalOldDeductions = Math.min(sec80c, 150000) + hra + Math.min(nps, 50000) + homeLoanInterest + otherDeductions;

  const newResult = calculateIncomeTax(income, "new");
  const oldResult = calculateIncomeTax(income, "old", {
    section80c: sec80c,
    hra: hra + Math.min(nps, 50000) + homeLoanInterest,
    other: otherDeductions,
  });

  const saving = oldResult.totalTax - newResult.totalTax;
  const betterRegime = saving >= 0 ? "New Regime" : "Old Regime";
  const savings = Math.abs(saving);

  const breakEvenDeduction = income * 0.3 - 75000;

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h2 className="text-lg font-bold text-white mb-8">Your Income & Deductions</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Annual Gross Income</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{formatCurrency(income)}</span>
            </div>
            <input type="range" min={300000} max={10000000} step={50000} value={income}
              onChange={(e) => setIncome(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-5 mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Old Regime Deductions</p>
            {[
              { label: "Section 80C (max ₹1.5L)", value: sec80c, set: setSec80c, max: 150000 },
              { label: "HRA Exemption", value: hra, set: setHra, max: income * 0.5 },
              { label: "NPS — Section 80CCD(1B) (max ₹50K)", value: nps, set: setNps, max: 50000 },
              { label: "Home Loan Interest (80EE/24b)", value: homeLoanInterest, set: setHomeLoanInterest, max: 200000 },
              { label: "Other Deductions (80D, etc.)", value: otherDeductions, set: setOtherDeductions, max: 100000 },
            ].map((inp) => (
              <div key={inp.label}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-[#707a8a]">{inp.label}</label>
                  <span className="text-xs font-bold text-[#b7bdc6]">{formatCurrency(inp.value)}</span>
                </div>
                <input type="range" min={0} max={inp.max} step={1000} value={inp.value}
                  onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
            <span className="text-sm text-blue-700 dark:text-blue-400 font-medium">Total Old Regime Deductions</span>
            <span className="text-sm font-black text-blue-700 dark:text-blue-400">{formatCurrency(totalOldDeductions + 50000)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Winner banner */}
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${saving >= 0
          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
          : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${saving >= 0 ? "text-emerald-500" : "text-blue-500"}`}>
            Better for You
          </p>
          <p className={`text-3xl font-black mb-2 ${saving >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-blue-700 dark:text-blue-400"}`}>
            {betterRegime}
          </p>
          <p className="text-sm text-[#707a8a]">
            Saves {formatCurrency(savings)} in taxes annually ({saving >= 0 ? "vs Old" : "vs New"} Regime)
          </p>
        </div>

        {/* Side by side comparison */}
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h2 className="text-lg font-bold text-white mb-6">Regime Comparison</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              {
                label: "New Regime",
                result: newResult,
                isActive: saving >= 0,
                color: "blue",
              },
              {
                label: "Old Regime",
                result: oldResult,
                isActive: saving < 0,
                color: "violet",
              },
            ].map((r) => (
              <div key={r.label} className={`p-5 rounded-2xl border-2 ${
                r.isActive
                  ? r.color === "blue"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                    : "border-violet-500 bg-violet-50 dark:bg-violet-950/30"
                  : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              }`}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{r.label}</p>
                <p className="text-2xl font-black text-white mb-1">{formatCurrency(r.result.totalTax)}</p>
                <p className="text-xs text-slate-400">Effective: {r.result.effectiveRate}%</p>
                <p className={`text-xs font-semibold mt-2 ${
                  r.color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-violet-600 dark:text-violet-400"
                }`}>
                  In-hand: {formatCurrency(r.result.inHandMonthly)}/mo
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              { label: "Gross Income", new: formatCurrency(newResult.grossIncome), old: formatCurrency(oldResult.grossIncome) },
              { label: "Standard Deduction", new: "₹75,000", old: "₹50,000" },
              { label: "Other Deductions", new: "Not allowed", old: formatCurrency(totalOldDeductions) },
              { label: "Taxable Income", new: formatCurrency(newResult.taxableIncome), old: formatCurrency(oldResult.taxableIncome) },
            ].map((r) => (
              <div key={r.label} className="flex items-center text-xs">
                <span className="w-36 shrink-0 text-slate-400 font-medium">{r.label}</span>
                <span className="flex-1 text-center font-semibold text-blue-600 dark:text-blue-400">{r.new}</span>
                <span className="flex-1 text-center font-semibold text-violet-600 dark:text-violet-400">{r.old}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Break-Even Point</p>
          <p className="text-sm text-[#707a8a] leading-relaxed">
            At your income level, you need total deductions above approximately <strong className="text-slate-800 dark:text-slate-200">{formatCurrency(Math.max(0, breakEvenDeduction))}</strong> for the Old Regime to be better. Your current deductions: {formatCurrency(totalOldDeductions)}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NewVsOldRegimePage() {
  return (
    <CalculatorLayout
      title="New vs Old Tax Regime Calculator"
      description="Compare New and Old income tax regimes side by side for FY 2024-25. Enter your deductions to find which regime saves you more tax money."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator" },
      ]}
      faqs={[
        {
          q: "Who should choose the New Tax Regime?",
          a: "The New Regime (2024-25) is better for most salaried employees with income below ₹15L and limited investments. It has lower slab rates and a ₹75K standard deduction. Under ₹12L income, tax is effectively zero after the Section 87A rebate.",
        },
        {
          q: "Who benefits from the Old Tax Regime?",
          a: "The Old Regime is better if you have high deductions: full ₹1.5L in 80C, HRA exemption, home loan interest, NPS contributions, and health insurance. For high-income taxpayers (₹20L+) with significant deductions, the Old Regime can save ₹50,000–₹1,00,000+ annually.",
        },
      ]}
    >
      <RegimeComparisonCalculator />
    </CalculatorLayout>
  );
}
