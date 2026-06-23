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
    { value: "equity" as const, label: "Equity (Stocks / Mutual Funds)", longTermMin: "12 months" },
    { value: "debt" as const, label: "Debt Funds / Bonds", longTermMin: "36 months" },
    { value: "property" as const, label: "Real Estate / Property", longTermMin: "24 months" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">Asset Details</h2>

          {/* Asset type */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-slate-300 block mb-4">Asset Type</label>
            <div className="space-y-2">
              {assetOptions.map((opt) => (
                <button key={opt.value} onClick={() => setAssetType(opt.value)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all text-sm ${
                    assetType === opt.value
                      ? "border-blue-500 bg-blue-950/20"
                      : "border-[#1e2d4a] hover:border-slate-300 dark:hover:border-slate-600"
                  }`}>
                  <div className="font-semibold text-white">{opt.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">LTCG if held &gt; {opt.longTermMin}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Purchase price */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Purchase Price</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">
                {formatCurrency(purchasePrice)}
              </span>
            </div>
            <input type="range" min={1000} max={100000000} step={1000} value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Sale price */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Sale Price</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">
                {formatCurrency(salePrice)}
              </span>
            </div>
            <input type="range" min={1000} max={100000000} step={1000} value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Holding period */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Holding Period</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{holdingYears} Years</span>
            </div>
            <input type="range" min={0} max={30} step={1} value={holdingYears}
              onChange={(e) => setHoldingYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>0 Years</span><span>30 Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">

        {/* Gain type + hero */}
        <div className={`rounded-3xl p-8 border-2 ${result.isLongTerm
          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
          : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${result.isLongTerm ? "text-emerald-500" : "text-amber-500"}`}>
            {result.gainType}
          </p>
          <p className={`text-4xl font-black ${result.gain >= 0
            ? (result.isLongTerm ? "text-emerald-700 text-emerald-400" : "text-amber-700 text-amber-400")
            : "text-rose-700 dark:text-rose-400"}`}>
            {result.gain >= 0 ? "+" : ""}{formatCurrency(result.gain)}
          </p>
          <p className="text-sm text-slate-500 mt-2">Total Capital Gain</p>
        </div>

        {/* Tax summary */}
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">Tax Summary</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Capital Gain", value: formatCurrency(result.gain) },
              { label: "Tax Rate", value: `${result.taxRate}%` },
              ...(result.exemption > 0
                ? [{ label: "LTCG Exemption (₹1L)", value: formatCurrency(result.exemption) }]
                : []),
              { label: "Taxable Gain", value: formatCurrency(result.taxableGain) },
              { label: "Income Tax on Gain", value: formatCurrency(result.tax) },
              { label: "Health & Education Cess (4%)", value: formatCurrency(result.cess) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-3 border-b border-[#1e2d4a] last:border-0">
                <span className="text-sm text-slate-500">{r.label}</span>
                <span className="text-sm font-semibold text-white">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-5 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/50">
              <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">Total Tax Payable</p>
              <p className="text-2xl font-black text-amber-700 text-amber-400">{formatCurrency(result.totalTax)}</p>
            </div>
            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Net Profit After Tax</p>
              <p className="text-2xl font-black text-emerald-700 text-emerald-400">{formatCurrency(result.netProfit)}</p>
            </div>
          </div>
        </div>

        {/* Rates reference */}
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h3 className="text-base font-bold text-white mb-5">Capital Gains Tax Rates — Budget 2024</h3>
          <div className="space-y-3 text-sm text-slate-500">
            {[
              { label: "Equity STCG (< 12 months)", rate: "20%" },
              { label: "Equity LTCG (> 12 months, above ₹1L)", rate: "12.5%" },
              { label: "Debt / Property LTCG (> 24–36 months)", rate: "20% with indexation" },
              { label: "Debt STCG", rate: "As per income slab" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-3 border-b border-[#1e2d4a] last:border-0">
                <span>{item.label}</span>
                <span className="font-semibold text-white">{item.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CapitalGainsPage() {
  return (
    <CalculatorLayout
      title="Capital Gains Tax Calculator"
      description="Calculate LTCG and STCG tax on stocks, mutual funds, and property. Updated for Budget 2024 with new capital gains tax rates."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Capital Gains Calculator", href: "/calculators/capital-gains-calculator" },
      ]}
      faqs={[
        {
          q: "What is the LTCG tax rate on equity in India?",
          a: "After Budget 2024, LTCG on equity and equity mutual funds is 12.5% on gains above ₹1 lakh per financial year. The holding period for LTCG classification is 12 months.",
        },
        {
          q: "Do I need to pay tax on LTCG below ₹1 lakh?",
          a: "No. The first ₹1 lakh of LTCG from equity investments in a financial year is exempt from tax. Only gains above ₹1 lakh are taxed at 12.5%.",
        },
      ]}
    >
      <CapitalGainsCalculator />
    </CalculatorLayout>
  );
}
