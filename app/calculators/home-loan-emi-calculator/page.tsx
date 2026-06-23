"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateEMI, formatCurrency } from "@/lib/calculators";
import { InvestmentPieChart } from "@/components/result-chart";

function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = calculateEMI(principal, rate, tenureYears * 12);
  const principalPct = Math.round((result.principal / result.totalAmount) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="space-y-6">
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h2 className="text-lg font-bold text-white mb-8">Loan Details</h2>

          {/* Loan Amount */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loan Amount</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                {formatCurrency(principal)}
              </span>
            </div>
            <input type="range" min={100000} max={100000000} step={100000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Rate */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={5} max={20} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>5%</span><span>20%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loan Tenure</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{tenureYears} Years</span>
            </div>
            <input type="range" min={1} max={30} step={1} value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>1 Year</span><span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h3 className="text-base font-bold text-white mb-6">Principal vs Interest</h3>
          <InvestmentPieChart invested={result.principal} returns={result.totalInterest} />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h2 className="text-lg font-bold text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Loan Amount", value: formatCurrency(result.principal) },
              { label: "Total Interest Payable", value: formatCurrency(result.totalInterest), accent: true },
              { label: "Total Amount Payable", value: formatCurrency(result.totalAmount) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-[#707a8a]">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-rose-600 dark:text-rose-400" : "text-white"}`}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          {/* Monthly EMI hero */}
          <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">Monthly EMI</p>
            <p className="text-4xl font-black text-blue-700 dark:text-blue-400">{formatCurrency(result.emi)}</p>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="bg-[#1a1e24] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#2a303a]">
          <h3 className="text-base font-bold text-white mb-6">Loan Breakdown</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#707a8a]">Principal</span>
                <span className="font-semibold text-white">
                  {formatCurrency(result.principal)} <span className="text-slate-400 font-normal">({principalPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-[#252b33] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#707a8a]">Total Interest</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  {formatCurrency(result.totalInterest)} <span className="text-slate-400 font-normal">({interestPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-[#252b33] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #e11d48, #f43f5e)" }} />
              </div>
            </div>
          </div>
          <div className="mt-6 h-3 rounded-full overflow-hidden flex">
            <div className="h-full transition-all duration-500"
              style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }} />
            <div className="h-full transition-all duration-500"
              style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #e11d48, #f43f5e)" }} />
          </div>
          <div className="flex items-center gap-6 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Principal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Interest
            </span>
          </div>
        </div>

        {/* Amortization toggle */}
        <div className="bg-[#1a1e24] rounded-3xl border border-[#2a303a] overflow-hidden">
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full px-8 py-5 text-left font-semibold text-white flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm"
          >
            <span>Amortization Schedule (First 24 Months)</span>
            <span className="text-blue-600 dark:text-blue-400 text-xs">{showSchedule ? "Hide" : "Show"}</span>
          </button>
          {showSchedule && (
            <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-800 max-h-80">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 sticky top-0">
                  <tr>
                    {["Month", "EMI", "Principal", "Interest", "Balance"].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 24).map((row) => (
                    <tr key={row.month} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-3 text-[#b7bdc6] font-medium">Month {row.month}</td>
                      <td className="px-6 py-3 text-slate-500">{formatCurrency(row.emi)}</td>
                      <td className="px-6 py-3 text-blue-600 dark:text-blue-400">{formatCurrency(row.principal)}</td>
                      <td className="px-6 py-3 text-rose-600 dark:text-rose-400">{formatCurrency(row.interest)}</td>
                      <td className="px-6 py-3 font-semibold text-white">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "What is the current home loan interest rate in India?",
    a: "Home loan interest rates in India range from 8.35% to 10.5% p.a. depending on the bank, loan amount, and borrower profile. SBI currently offers home loans starting at 8.50% p.a. HDFC, ICICI, and Axis Bank offer similar rates.",
  },
  {
    q: "How is home loan EMI calculated?",
    a: "EMI = P × r × (1+r)^n / [(1+r)^n – 1] where P = principal, r = monthly interest rate (annual rate ÷ 12), n = tenure in months. Our calculator uses this reducing balance method.",
  },
  {
    q: "Should I choose a shorter or longer tenure?",
    a: "Shorter tenure means higher EMI but much lower total interest. A 20-year loan at 8.5% on ₹50L pays ₹57L in interest. The same loan for 10 years pays only ₹23L interest. If you can afford higher EMIs, choose shorter tenure.",
  },
];

export default function HomeLoanEMIPage() {
  return (
    <CalculatorLayout
      title="Home Loan EMI Calculator"
      description="Calculate your home loan EMI, total interest payable, and get a complete amortization schedule. Compare different tenures and interest rates instantly."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator" },
      ]}
      faqs={faqs}
    >
      <EMICalculator />
    </CalculatorLayout>
  );
}
