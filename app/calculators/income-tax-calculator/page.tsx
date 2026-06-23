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
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Income Details (FY 2024-25)</h2>

          {/* Regime toggle */}
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 p-1 mb-6">
            {(["new", "old"] as const).map((r) => (
              <button key={r} onClick={() => setRegime(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                  regime === r ? "bg-blue-800 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {r} Regime
              </button>
            ))}
          </div>

          {/* Gross income */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Annual Gross Income</label>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                {formatCurrency(income)}
              </span>
            </div>
            <input type="range" min={100000} max={10000000} step={50000} value={income}
              onChange={(e) => setIncome(Number(e.target.value))} className="w-full" />
            <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))}
              className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Old regime deductions */}
          {regime === "old" && (
            <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deductions (Old Regime)</p>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Section 80C (Max ₹1.5L)</label>
                <input type="number" value={sec80c} max={150000}
                  onChange={(e) => setSec80c(Math.min(150000, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">HRA Exemption</label>
                <input type="number" value={hra}
                  onChange={(e) => setHra(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Other Deductions</label>
                <input type="number" value={other}
                  onChange={(e) => setOther(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-3 space-y-6">
        {/* Result cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Gross Income", value: formatCurrency(result.grossIncome) },
            { label: "Taxable Income", value: formatCurrency(result.taxableIncome) },
            { label: "Income Tax", value: formatCurrency(result.tax) },
            { label: "Health & Education Cess (4%)", value: formatCurrency(result.cess) },
            { label: "Total Tax Payable", value: formatCurrency(result.totalTax), big: true, highlight: "amber" },
            { label: "Monthly In-Hand", value: formatCurrency(result.inHandMonthly), big: false, highlight: "emerald" },
          ].map((card) => (
            <div key={card.label}
              className={`p-4 rounded-2xl border ${
                card.highlight === "amber" ? "col-span-2 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                  : card.highlight === "emerald" ? "col-span-2 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className={`font-extrabold mb-1 ${
                card.highlight === "amber" ? "text-amber-700 dark:text-amber-400 text-2xl"
                  : card.highlight === "emerald" ? "text-emerald-700 dark:text-emerald-400 text-2xl"
                  : "text-slate-900 dark:text-white text-xl"
              }`}>
                {card.value}
              </div>
              <div className="text-xs text-slate-500">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Effective rate */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">Effective Tax Rate</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{result.effectiveRate}%</span>
          </div>
          <div className="mt-3 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(result.effectiveRate * 3, 100)}%` }}
            />
          </div>
        </div>

        {/* Regime comparison */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">New vs Old Regime Comparison</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-4 rounded-xl border-2 ${regime === "new" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-slate-200 dark:border-slate-700"}`}>
              <div className="text-xs font-semibold text-slate-500 mb-1">New Regime</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(newResult.totalTax)}</div>
              <div className="text-xs text-slate-500">Effective: {newResult.effectiveRate}%</div>
            </div>
            <div className={`p-4 rounded-xl border-2 ${regime === "old" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-slate-200 dark:border-slate-700"}`}>
              <div className="text-xs font-semibold text-slate-500 mb-1">Old Regime</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(oldResult.totalTax)}</div>
              <div className="text-xs text-slate-500">Effective: {oldResult.effectiveRate}%</div>
            </div>
          </div>
          <div className={`p-4 rounded-xl text-center ${saving >= 0 ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400"}`}>
            <span className="font-bold">
              {saving >= 0
                ? `✅ New Regime saves ₹${Math.abs(saving).toLocaleString("en-IN")}/year`
                : `✅ Old Regime saves ₹${Math.abs(saving).toLocaleString("en-IN")}/year`}
            </span>
          </div>
        </div>

        {/* Tax slab breakdown */}
        {result.slabs.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white">Tax Slab Breakdown</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-4 py-3 text-left text-slate-500 font-medium">Income Range</th>
                  <th className="px-4 py-3 text-right text-slate-500 font-medium">Rate</th>
                  <th className="px-4 py-3 text-right text-slate-500 font-medium">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.slabs.map((slab, i) => (
                  <tr key={i} className="border-t border-slate-100 dark:border-slate-700">
                    <td className="px-4 py-3 text-slate-900 dark:text-white">{slab.range}</td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">{slab.rate}</td>
                    <td className="px-4 py-3 text-right font-semibold text-amber-600 dark:text-amber-400">{formatCurrency(slab.tax)}</td>
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
    a: "Under the new regime, income up to ₹12 lakh is tax-free (after ₹75,000 standard deduction, and ₹87A rebate for income ≤ ₹12L). This makes new regime very attractive for salaried employees.",
  },
];

export default function IncomeTaxPage() {
  return (
    <CalculatorLayout
      title="Income Tax Calculator FY 2024-25 — New vs Old Regime"
      description="Calculate your income tax for FY 2024-25 under both new and old tax regime. Compare tax liability, effective rate, and find which regime saves more."
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
