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

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal Loan Details</h2>
          {[
            { label: "Loan Amount", value: principal, set: setPrincipal, min: 10000, max: 5000000, step: 10000, isAmt: true },
            { label: "Interest Rate (% p.a.)", value: rate, set: setRate, min: 8, max: 30, step: 0.5, suffix: "%" },
            { label: "Tenure (Years)", value: tenureYears, set: setTenureYears, min: 1, max: 7, step: 1, suffix: " Yr" },
          ].map((inp) => (
            <div key={inp.label}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{inp.label}</label>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {inp.isAmt ? formatCurrency(inp.value) : `${inp.value}${inp.suffix || ""}`}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
              {inp.isAmt && (
                <input type="number" value={inp.value} onChange={(e) => inp.set(Number(e.target.value))}
                  className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-gradient-to-br from-violet-800 to-violet-600 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-violet-200 text-sm mb-1">Monthly EMI</p>
          <p className="text-5xl font-extrabold mb-4">{formatCurrency(result.emi)}</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div><p className="text-violet-200 text-xs">Principal</p><p className="font-bold">{formatCurrency(result.principal)}</p></div>
            <div><p className="text-violet-200 text-xs">Total Interest</p><p className="font-bold text-amber-300">{formatCurrency(result.totalInterest)}</p></div>
            <div><p className="text-violet-200 text-xs">Total Payable</p><p className="font-bold">{formatCurrency(result.totalAmount)}</p></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Principal vs Interest</h3>
          <InvestmentPieChart invested={result.principal} returns={result.totalInterest} />
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800">
          <h3 className="font-semibold text-amber-900 dark:text-amber-400 mb-2">💡 Tips to Reduce Personal Loan Cost</h3>
          <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
            <li>• Maintain CIBIL score above 750 for lowest rates</li>
            <li>• Compare rates from multiple lenders before applying</li>
            <li>• Prepay whenever you have surplus funds</li>
            <li>• Opt for shorter tenure to save on total interest</li>
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
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Calculators", href: "/calculators" }, { label: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator" }]}
      faqs={[{ q: "What is the current personal loan interest rate?", a: "Personal loan rates range from 10.5% to 24% p.a. depending on your CIBIL score, income, and lender. HDFC Bank offers from 10.75%, SBI from 11%, and fintech lenders from 12%." }]}
    >
      <PersonalLoanCalculator />
    </CalculatorLayout>
  );
}
