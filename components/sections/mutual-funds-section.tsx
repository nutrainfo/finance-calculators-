"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface Fund {
  name: string;
  amc: string;
  category: string;
  subCategory: string;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  minSIP: number;
  growwSlug: string;
  zerodhaQuery: string;
  nav?: number;
  aum?: string;
  expenseRatio?: string;
}

const FUNDS: Fund[] = [
  // Large Cap
  { name: "Mirae Asset Large Cap Fund", amc: "Mirae Asset", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 1000, growwSlug: "mirae-asset-large-cap-fund-direct-plan-growth", zerodhaQuery: "Mirae+Asset+Large+Cap", aum: "₹36,000 Cr+", expenseRatio: "0.53%" },
  { name: "HDFC Top 100 Fund", amc: "HDFC", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "hdfc-top-100-fund-direct-plan-growth", zerodhaQuery: "HDFC+Top+100", aum: "₹28,000 Cr+", expenseRatio: "0.97%" },
  { name: "ICICI Pru Bluechip Fund", amc: "ICICI Prudential", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "icici-prudential-bluechip-fund-direct-plan-growth", zerodhaQuery: "ICICI+Pru+Bluechip", aum: "₹52,000 Cr+", expenseRatio: "0.87%" },
  { name: "SBI Bluechip Fund", amc: "SBI", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, growwSlug: "sbi-bluechip-fund-direct-plan-growth", zerodhaQuery: "SBI+Bluechip", aum: "₹44,000 Cr+", expenseRatio: "0.77%" },
  { name: "Kotak Bluechip Fund", amc: "Kotak", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "kotak-bluechip-fund-direct-plan-growth", zerodhaQuery: "Kotak+Bluechip", aum: "₹8,000 Cr+", expenseRatio: "0.67%" },
  // Flexi Cap
  { name: "Parag Parikh Flexi Cap Fund", amc: "PPFAS", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 1000, growwSlug: "parag-parikh-flexi-cap-fund-direct-plan-growth", zerodhaQuery: "Parag+Parikh+Flexi+Cap", aum: "₹70,000 Cr+", expenseRatio: "0.57%" },
  { name: "HDFC Flexi Cap Fund", amc: "HDFC", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "hdfc-flexi-cap-fund-direct-plan-growth", zerodhaQuery: "HDFC+Flexi+Cap", aum: "₹50,000 Cr+", expenseRatio: "0.75%" },
  { name: "Kotak Flexi Cap Fund", amc: "Kotak", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "kotak-flexi-cap-fund-direct-growth", zerodhaQuery: "Kotak+Flexi+Cap", aum: "₹44,000 Cr+", expenseRatio: "0.57%" },
  { name: "UTI Flexi Cap Fund", amc: "UTI", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, growwSlug: "uti-flexi-cap-fund-direct-growth", zerodhaQuery: "UTI+Flexi+Cap", aum: "₹23,000 Cr+", expenseRatio: "0.89%" },
  // Mid Cap
  { name: "Axis Midcap Fund", amc: "Axis", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "axis-midcap-fund-direct-plan-growth", zerodhaQuery: "Axis+Midcap", aum: "₹28,000 Cr+", expenseRatio: "0.51%" },
  { name: "Kotak Emerging Equity Fund", amc: "Kotak", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, growwSlug: "kotak-emerging-equity-scheme-direct-plan-growth", zerodhaQuery: "Kotak+Emerging+Equity", aum: "₹37,000 Cr+", expenseRatio: "0.38%" },
  { name: "HDFC Mid-Cap Opportunities", amc: "HDFC", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, growwSlug: "hdfc-mid-cap-opportunities-fund-direct-plan-growth", zerodhaQuery: "HDFC+Midcap+Opportunities", aum: "₹64,000 Cr+", expenseRatio: "0.82%" },
  { name: "Nippon India Growth Fund", amc: "Nippon India", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, growwSlug: "nippon-india-growth-fund-direct-plan-growth", zerodhaQuery: "Nippon+Growth", aum: "₹25,000 Cr+", expenseRatio: "0.82%" },
  { name: "SBI Magnum Midcap Fund", amc: "SBI", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "sbi-magnum-midcap-fund-direct-plan-growth", zerodhaQuery: "SBI+Magnum+Midcap", aum: "₹16,000 Cr+", expenseRatio: "0.87%" },
  // Small Cap
  { name: "Nippon India Small Cap Fund", amc: "Nippon India", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, growwSlug: "nippon-india-small-cap-fund-direct-plan-growth", zerodhaQuery: "Nippon+Small+Cap", aum: "₹60,000 Cr+", expenseRatio: "0.73%" },
  { name: "SBI Small Cap Fund", amc: "SBI", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "sbi-small-cap-fund-direct-plan-growth", zerodhaQuery: "SBI+Small+Cap", aum: "₹28,000 Cr+", expenseRatio: "0.60%" },
  { name: "Axis Small Cap Fund", amc: "Axis", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "axis-small-cap-fund-direct-plan-growth", zerodhaQuery: "Axis+Small+Cap", aum: "₹19,000 Cr+", expenseRatio: "0.57%" },
  { name: "Quant Small Cap Fund", amc: "Quant", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 1000, growwSlug: "quant-small-cap-fund-direct-plan-growth", zerodhaQuery: "Quant+Small+Cap", aum: "₹23,000 Cr+", expenseRatio: "0.62%" },
  { name: "HDFC Small Cap Fund", amc: "HDFC", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, growwSlug: "hdfc-small-cap-fund-direct-plan-growth", zerodhaQuery: "HDFC+Small+Cap", aum: "₹31,000 Cr+", expenseRatio: "0.64%" },
  // ELSS
  { name: "Mirae Asset Tax Saver Fund", amc: "Mirae Asset", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "mirae-asset-tax-saver-fund-direct-plan-growth", zerodhaQuery: "Mirae+Tax+Saver", aum: "₹24,000 Cr+", expenseRatio: "0.29%" },
  { name: "Axis Long Term Equity Fund", amc: "Axis", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "axis-long-term-equity-fund-direct-plan-growth", zerodhaQuery: "Axis+Long+Term+Equity", aum: "₹34,000 Cr+", expenseRatio: "0.49%" },
  { name: "Quant Tax Plan Fund", amc: "Quant", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "quant-tax-plan-direct-plan-growth", zerodhaQuery: "Quant+Tax+Plan", aum: "₹9,000 Cr+", expenseRatio: "0.50%" },
  { name: "SBI Long Term Equity Fund", amc: "SBI", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, growwSlug: "sbi-long-term-equity-fund-direct-plan-growth", zerodhaQuery: "SBI+Long+Term+Equity", aum: "₹23,000 Cr+", expenseRatio: "0.83%" },
  // Hybrid
  { name: "ICICI Pru Equity & Debt Fund", amc: "ICICI Prudential", category: "Aggressive Hybrid", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "icici-prudential-equity-and-debt-fund-direct-plan-growth", zerodhaQuery: "ICICI+Equity+Debt", aum: "₹36,000 Cr+", expenseRatio: "1.06%" },
  { name: "HDFC Balanced Advantage Fund", amc: "HDFC", category: "Balanced Advantage", subCategory: "Direct Growth", riskLevel: "Moderate", minSIP: 100, growwSlug: "hdfc-balanced-advantage-fund-direct-plan-growth", zerodhaQuery: "HDFC+Balanced+Advantage", aum: "₹90,000 Cr+", expenseRatio: "0.74%" },
  { name: "SBI Equity Hybrid Fund", amc: "SBI", category: "Aggressive Hybrid", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, growwSlug: "sbi-equity-hybrid-fund-direct-plan-growth", zerodhaQuery: "SBI+Equity+Hybrid", aum: "₹64,000 Cr+", expenseRatio: "0.87%" },
  // Index
  { name: "UTI Nifty 50 Index Fund", amc: "UTI", category: "Index Fund", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, growwSlug: "uti-nifty-50-index-fund-direct-plan-growth", zerodhaQuery: "UTI+Nifty+50+Index", aum: "₹17,000 Cr+", expenseRatio: "0.20%" },
  { name: "HDFC Index Fund Nifty 50", amc: "HDFC", category: "Index Fund", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "hdfc-index-fund-nifty-50-plan-direct-plan-growth", zerodhaQuery: "HDFC+Index+Nifty+50", aum: "₹14,000 Cr+", expenseRatio: "0.20%" },
  { name: "Nippon India Index Nifty 50", amc: "Nippon India", category: "Index Fund", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, growwSlug: "nippon-india-index-fund-nifty-50-plan-direct-plan-growth", zerodhaQuery: "Nippon+Index+Nifty+50", aum: "₹8,000 Cr+", expenseRatio: "0.20%" },
  // Debt
  { name: "HDFC Short Term Debt Fund", amc: "HDFC", category: "Short Duration", subCategory: "Direct Growth", riskLevel: "Low", minSIP: 100, growwSlug: "hdfc-short-term-debt-fund-direct-plan-growth", zerodhaQuery: "HDFC+Short+Term+Debt", aum: "₹14,000 Cr+", expenseRatio: "0.24%" },
  { name: "SBI Magnum Ultra Short Duration", amc: "SBI", category: "Ultra Short Duration", subCategory: "Direct Growth", riskLevel: "Low", minSIP: 500, growwSlug: "sbi-magnum-ultra-short-duration-fund-direct-plan-growth", zerodhaQuery: "SBI+Ultra+Short+Duration", aum: "₹12,000 Cr+", expenseRatio: "0.29%" },
];

