"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateFD, formatCurrency } from "@/lib/calculators";

const seniorRates = [
  { bank: "SBI", regular: 7.0, senior: 7.5 },
  { bank: "HDFC Bank", regular: 7.1, senior: 7.6 },
  { bank: "ICICI Bank", regular: 7.0, senior: 7.5 },
  { bank: "Axis Bank", regular: 7.1, senior: 7.6 },
  { bank: "Kotak Mahindra", regular: 7.0, senior: 7.5 },
  { bank: "Post Office SCSS", regular: 8.2, senior: 8.2 },
  { bank: "Suryoday SFB", regular: 8.05, senior: 8.55 },
  { bank: "Jana SFB", regular: 8.0, senior: 8.5 },
];

function SeniorCitizenFDCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(3);
  const [compounding, setCompounding] = useState(4);

  const result = calculateFD(principal, rate, years, compounding);
  const regularResult = calculateFD(principal, rate - 0.5, years, compounding);
  const seniorBenefit = result.maturityValue - regularResult.maturityValue;

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
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-8">FD Details</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Principal Amount</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{formatCurrency(principal)}</span>
            </div>
            <input type="range" min={10000} max={10000000} step={10000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={4} max={10} step={0.05} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>4%</span><span>10%</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Duration</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{years} Years</span>
            </div>
            <input type="range" min={1} max={10} step={1} value={years}
              onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 block mb-4">Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {compoundingOptions.map((opt) => (
                <button key={opt.value} onClick={() => setCompounding(opt.value)}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    compounding === opt.value
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-200 dark:border-emerald-800/40">
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Senior Citizen Benefit</p>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{formatCurrency(seniorBenefit)}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">
            Extra earned over regular FD (assuming 0.5% higher rate for senior citizens)
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Results</h2>
          <div className="space-y-4 mb-6">
            {[
              { label: "Principal Amount", value: formatCurrency(result.principal) },
              { label: "Total Interest Earned", value: formatCurrency(result.totalInterest), accent: true },
              { label: "Effective Annual Rate", value: `${result.effectiveRate}% p.a.` },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>{r.value}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Maturity Value</p>
            <p className="text-4xl font-black text-emerald-700 dark:text-emerald-400">{formatCurrency(result.maturityValue)}</p>
          </div>
        </div>

        {/* Bank rates comparison */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Senior Citizen FD Rates — June 2025</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Bank</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Regular</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Senior</th>
                </tr>
              </thead>
              <tbody>
                {seniorRates.map((b) => (
                  <tr key={b.bank} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-3 font-medium text-slate-700 dark:text-slate-300">{b.bank}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{b.regular}%</td>
                    <td className="px-6 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">{b.senior}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 sm:px-8 py-4 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-400">
            Rates are indicative for 1–3 year deposits. Verify directly with banks before investing. TDS at 10% applies if interest exceeds ₹50,000/year for senior citizens.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeniorCitizenFDPage() {
  return (
    <CalculatorLayout
      title="Senior Citizen FD Calculator"
      description="Calculate Fixed Deposit returns for senior citizens. Senior citizens receive 0.25–0.5% higher interest rates from most banks. Compare top bank rates for FY 2025-26."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Senior Citizen FD", href: "/calculators/senior-citizen-fd-calculator" },
      ]}
      faqs={[
        {
          q: "What extra interest rate do senior citizens get on FD?",
          a: "Most banks offer 0.25% to 0.5% higher FD rates for senior citizens (60+ years). The Post Office Senior Citizen Savings Scheme (SCSS) offers 8.2% p.a. for up to 5 years — one of the best risk-free options available.",
        },
        {
          q: "What is the TDS limit for senior citizens on FD interest?",
          a: "TDS is deducted at 10% if annual FD interest exceeds ₹50,000 for senior citizens (vs ₹40,000 for others). Submit Form 15H if your total income is below the taxable threshold to avoid TDS deduction.",
        },
      ]}
    >
      <SeniorCitizenFDCalculator />
    </CalculatorLayout>
  );
}
