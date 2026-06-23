"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateEMI, formatCurrency } from "@/lib/calculators";

function calculatePrepayment(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  prepaymentMonth: number,
  prepaymentAmount: number
) {
  const r = annualRate / 100 / 12;
  const emi = r === 0
    ? principal / tenureMonths
    : (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);

  // Without prepayment
  const totalWithout = emi * tenureMonths;
  const interestWithout = totalWithout - principal;

  // With prepayment - simulate month by month
  let balance = principal;
  let totalPaid = 0;
  let months = 0;
  let prepaymentDone = false;

  while (balance > 0 && months < tenureMonths * 2) {
    months++;
    const interest = balance * r;
    const princPart = Math.min(emi - interest, balance);
    balance -= princPart;
    totalPaid += emi;

    if (months === prepaymentMonth && !prepaymentDone && balance > 0) {
      const actualPrepay = Math.min(prepaymentAmount, balance);
      balance -= actualPrepay;
      totalPaid += actualPrepay;
      prepaymentDone = true;
    }

    if (balance <= 1) { balance = 0; break; }
  }

  const interestWith = totalPaid - principal;
  const interestSaved = interestWithout - interestWith;
  const monthsSaved = tenureMonths - months;

  return {
    emi: Math.round(emi),
    originalTenureMonths: tenureMonths,
    newTenureMonths: months,
    monthsSaved: Math.max(0, monthsSaved),
    interestSaved: Math.round(Math.max(0, interestSaved)),
    totalInterestWithout: Math.round(interestWithout),
    totalInterestWith: Math.round(interestWith),
    totalSaved: Math.round(Math.max(0, interestSaved)),
  };
}

function LoanPrepaymentCalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [prepayMonth, setPrepayMonth] = useState(24);
  const [prepayAmount, setPrepayAmount] = useState(200000);

  const result = calculatePrepayment(principal, rate, tenureYears * 12, prepayMonth, prepayAmount);
  const yearsSaved = Math.floor(result.monthsSaved / 12);
  const remainingMonths = result.monthsSaved % 12;

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">Loan Details</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Loan Amount</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{formatCurrency(principal)}</span>
            </div>
            <input type="range" min={100000} max={20000000} step={100000} value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={5} max={20} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Original Tenure</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{tenureYears} Years</span>
            </div>
            <input type="range" min={1} max={30} step={1} value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">Prepayment Details</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Prepayment After (Months)</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">Month {prepayMonth}</span>
            </div>
            <input type="range" min={1} max={tenureYears * 12 - 1} step={1} value={prepayMonth}
              onChange={(e) => setPrepayMonth(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>Month 1</span><span>Month {tenureYears * 12 - 1}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Prepayment Amount</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{formatCurrency(prepayAmount)}</span>
            </div>
            <input type="range" min={10000} max={principal * 0.5} step={10000} value={prepayAmount}
              onChange={(e) => setPrepayAmount(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={prepayAmount} onChange={(e) => setPrepayAmount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Savings hero */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-emerald-200 dark:border-emerald-800/50">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-3">Interest You Save</p>
          <p className="text-4xl font-black text-emerald-700 text-emerald-400">{formatCurrency(result.interestSaved)}</p>
          <p className="text-sm text-emerald-400 mt-2">
            Loan closes {yearsSaved > 0 ? `${yearsSaved} yr${yearsSaved > 1 ? "s" : ""}` : ""}{remainingMonths > 0 ? ` ${remainingMonths} mo` : ""} earlier
          </p>
        </div>

        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">Before vs After Prepayment</h2>
          <div className="space-y-4">
            {[
              { label: "Monthly EMI", before: formatCurrency(result.emi), after: formatCurrency(result.emi) },
              { label: "Loan Tenure", before: `${tenureYears} Years`, after: `${Math.floor(result.newTenureMonths / 12)} Yr ${result.newTenureMonths % 12} Mo` },
              { label: "Total Interest", before: formatCurrency(result.totalInterestWithout), after: formatCurrency(result.totalInterestWith) },
            ].map((r) => (
              <div key={r.label} className="py-3 border-b border-[#1e2d4a] last:border-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{r.label}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#162038] rounded-xl">
                    <p className="text-xs text-slate-400 mb-1">Without Prepayment</p>
                    <p className="font-bold text-white text-sm">{r.before}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                    <p className="text-xs text-emerald-500 mb-1">With Prepayment</p>
                    <p className="font-bold text-emerald-700 text-emerald-400 text-sm">{r.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800/40">
          <h3 className="font-bold text-blue-900 text-blue-400 text-sm mb-2">When to Prepay?</h3>
          <p className="text-xs text-blue-800 text-blue-400 leading-relaxed">
            Prepaying early in the loan tenure saves the most interest since interest is front-loaded. A prepayment in year 2–5 of a 20-year loan saves significantly more than the same amount paid in year 15. Check if your loan has prepayment penalties (most floating rate home loans are penalty-free after 2019 RBI guidelines).
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoanPrepaymentPage() {
  return (
    <CalculatorLayout
      title="Loan Prepayment Calculator"
      description="Calculate interest savings and tenure reduction when you make a lump sum prepayment on your home loan or personal loan. Find the optimal time to prepay."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator" },
      ]}
      faqs={[
        {
          q: "Does prepaying a home loan save tax?",
          a: "Yes indirectly — less interest means less 80EEA deduction potential, but the absolute amount saved far outweighs the lost deduction. For example, saving ₹5L in interest to lose ₹1.5L in deduction (saving ₹45K in tax at 30% slab) still nets you ₹4.55L in savings.",
        },
        {
          q: "Are there prepayment penalties on home loans?",
          a: "As per RBI 2019 guidelines, floating rate home loans from banks and NBFCs cannot charge prepayment penalties. Fixed rate loans may have a 2–3% penalty. Always check your loan agreement before prepaying.",
        },
      ]}
    >
      <LoanPrepaymentCalculator />
    </CalculatorLayout>
  );
}
