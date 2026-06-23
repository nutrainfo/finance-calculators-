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

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Loan Details</h2>

          {[
            { label: "Loan Amount", value: principal, setValue: setPrincipal, min: 100000, max: 100000000, step: 100000, isAmount: true },
            { label: "Interest Rate (% p.a.)", value: rate, setValue: setRate, min: 5, max: 20, step: 0.1, suffix: "%" },
            { label: "Loan Tenure (Years)", value: tenureYears, setValue: setTenureYears, min: 1, max: 30, step: 1, suffix: " Yr" },
          ].map((inp) => (
            <div key={inp.label} className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{inp.label}</label>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {inp.isAmount ? formatCurrency(inp.value) : `${inp.value}${inp.suffix || ""}`}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.setValue(Number(e.target.value))} className="w-full" />
              {inp.isAmount && (
                <input type="number" value={inp.value} onChange={(e) => inp.setValue(Number(e.target.value))}
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 space-y-6">
        {/* EMI highlight */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-blue-200 text-sm mb-1">Monthly EMI</p>
          <p className="text-5xl font-extrabold mb-4">{formatCurrency(result.emi)}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-200 text-xs">Principal Amount</p>
              <p className="font-bold">{formatCurrency(result.principal)}</p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Total Interest</p>
              <p className="font-bold text-amber-300">{formatCurrency(result.totalInterest)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-blue-200 text-xs">Total Amount Payable</p>
              <p className="font-bold text-xl">{formatCurrency(result.totalAmount)}</p>
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Principal vs Interest</h3>
          <InvestmentPieChart invested={result.principal} returns={result.totalInterest} />
        </div>

        {/* Amortization toggle */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full px-6 py-4 text-left font-semibold text-slate-900 dark:text-white flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <span>Amortization Schedule (First 24 Months)</span>
            <span className="text-blue-600">{showSchedule ? "▲ Hide" : "▼ Show"}</span>
          </button>
          {showSchedule && (
            <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-700 max-h-80">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-slate-500 font-medium">Month</th>
                    <th className="px-4 py-3 text-right text-slate-500 font-medium">EMI</th>
                    <th className="px-4 py-3 text-right text-slate-500 font-medium">Principal</th>
                    <th className="px-4 py-3 text-right text-slate-500 font-medium">Interest</th>
                    <th className="px-4 py-3 text-right text-slate-500 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 24).map((row) => (
                    <tr key={row.month} className="border-t border-slate-100 dark:border-slate-700">
                      <td className="px-4 py-2 text-slate-900 dark:text-white">Month {row.month}</td>
                      <td className="px-4 py-2 text-right text-slate-600 dark:text-slate-400">{formatCurrency(row.emi)}</td>
                      <td className="px-4 py-2 text-right text-blue-600 dark:text-blue-400">{formatCurrency(row.principal)}</td>
                      <td className="px-4 py-2 text-right text-rose-600 dark:text-rose-400">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-2 text-right font-medium text-slate-900 dark:text-white">{formatCurrency(row.balance)}</td>
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
      title="Home Loan EMI Calculator — Calculate Housing Loan EMI"
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