const CATEGORIES = ["All", "Large Cap", "Flexi Cap", "Mid Cap", "Small Cap", "ELSS", "Hybrid", "Index Fund", "Debt"];

const RISK_COLORS: Record<string, string> = {
  "Low": "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
  "Moderate": "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400",
  "High": "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
  "Very High": "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400",
};

export default function MutualFundsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = FUNDS.filter((f) => {
    const catMap: Record<string, string[]> = {
      "Hybrid": ["Aggressive Hybrid", "Balanced Advantage"],
      "Debt": ["Short Duration", "Ultra Short Duration"],
    };
    const matchCat = activeCategory === "All"
      || f.category === activeCategory
      || (catMap[activeCategory] && catMap[activeCategory].includes(f.category));
    const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.amc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="py-28 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            Direct Plans · Zero Commission
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-5 leading-tight tracking-tight">
            Top Mutual Funds in India
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            30+ curated funds across equity, hybrid, and debt categories. Invest directly via Groww or Zerodha Coin with zero commission.
          </p>
          <p className="mt-4 text-xs text-slate-400 leading-relaxed">
            Mutual fund investments are subject to market risks. Past performance is not indicative of future returns. Calculate Future is not a SEBI-registered investment adviser. Read all scheme documents carefully before investing.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by fund name or AMC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:w-80 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fund table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Fund Name</th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">AUM</th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Exp. Ratio</th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
                  <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Min SIP</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invest</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((fund, i) => (
                  <tr
                    key={fund.name}
                    className={`border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${i === 0 ? "" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">{fund.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{fund.amc} · {fund.subCategory}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{fund.category}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs text-slate-600 dark:text-slate-400">{fund.aum ?? "—"}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{fund.expenseRatio ?? "—"}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${RISK_COLORS[fund.riskLevel]}`}>
                        {fund.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs text-slate-600 dark:text-slate-400">₹{fund.minSIP}/mo</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://groww.in/mutual-funds/${fund.growwSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#00d09c]/10 hover:bg-[#00d09c]/20 text-[#00a07a] dark:text-[#00d09c] text-xs font-semibold rounded-lg border border-[#00d09c]/20 transition-colors"
                        >
                          Groww
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={`https://coin.zerodha.com/search?q=${fund.zerodhaQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#387ed1]/10 hover:bg-[#387ed1]/20 text-[#387ed1] text-xs font-semibold rounded-lg border border-[#387ed1]/20 transition-colors"
                        >
                          Zerodha
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-slate-400 text-sm">
                      No funds match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIP calculator CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div>
            <p className="font-bold text-slate-900 dark:text-white mb-1">Calculate SIP returns before investing</p>
            <p className="text-sm text-slate-500">Project how a monthly SIP in any fund could grow over time.</p>
          </div>
          <Link
            href="/calculators/sip-calculator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5"
          >
            Open SIP Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
