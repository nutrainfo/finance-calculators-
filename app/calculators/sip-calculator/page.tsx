"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateSIP, formatCurrency } from "@/lib/calculators";
import { InvestmentPieChart, GrowthAreaChart } from "@/components/result-chart";
import type { Metadata } from "next";

function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = calculateSIP(monthly, rate, years);

  const inputs = [
    {
      label: "Monthly SIP Amount",
      value: monthly,
      setValue: setMonthly,
      min: 500,
      max: 1000000,
      step: 500,
      prefix: "₹",
      format: (v: number) => `₹${v.toLocaleString("en-IN")}`,
    },
    {
      label: "Expected Annual Return (%)",
      value: rate,
      setValue: setRate,
      min: 1,
      max: 30,
      step: 0.5,
      suffix: "%",
      format: (v: number) => `${v}%`,
    },
    {
      label: "Investment Duration (Years)",
      value: years,
      setValue: setYears,
      min: 1,
      max: 40,
      step: 1,
      suffix: "Yr",
      format: (v: number) => `${v} Years`,
    },
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Input Parameters</h2>
          {inputs.map((input) => (
            <div key={input.label} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{input.label}</label>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {input.format(input.value)}
                </span>
              </div>
              <input
                type="range"
                min={input.min}
                max={input.max}
                step={input.step}
                value={input.value}
                onChange={(e) => input.setValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>{input.prefix}{input.min.toLocaleString("en-IN")}{input.suffix}</span>
                <span>{input.prefix}{input.max.toLocaleString("en-IN")}{input.suffix}</span>
              </div>
              {input.prefix === "₹" && (
                <input
                  type="number"
                  value={input.value}
                  onChange={(e) => input.setValue(Math.min(input.max, Math.max(input.min, Number(e.target.value))))}
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-3 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Invested Amount", value: formatCurrency(result.totalInvested), color: "blue" },
            { label: "Estimated Returns", value: formatCurrency(result.totalReturns), color: "emerald" },
            { label: "Total Value", value: formatCurrency(result.maturityValue), color: "amber", big: true },
            { label: "Absolute Return", value: `${result.absoluteReturn}%`, color: "violet" },
            { label: "CAGR", value: `${result.cagr}%`, color: "rose" },
          ].map((card) => (
            <div
              key={card.label}
              className={`p-4 rounded-2xl border ${
                card.big
                  ? "col-span-2 sm:col-span-1 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className={`text-xl font-extrabold mb-1 ${card.big ? "text-amber-700 dark:text-amber-400 text-2xl" : "text-slate-900 dark:text-white"}`}>
                {card.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Investment vs Returns</h3>
          <InvestmentPieChart invested={result.totalInvested} returns={result.totalReturns} />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Year-wise Growth</h3>
          <GrowthAreaChart data={result.yearlyBreakdown} dataKey="value" investedKey="invested" />
        </div>

        {/* Year-wise table (condensed) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Year-wise Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50">
                  <th className="text-left px-4 py-3 text-slate-500 font-medium">Year</th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">Invested</th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">Returns</th>
                  <th className="text-right px-4 py-3 text-slate-500 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Year {row.year}</td>
                    <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">{formatCurrency(row.invested)}</td>
                    <td className="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(row.returns)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-blue-700 dark:text-blue-400">{formatCurrency(row.value)}</td>
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

const faqs = [
  {
    q: "What is SIP and how does it work?",
    a: "SIP (Systematic Investment Plan) allows you to invest a fixed amount monthly in mutual funds. The formula is: FV = P × [(1+r)^n – 1]/r × (1+r), where P is monthly amount, r is monthly rate, and n is total months.",
  },
  {
    q: "What is a good SIP return rate to assume?",
    a: "Historical average returns: Equity large-cap funds: 10-12%, Mid-cap: 12-15%, Small-cap: 14-18%. For conservative planning, use 10-12% for long-term equity SIPs.",
  },
  {
    q: "Is SIP better than FD?",
    a: "SIPs in equity mutual funds have historically given 12-15% CAGR over 10+ years, much higher than FD rates of 6-7%. However, SIPs carry market risk while FDs are capital-protected.",
  },
];

export default function SIPCalculatorPage() {
  return (
    <CalculatorLayout
      title="SIP Calculator — Calculate SIP Returns Online"
      description="Calculate your Systematic Investment Plan (SIP) returns with our accurate SIP calculator. See how your monthly SIP grows with compounding over time."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "SIP Calculator", href: "/calculators/sip-calculator" },
      ]}
      faqs={faqs}
    >
      <SIPCalculator />
    </CalculatorLayout>
  );
}
