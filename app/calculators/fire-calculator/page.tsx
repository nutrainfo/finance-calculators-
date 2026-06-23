"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { formatCurrency } from "@/lib/calculators";

function calculateFIRE(params: {
  currentAge: number;
  monthlyExpenses: number;
  currentSavings: number;
  monthlySavings: number;
  expectedReturn: number;
  inflationRate: number;
  safeWithdrawalRate: number;
}) {
  const { currentAge, monthlyExpenses, currentSavings, monthlySavings, expectedReturn, inflationRate, safeWithdrawalRate } = params;
  const annualExpenses = monthlyExpenses * 12;
  const fireNumber = annualExpenses / (safeWithdrawalRate / 100);

  const r = expectedReturn / 100 / 12;
  let corpus = currentSavings;
  let months = 0;

  while (corpus < fireNumber && months < 600) {
    corpus = corpus * (1 + r) + monthlySavings;
    months++;
  }

  const yearsToFIRE = Math.floor(months / 12);
  const fireAge = currentAge + yearsToFIRE;
  const progress = Math.min((currentSavings / fireNumber) * 100, 100);

  const realReturn = (expectedReturn - inflationRate) / 100;
  const sustainableMonthlyWithdrawal = (fireNumber * (safeWithdrawalRate / 100)) / 12;

  return {
    fireNumber: Math.round(fireNumber),
    yearsToFIRE,
    fireAge,
    progress: Math.round(progress * 10) / 10,
    sustainableMonthlyWithdrawal: Math.round(sustainableMonthlyWithdrawal),
    totalSavedMonthly: Math.round(monthlySavings * months),
    corpus: Math.round(corpus),
    isAlreadyFIRE: currentSavings >= fireNumber,
  };
}

function FIRECalculator() {
  const [currentAge, setCurrentAge] = useState(28);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(30000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [swr, setSwr] = useState(4);

  const result = calculateFIRE({
    currentAge, monthlyExpenses, currentSavings,
    monthlySavings, expectedReturn, inflationRate, safeWithdrawalRate: swr,
  });

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
        <h2 className="text-lg font-bold text-white mb-8">FIRE Parameters</h2>
        <div className="space-y-6">
          {[
            { label: "Current Age", value: currentAge, set: setCurrentAge, min: 18, max: 60, step: 1, suffix: " Yr" },
            { label: "Monthly Expenses", value: monthlyExpenses, set: setMonthlyExpenses, min: 10000, max: 500000, step: 5000, isAmt: true },
            { label: "Current Savings / Investments", value: currentSavings, set: setCurrentSavings, min: 0, max: 50000000, step: 50000, isAmt: true },
            { label: "Monthly Savings", value: monthlySavings, set: setMonthlySavings, min: 1000, max: 500000, step: 1000, isAmt: true },
            { label: "Expected Return (% p.a.)", value: expectedReturn, set: setExpectedReturn, min: 6, max: 20, step: 0.5, suffix: "%" },
            { label: "Inflation Rate (% p.a.)", value: inflationRate, set: setInflationRate, min: 3, max: 10, step: 0.5, suffix: "%" },
            { label: "Safe Withdrawal Rate", value: swr, set: setSwr, min: 2, max: 6, step: 0.5, suffix: "%" },
          ].map((inp) => (
            <div key={inp.label}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">{inp.label}</label>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg">
                  {inp.isAmt ? formatCurrency(inp.value) : `${inp.value}${inp.suffix || ""}`}
                </span>
              </div>
              <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))} className="w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* FIRE Number */}
        <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${result.isAlreadyFIRE
          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
          : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${result.isAlreadyFIRE ? "text-emerald-500" : "text-blue-500"}`}>
            {result.isAlreadyFIRE ? "You Can FIRE Now" : "Your FIRE Number"}
          </p>
          <p className={`text-4xl font-black mb-2 ${result.isAlreadyFIRE ? "text-emerald-700 dark:text-emerald-400" : "text-blue-700 dark:text-blue-400"}`}>
            {formatCurrency(result.fireNumber)}
          </p>
          <p className="text-sm text-slate-500">
            {result.isAlreadyFIRE
              ? "Your current savings already exceed your FIRE target."
              : `Annual expenses ÷ ${swr}% SWR = corpus you need to retire`}
          </p>
        </div>

        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">FIRE Timeline</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Years to FIRE", value: result.isAlreadyFIRE ? "0" : `${result.yearsToFIRE} years`, accent: true },
              { label: "FIRE Age", value: result.isAlreadyFIRE ? `${currentAge} (now)` : `${result.fireAge} years old` },
              { label: "Sustainable Monthly Income", value: formatCurrency(result.sustainableMonthlyWithdrawal) },
              { label: "Current Progress", value: `${result.progress}%` },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <span className="text-sm text-slate-500">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-blue-600 dark:text-blue-400" : "text-white"}`}>{r.value}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>{formatCurrency(currentSavings)} saved</span>
              <span>{formatCurrency(result.fireNumber)} goal</span>
            </div>
            <div className="h-3 bg-[#162038] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${result.progress}%`, background: "linear-gradient(90deg, #1d4ed8, #059669)" }} />
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">{result.progress}% to FIRE</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">What is the FIRE Number?</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your FIRE number is the corpus you need to retire early and live off investment returns. Using a {swr}% safe withdrawal rate means you can withdraw {swr}% annually from your corpus indefinitely — historically, this sustains a 30–50 year retirement with high probability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FIREPage() {
  return (
    <CalculatorLayout
      title="FIRE Calculator"
      description="Calculate your Financial Independence, Retire Early (FIRE) number and timeline. Find out exactly how much corpus you need and how many years it will take to achieve financial freedom."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "FIRE Calculator", href: "/calculators/fire-calculator" },
      ]}
      faqs={[
        {
          q: "What is the FIRE number?",
          a: "Your FIRE number is your annual expenses divided by your Safe Withdrawal Rate (typically 4%). If you spend ₹6L/year and use the 4% rule, your FIRE number is ₹1.5 crore. This is the corpus at which your investments generate enough returns to cover expenses indefinitely.",
        },
        {
          q: "Is the 4% safe withdrawal rate valid in India?",
          a: "The 4% rule was based on US historical data. In India, equity markets have delivered 12–15% CAGR historically, but inflation is also higher (6–7%). A 3.5–4% withdrawal rate is generally considered conservative and safe for a 30+ year retirement in India.",
        },
      ]}
    >
      <FIRECalculator />
    </CalculatorLayout>
  );
}
