"use client";

import { useState } from "react";
import { ExternalLink, Search, TrendingUp, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Fund {
  name: string;
  amc: string;
  category: string;
  subCategory: string;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  minSIP: number;
  growwSlug: string;
  zerodhaQuery: string;
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

const RISK_CONFIG: Record<string, { pill: string; dot: string }> = {
  "Low":       { pill: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60", dot: "bg-emerald-500" },
  "Moderate":  { pill: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60", dot: "bg-blue-500" },
  "High":      { pill: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60", dot: "bg-amber-500" },
  "Very High": { pill: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60", dot: "bg-rose-500" },
};

function FundCard({ fund }: { fund: Fund }) {
  const risk = RISK_CONFIG[fund.riskLevel];
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-slate-900/50 transition-all duration-200">
      {/* Top row: name + risk */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-0.5">{fund.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{fund.amc} · {fund.category}</p>
        </div>
        <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${risk.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
          {fund.riskLevel}
        </span>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-slate-100 dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">AUM</p>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{fund.aum ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Exp. Ratio</p>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{fund.expenseRatio ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Min SIP</p>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">₹{fund.minSIP}/mo</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`https://groww.in/mutual-funds/${fund.growwSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
          style={{ background: "rgba(0,208,156,0.08)", color: "#00a07a", border: "1px solid rgba(0,208,156,0.2)" }}
        >
          Groww
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href={`https://coin.zerodha.com/search?q=${fund.zerodhaQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
          style={{ background: "rgba(56,126,209,0.08)", color: "#387ed1", border: "1px solid rgba(56,126,209,0.2)" }}
        >
          Zerodha
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

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
      || (catMap[activeCategory]?.includes(f.category));
    const q = searchQuery.toLowerCase();
    const matchSearch = f.name.toLowerCase().includes(q) || f.amc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            Direct Plans · Zero Commission
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Top Mutual Funds<br className="hidden sm:block" /> in India
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
            30+ curated funds across equity, hybrid, and debt. Invest directly via Groww or Zerodha with zero commission.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 sm:mb-12">
          {[
            { icon: TrendingUp, label: "Equity Funds", value: "20+", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30" },
            { icon: Shield, label: "Debt & Hybrid", value: "10+", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
            { icon: TrendingUp, label: "Fund Categories", value: "8", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30" },
            { icon: Shield, label: "Commission", value: "Zero", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-slate-200/60 dark:border-slate-800`}>
              <p className={`text-2xl font-black ${s.color} mb-0.5`}>{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by fund name or AMC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-96 pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
            />
          </div>

          {/* Category pills — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-slate-400 mb-5 font-medium">
          {filtered.length} fund{filtered.length !== 1 ? "s" : ""} {activeCategory !== "All" ? `in ${activeCategory}` : ""}
          {searchQuery ? ` matching "${searchQuery}"` : ""}
        </p>

        {/* Card grid — mobile & tablet */}
        <div className="lg:hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No funds match your search.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((fund) => (
                <FundCard key={fund.name} fund={fund} />
              ))}
            </div>
          )}
        </div>

        {/* Table — desktop only */}
        <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-[35%]">Fund</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">AUM</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Exp. Ratio</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Min SIP</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invest</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-slate-400">
                    No funds match your search.
                  </td>
                </tr>
              ) : filtered.map((fund) => {
                const risk = RISK_CONFIG[fund.riskLevel];
                return (
                  <tr key={fund.name} className="border-b border-slate-50 dark:border-slate-800/70 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">{fund.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{fund.amc} · Direct Growth</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                        {fund.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600 dark:text-slate-400 font-medium">{fund.aum ?? "—"}</td>
                    <td className="px-4 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">{fund.expenseRatio ?? "—"}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${risk.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                        {fund.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-slate-600 dark:text-slate-400">₹{fund.minSIP}/mo</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://groww.in/mutual-funds/${fund.growwSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5"
                          style={{ background: "rgba(0,208,156,0.08)", color: "#00a07a", border: "1px solid rgba(0,208,156,0.2)" }}
                        >
                          Groww <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={`https://coin.zerodha.com/search?q=${fund.zerodhaQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5"
                          style={{ background: "rgba(56,126,209,0.08)", color: "#387ed1", border: "1px solid rgba(56,126,209,0.2)" }}
                        >
                          Zerodha <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SIP CTA */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">Calculate SIP Returns</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Project how a monthly SIP could grow over time.</p>
            </div>
            <Link
              href="/calculators/sip-calculator"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all hover:-translate-y-0.5"
            >
              SIP Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">New vs Old Tax Regime</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">ELSS funds help you save tax under Section 80C.</p>
            </div>
            <Link
              href="/calculators/new-vs-old-regime-calculator"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-all hover:-translate-y-0.5"
            >
              Tax Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-3xl">
          Mutual fund investments are subject to market risks. Past performance is not indicative of future returns. Calculate Future is not a SEBI-registered investment adviser. Read all scheme documents carefully before investing.
        </p>
      </div>
    </section>
  );
}
