"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateCapitalGains, formatCurrency } from "@/lib/calculators";

function CapitalGainsCalculator() {
  const [salePrice, setSalePrice] = useState(1000000);
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [holdingYears, setHoldingYears] = useState(2);
  const [assetType, setAssetType] = useState<"equity" | "debt" | "property">("equity");

  const result = calculateCapitalGains({ salePrice, purchasePrice, holdingYears, assetType });

  const assetOptions = [
    { value: "equity", label: "Equity (Stocks/Mutual Funds)", longTermMin: "12 months" },
    { value: "debt", label: "Debt Funds / Bonds", longTermMin: "36 months" },
    { value: "property", label: "Real Estate / Property", longTermMin: "24 months" },
  ] as const;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Asset Details</h2>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-3">Asset Type</label>
            <div className="space-y-2">
              {assetOptions.map((opt) => (
                <button key={opt.value} onClick={() => setAssetType(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${assetType === opt.value ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30" : "border-slate-200 dark:border-slate-700 hover:border-slate-300"}`}>
                  <div className="font-semibold text-slate-900 dark:text-white">{opt.label}</div>
                  <div className="text-xs text-slate-500">LTCG if held {">"} {opt.longTermMin}</div>
                </button>
              ))}
            </div>
          </div>
          {[
            { label: "Purchase Price", value: purchasePrice, set: setPurchasePrice, min: 1000, max: 100000000, step: 1000 },
            { label: "Sale Price", value: salePrice, set: setSalePrice, min: 1000, max: 100000000, step: 1000 },
            { label: "Holding Period (Years)", value: holdingYears, set: setHoldingYears, min: 0, max: 30, step: 1, isYr: true },
          ].map((inp) => (
            <div key={inp.label}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{inp.label}</label>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {inp.isYr ? `${inp.value} Yr` : formatCurrency(inp.value)}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
              {!inp.isYr && (
                <input type="number" value={inp.value} onChange={(e) => inp.set(Number(e.target.value))}
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className={`p-6 rounded-2xl border-2 ${result.isLongTerm ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500" : "bg-amber-50 dark:bg-amber-950/30 border-amber-500"}`}>
          <div className={`text-sm font-semibold mb-1 ${result.isLongTerm ? "text-emerald-600" : "text-amber-600"}`}>
            {result.gainType}
          </div>
          <div className={`text-4xl font-extrabold ${result.gain >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
            {result.gain >= 0 ? "+" : ""}{formatCurrency(result.gain)}
          </div>
          <div className="text-sm text-slate-500 mt-1">Total Capital Gain</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Capital Gain", value: formatCurrency(result.gain) },
            { label: "Tax Rate", value: `${result.taxRate}%` },
            { label: result.exemption > 0 ? `Exemption (₹1L LTCG)` : "Taxable Gain", value: result.exemption > 0 ? formatCurrency(result.exemption) : formatCurrency(result.taxableGain) },
            { label: "Income Tax on Gain", value: formatCurrency(result.tax) },
            { label: "Health & Education Cess", value: formatCurrency(result.cess) },
            { label: "Total Tax Payable", value: formatCurrency(result.totalTax), highlight: "amber" },
            { label: "Net Profit (After Tax)", value: formatCurrency(result.netProfit), highlight: "emerald" },
          ].map((c) => (
            <div key={c.label} className={`p-4 rounded-2xl border ${c.highlight === "amber" ? "col-span-1 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800" : c.highlight === "emerald" ? "col-span-1 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
              <div className={`text-xl font-extrabold mb-1 ${c.highlight === "amber" ? "text-amber-700 dark:text-amber-400" : c.highlight === "emerald" ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>{c.value}</div>
              <div className="text-xs text-slate-500">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">📋 Capital Gains Tax Rates (Budget 2024)</h3>
          <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <p>• <strong>Equity STCG:</strong> 20% (held &lt; 12 months)</p>
            <p>• <strong>Equity LTCG:</strong> 12.5% above ₹1L (held &gt; 12 months)</p>
            <p>• <strong>Debt/Property LTCG:</strong> 20% with indexation (held &gt; 24-36 months)</p>
            <p>• <strong>STCG (Debt/Property):</strong> As per income tax slab</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CapitalGainsPage() {
  return (
    <CalculatorLayout
      title="Capital Gains Tax Calculator India — LTCG & STCG"
      description="Calculate LTCG and STCG tax on stocks, mutual funds, and property. Updated for Budget 2024 with new capital gains tax rates."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Capital Gains Calculator", href: "/calculators/capital-gains-calculator" }]}
      faqs={[
        { q: "What is the LTCG tax rate on equity in India?", a: "After Budget 2024, LTCG on equity and equity mutual funds is 12.5% on gains above ₹1 lakh per financial year. The holding period for LTCG classification is 12 months." },
        { q: "Do I need to pay tax on LTCG below ₹1 lakh?", a: "No. The first ₹1 lakh of LTCG from equity investments in a financial year is exempt from tax. Only gains above ₹1 lakh are taxed at 12.5%." },
      ]}
    >
      <CapitalGainsCalculator />
    </CalculatorLayout>
  );
}
