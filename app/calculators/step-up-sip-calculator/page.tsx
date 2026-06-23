"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateStepUpSIP, formatCurrency } from "@/lib/calculators";
import { GrowthAreaChart } from "@/components/result-chart";

function StepUpSIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);

  const result = calculateStepUpSIP(monthly, rate, years, stepUp);
  const principalPct = Math.round((result.totalInvested / result.maturityValue) * 100);
  const returnsPct = 100 - principalPct;

  const regularResult = calculateStepUpSIP(monthly, rate, years, 0);
  const extraWealth = result.maturityValue - regularResult.maturityValue;

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Investment Parameters</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Initial Monthly SIP</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{formatCurrency(monthly)}</span>
            </div>
            <input type="range" min={500} max={100000} step={500} value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Annual Step-Up</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{stepUp}% / year</span>
            </div>
            <input type="range" min={0} max={25} step={1} value={stepUp}
              onChange={(e) => setStepUp(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>0% (flat)</span><span>25% / yr</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Expected Annual Return</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{rate}% p.a.</span>
            </div>
            <input type="range" min={1} max={30} step={0.5} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Investment Duration</label>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">{years} Years</span>
            </div>
            <input type="range" min={1} max={40} step={1} value={years}
              onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>1 Year</span><span>40 Years</span>
            </div>
          </div>
        </div>

        {/* Extra wealth vs flat SIP */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-200 dark:border-emerald-800/40">
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            Extra Wealth vs Flat SIP
          </p>
          <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{formatCurrency(extraWealth)}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-2">
            By increasing your SIP by {stepUp}% each year, you generate this much extra corpus compared to a flat ₹{monthly.toLocaleString("en-IN")}/month SIP.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Total Invested", value: formatCurrency(result.totalInvested) },
              { label: "Estimated Returns", value: formatCurrency(result.totalReturns), accent: true },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>{r.value}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 mb-4">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">Total Maturity Value</p>
            <p className="text-4xl font-black text-blue-700 dark:text-blue-400">{formatCurrency(result.maturityValue)}</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 dark:text-slate-400">Amount Invested</span>
                <span className="font-semibold text-slate-900 dark:text-white">({principalPct}%)</span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 dark:text-slate-400">Returns</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">({returnsPct}%)</span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${returnsPct}%`, background: "linear-gradient(90deg, #059669, #10b981)" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Year-wise SIP Amount Growth</h3>
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 sticky top-0">
                <tr>
                  {["Year", "Monthly SIP", "Annual Investment"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Year {row.year}</td>
                    <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-medium">{formatCurrency(row.monthlyAmount)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{formatCurrency(row.invested)}</td>
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

export default function StepUpSIPPage() {
  return (
    <CalculatorLayout
      title="Step-Up SIP Calculator"
      description="Calculate returns on a Step-Up SIP where you increase your monthly investment by a fixed percentage each year. See how annual step-ups dramatically grow your wealth."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Step-Up SIP", href: "/calculators/step-up-sip-calculator" },
      ]}
      faqs={[
        {
          q: "What is a Step-Up SIP?",
          a: "A Step-Up SIP (also called Top-Up SIP) allows you to increase your monthly SIP amount by a fixed percentage each year — typically 10–15% in line with annual salary increments. This small increase, compounded over time, creates significantly larger wealth than a flat SIP.",
        },
        {
          q: "How much should I increase my SIP each year?",
          a: "A 10% annual step-up is a common benchmark that typically aligns with average salary hikes. If you receive a 15-20% increment, a proportional step-up ensures your savings rate stays constant relative to income.",
        },
      ]}
    >
      <StepUpSIPCalculator />
    </CalculatorLayout>
  );
}
