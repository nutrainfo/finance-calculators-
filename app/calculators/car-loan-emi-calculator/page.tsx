"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/calculator-layout";
import { calculateEMI, formatCurrency } from "@/lib/calculators";
import { InvestmentPieChart } from "@/components/result-chart";

function CarLoanCalculator() {
  const [carPrice, setCarPrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [rate, setRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(5);

  const principal = Math.max(0, carPrice - downPayment);
  const result = calculateEMI(principal, rate, tenureYears * 12);
  const principalPct = Math.round((result.principal / result.totalAmount) * 100);
  const interestPct = 100 - principalPct;
  const downPaymentPct = Math.round((downPayment / carPrice) * 100);

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-8">Car Loan Details</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Car Price (On-Road)</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{formatCurrency(carPrice)}</span>
            </div>
            <input type="range" min={200000} max={10000000} step={50000} value={carPrice}
              onChange={(e) => { setCarPrice(Number(e.target.value)); setDownPayment(Math.round(Number(e.target.value) * 0.2)); }}
              className="w-full mb-3" />
            <input type="number" value={carPrice} onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Down Payment ({downPaymentPct}%)</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{formatCurrency(downPayment)}</span>
            </div>
            <input type="range" min={0} max={carPrice * 0.8} step={10000} value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full mb-3" />
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(Math.min(Number(e.target.value), carPrice))}
              className="w-full px-4 py-3 rounded-xl border border-[#1e2d4a] bg-[#162038] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{rate}%</span>
            </div>
            <input type="range" min={7} max={18} step={0.1} value={rate}
              onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>7%</span><span>18%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-300">Loan Tenure</label>
              <span className="text-sm font-bold text-blue-400 bg-[#162038] px-3 py-1 rounded-lg">{tenureYears} Years</span>
            </div>
            <input type="range" min={1} max={7} step={1} value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>1 Year</span><span>7 Years</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h3 className="text-base font-bold text-white mb-6">Loan vs Interest Split</h3>
          <InvestmentPieChart invested={result.principal} returns={result.totalInterest} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h2 className="text-lg font-bold text-white mb-6">Results</h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Car Price", value: formatCurrency(carPrice) },
              { label: "Down Payment", value: formatCurrency(downPayment) },
              { label: "Loan Amount", value: formatCurrency(principal) },
              { label: "Total Interest Payable", value: formatCurrency(result.totalInterest), accent: true },
              { label: "Total Cost of Car", value: formatCurrency(downPayment + result.totalAmount) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-3 border-b border-[#1e2d4a] last:border-0">
                <span className="text-sm text-slate-500">{r.label}</span>
                <span className={`text-sm font-bold ${r.accent ? "text-rose-600 dark:text-rose-400" : "text-white"}`}>{r.value}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-950/20 rounded-2xl border border-blue-900/50">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">Monthly EMI</p>
            <p className="text-4xl font-black text-blue-400">{formatCurrency(result.emi)}</p>
          </div>
        </div>

        <div className="bg-[#0d1526] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#1e2d4a]">
          <h3 className="text-base font-bold text-white mb-6">Cost Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Loan Principal</span>
                <span className="font-semibold text-white">({principalPct}%)</span>
              </div>
              <div className="h-2.5 bg-[#162038] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${principalPct}%`, background: "linear-gradient(90deg, #1d4ed8, #3b82f6)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Total Interest</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">({interestPct}%)</span>
              </div>
              <div className="h-2.5 bg-[#162038] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${interestPct}%`, background: "linear-gradient(90deg, #e11d48, #f43f5e)" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-amber-200 dark:border-amber-800/40">
          <h3 className="font-bold text-amber-900 text-amber-400 text-sm mb-2">Car Loan Tips</h3>
          <ul className="text-xs text-amber-800 text-amber-400 space-y-2 leading-relaxed">
            <li>Higher down payment (20%+) significantly reduces EMI and total interest</li>
            <li>New car loans have lower rates (8–9%) than used car loans (10–14%)</li>
            <li>Maintain CIBIL score above 750 to negotiate better rates</li>
            <li>Compare manufacturer financing vs bank loans — manufacturers often offer 0% schemes on select models</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CarLoanPage() {
  return (
    <CalculatorLayout
      title="Car Loan EMI Calculator"
      description="Calculate your car loan EMI with down payment, interest rate, and tenure. Compare the true total cost of ownership including all interest charges."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator" },
      ]}
      faqs={[
        {
          q: "What is the current car loan interest rate in India?",
          a: "Car loan rates range from 7.9% to 12% p.a. SBI offers from 8.85%, HDFC Bank from 8.75%, ICICI Bank from 9.10%, and Axis Bank from 9.25% for new cars. Used car loans are typically 1–3% higher.",
        },
        {
          q: "How much down payment should I pay for a car?",
          a: "A minimum of 20–25% down payment is recommended. Higher down payment reduces EMI burden, total interest, and lowers debt-to-income ratio. For a ₹10L car, paying ₹2–2.5L upfront is ideal.",
        },
      ]}
    >
      <CarLoanCalculator />
    </CalculatorLayout>
  );
}
