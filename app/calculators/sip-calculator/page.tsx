"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateSIP, formatCurrency } from "@/lib/calculators";
import { InvestmentPieChart, GrowthAreaChart } from "@/components/result-chart";

function Slider({ label, value, min, max, step, format, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</label>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mb-2"
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = calculateSIP(monthly, rate, years);

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">Investment Parameters</h2>

          <Slider
            label="Monthly SIP Amount"
            value={monthly}
            min={500}
            max={200000}
            step={500}
            format={(v) => `₹${v.toLocaleString("en-IN")}`}
            onChange={setMonthly}
          />
          <div className="mb-8">
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(Math.max(500, Math.min(200000, Number(e.target.value))))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly amount"
            />
          </div>

          <Slider
            label="Expected Annual Return"
            value={rate}
            min={1}
            max={30}
            step={0.5}
            format={(v) => `${v}% p.a.`}
            onChange={setRate}
          />

          <Slider
            label="Investment Duration"
            value={years}
            min={1}
            max={40}
            step={1}
            format={(v) => `${v} Years`}
            onChange={setYears}
          />
        </div>

        {/* Pie chart */}
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h3 className="text-base font-bold text-white mb-6">Invested vs Returns</h3>
          <InvestmentPieChart invested={result.totalInvested} returns={result.totalReturns} />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">

        {/* Key metrics */}
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Total Invested", value: formatCurrency(result.totalInvested), sub: `₹${monthly.toLocaleString("en-IN")} × ${years * 12} months` },
              { label: "Estimated Returns", value: formatCurrency(result.totalReturns), sub: `At ${rate}% annual return` },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-500">{r.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.sub}</p>
                </div>
                <p className="text-lg font-bold text-white">{r.value}</p>
              </div>
            ))}
          </div>

          {/* Total value hero block */}
          <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 mb-4">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">Total Maturity Value</p>
            <p className="text-4xl font-black text-blue-700 dark:text-blue-400">{formatCurrency(result.maturityValue)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <p className="text-xs text-slate-400 mb-1">Absolute Return</p>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{result.absoluteReturn}%</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <p className="text-xs text-slate-400 mb-1">CAGR</p>
              <p className="text-xl font-black text-violet-600 dark:text-violet-400">{result.cagr}%</p>
            </div>
          </div>
        </div>

        {/* Growth chart */}
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h3 className="text-base font-bold text-white mb-6">Year-wise Growth</h3>
          <GrowthAreaChart data={result.yearlyBreakdown} dataKey="value" investedKey="invested" />
        </div>

        {/* Year-wise table */}
        <div className="bg-[#0d1526] rounded-3xl border border-[#1e2d4a] overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-white">Year-wise Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60">
                  <th className="px-8 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Invested</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Returns</th>
                  <th className="px-8 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-8 py-4 font-semibold text-[slate-300]">Year {row.year}</td>
                    <td className="px-6 py-4 text-right text-slate-500">{formatCurrency(row.invested)}</td>
                    <td className="px-6 py-4 text-right text-emerald-600 dark:text-emerald-400 font-medium">{formatCurrency(row.returns)}</td>
                    <td className="px-8 py-4 text-right font-bold text-blue-600 dark:text-blue-400">{formatCurrency(row.value)}</td>
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
    a: "SIP (Systematic Investment Plan) lets you invest a fixed amount monthly in mutual funds. The formula used is: FV = P × [(1+r)^n – 1]/r × (1+r), where P is the monthly amount, r is the monthly rate, and n is total months. Compounding amplifies returns significantly over long periods.",
  },
  {
    q: "What annual return rate should I assume for SIP?",
    a: "Historical average returns: Large-cap equity funds 10–12% CAGR, Mid-cap 12–15%, Small-cap 14–18% over 10+ year horizons. For conservative long-term planning, 10–12% p.a. is a commonly used benchmark. Past performance does not guarantee future returns.",
  },
  {
    q: "Is SIP better than FD?",
    a: "Equity SIPs have historically delivered 12–15% CAGR over 10+ years — significantly higher than FD rates of 6–7%. However, SIPs carry market risk while FDs provide capital protection. SIP is better for long-term wealth creation; FD suits short-term, low-risk goals.",
  },
];

export default function SIPCalculatorPage() {
  return (
    <CalculatorLayout
      title="SIP Calculator"
      description="Calculate your Systematic Investment Plan returns with precision. See how your monthly investment grows with the power of compounding over time."
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
