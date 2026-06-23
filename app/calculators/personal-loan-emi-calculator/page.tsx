"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateEMI, formatCurrency } from "@/lib/calculators";
import { InvestmentPieChart } from "@/components/result-chart";

function PersonalLoanCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenureYears, setTenureYears] = useState(3);
  const result = calculateEMI(principal, rate, tenureYears * 12);
  const principalPct = Math.round((result.principal / result.totalAmount) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div className="grid lg:grid-cols-2 gap-10">

      {/* Inputs */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Loan Details</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loan Amount</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                {formatCurrency(principal)}
              </span>
            </div>
            <input type="range" min={10000} max={5000000} step={10000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={8} max={30} step={0.5} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>8%</span><span>30%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loan Tenure</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{tenureYears} Years</span>
            </div>
            <input type="range" min={1} max={7} step={1} value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>1 Year</span><span>7 Years</span>
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Principal vs Interest</h3>
          <InvestmentPieChart invested={result.principal} returns={result.totalInterest} />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Loan Amount", value: formatCurrency(result.principal) },
              { label: "Total Interest Payable", value: formatCurrency(result.totalInterest), accent: true },
              { label: "Total Amount Payable", value: formatCurrency(result.totalAmount) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}`}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/50">
            <p className="text-xs font-semibold text-violet-500 uppercase tracking-wider mb-2">Monthly EMI</p>
            <p className="text-4xl font-black text-violet-700 dark:text-violet-400">{formatCurrency(result.emi)}</p>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Loan Breakdown</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 dark:text-slate-400">Principal</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(result.principal)} <span className="text-slate-400 font-normal">({principalPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #7c3aed, #8b5cf6)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 dark:text-slate-400">Total Interest</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  {formatCurrency(result.totalInterest)} <span className="text-slate-400 font-normal">({interestPct}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #e11d48, #f43f5e)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800/40">
          <h3 className="font-bold text-amber-900 dark:text-amber-400 text-sm mb-3">Tips to Reduce Loan Cost</h3>
          <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-2 leading-relaxed">
            <li>Maintain CIBIL score above 750 to qualify for lowest rates</li>
            <li>Compare rates from multiple lenders before applying</li>
            <li>Prepay whenever you have surplus funds to reduce total interest</li>
            <li>Opt for shorter tenure to save significantly on total interest paid</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PersonalLoanPage() {
  return (
    <CalculatorLayout
      title="Personal Loan EMI Calculator"
      description="Calculate personal loan EMI, total interest, and repayment schedule. Compare different tenures to find the best plan for your budget."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator" },
      ]}
      faqs={[
        {
          q: "What is the current personal loan interest rate?",
          a: "Personal loan rates range from 10.5% to 24% p.a. depending on your CIBIL score, income, and lender. HDFC Bank offers from 10.75%, SBI from 11%, and fintech lenders from 12%.",
        },
        {
          q: "How is personal loan EMI calculated?",
          a: "EMI = P × r × (1+r)^n / [(1+r)^n – 1] where P = principal, r = monthly rate, n = months. Unlike home loans, personal loans usually have fixed rates without reset.",
        },
      ]}
    >
      <PersonalLoanCalculator />
    </CalculatorLayout>
  );
}
