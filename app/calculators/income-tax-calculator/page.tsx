"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateIncomeTax, formatCurrency } from "@/lib/calculators";

function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000);
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [sec80c, setSec80c] = useState(150000);
  const [hra, setHra] = useState(0);
  const [other, setOther] = useState(0);

  const result = calculateIncomeTax(income, regime, { section80c: sec80c, hra, other });
  const newResult = calculateIncomeTax(income, "new");
  const oldResult = calculateIncomeTax(income, "old", { section80c: sec80c, hra, other });
  const saving = oldResult.totalTax - newResult.totalTax;

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Left — Inputs */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Income Details (FY 2024-25)</h2>

          {/* Regime toggle */}
          <div className="flex rounded-2xl border border-slate-200 dark:border-slate-700 p-1 mb-8 bg-slate-50 dark:bg-slate-800">
            {(["new", "old"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegime(r)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${
                  regime === r
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {r} Regime
              </button>
            ))}
          </div>

          {/* Gross income slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Annual Gross Income
              </label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                {formatCurrency(income)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={10000000}
              step={50000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full mb-3"
            />
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter annual income"
            />
          </div>

          {/* Old regime deductions */}
          {regime === "old" && (
            <div className="space-y-5 p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Deductions (Old Regime)</p>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Section 80C <span className="font-normal text-slate-400">(Max ₹1.5L)</span>
                </label>
                <input
                  type="number"
                  value={sec80c}
                  max={150000}
                  onChange={(e) => setSec80c(Math.min(150000, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  HRA Exemption
                </label>
                <input
                  type="number"
                  value={hra}
                  onChange={(e) => setHra(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Other Deductions
                </label>
                <input
                  type="number"
                  value={other}
                  onChange={(e) => setOther(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right — Results */}
      <div className="space-y-6">

        {/* Key metrics */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Tax Summary</h2>

          <div className="space-y-4">
            {[
              { label: "Gross Income", value: formatCurrency(result.grossIncome), dim: true },
              { label: "Taxable Income", value: formatCurrency(result.taxableIncome), dim: true },
              { label: "Income Tax", value: formatCurrency(result.tax), dim: true },
              { label: "Health & Education Cess (4%)", value: formatCurrency(result.cess), dim: true },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <span className="text-sm text-slate-500 dark:text-slate-400">{row.label}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Total tax */}
          <div className="mt-4 p-5 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800/50">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              Total Tax Payable
            </p>
            <p className="text-3xl font-black text-amber-700 dark:text-amber-400">
              {formatCurrency(result.totalTax)}
            </p>
          </div>

          {/* Monthly in-hand */}
          <div className="mt-3 p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Monthly In-Hand
            </p>
            <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">
              {formatCurrency(result.inHandMonthly)}
            </p>
          </div>

          {/* Effective rate bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Effective Tax Rate</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">{result.effectiveRate}%</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(result.effectiveRate * 3, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Regime comparison */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-5">New vs Old Regime</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-5 rounded-2xl border-2 transition-colors ${
              regime === "new"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            }`}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">New Regime</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(newResult.totalTax)}</p>
              <p className="text-xs text-slate-400 mt-1">Effective: {newResult.effectiveRate}%</p>
            </div>
            <div className={`p-5 rounded-2xl border-2 transition-colors ${
              regime === "old"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            }`}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Old Regime</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(oldResult.totalTax)}</p>
              <p className="text-xs text-slate-400 mt-1">Effective: {oldResult.effectiveRate}%</p>
            </div>
          </div>

          <div className={`p-4 rounded-2xl text-sm font-semibold text-center ${
            saving >= 0
              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
              : "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400"
          }`}>
            {saving >= 0
              ? `New Regime saves ${formatCurrency(Math.abs(saving))} per year`
              : `Old Regime saves ${formatCurrency(Math.abs(saving))} per year`}
          </div>
        </div>

        {/* Tax slab breakdown */}
        {result.slabs.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Tax Slab Breakdown</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60">
                  <th className="px-8 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Income Range</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Rate</th>
                  <th className="px-8 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.slabs.map((slab, i) => (
                  <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-8 py-4 text-slate-700 dark:text-slate-300 font-medium">{slab.range}</td>
                    <td className="px-6 py-4 text-right text-slate-500">{slab.rate}</td>
                    <td className="px-8 py-4 text-right font-bold text-amber-600 dark:text-amber-400">{formatCurrency(slab.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Which tax regime is better for FY 2024-25?",
    a: "The new tax regime is better for most taxpayers with income below ₹15L and limited deductions. If you have high 80C investments, HRA exemption, and home loan deductions, the old regime may save more tax. Use our comparison tool above.",
  },
  {
    q: "What is the basic tax exemption limit under new regime?",
    a: "Under the new regime, income up to ₹12 lakh is effectively tax-free (after ₹75,000 standard deduction and Section 87A rebate for income up to ₹12L). This makes the new regime very attractive for salaried employees.",
  },
];

export default function IncomeTaxPage() {
  return (
    <CalculatorLayout
      title="Income Tax Calculator FY 2024-25"
      description="Calculate your income tax under the new and old tax regime for FY 2024-25. Compare total tax liability, effective rate, and monthly in-hand salary instantly."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
      ]}
      faqs={faqs}
    >
      <IncomeTaxCalculator />
    </CalculatorLayout>
  );
}
