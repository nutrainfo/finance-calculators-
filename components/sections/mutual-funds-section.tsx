"use client";

import { useState } from "react";
import { ExternalLink, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Fund {
  name: string;
  amc: string;
  category: string;
  subCategory: string;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  minSIP: number;
  aum?: string;
  expenseRatio?: string;
}

const FUNDS: Fund[] = [
  // Large Cap
  { name: "Mirae Asset Large Cap Fund", amc: "Mirae Asset", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 1000, aum: "₹36,000 Cr+", expenseRatio: "0.53%" },
  { name: "HDFC Top 100 Fund", amc: "HDFC", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹28,000 Cr+", expenseRatio: "0.97%" },
  { name: "ICICI Pru Bluechip Fund", amc: "ICICI Prudential", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹52,000 Cr+", expenseRatio: "0.87%" },
  { name: "SBI Bluechip Fund", amc: "SBI", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, aum: "₹44,000 Cr+", expenseRatio: "0.77%" },
  { name: "Kotak Bluechip Fund", amc: "Kotak", category: "Large Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹8,000 Cr+", expenseRatio: "0.67%" },
  // Flexi Cap
  { name: "Parag Parikh Flexi Cap Fund", amc: "PPFAS", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 1000, aum: "₹70,000 Cr+", expenseRatio: "0.57%" },
  { name: "HDFC Flexi Cap Fund", amc: "HDFC", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹50,000 Cr+", expenseRatio: "0.75%" },
  { name: "Kotak Flexi Cap Fund", amc: "Kotak", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹44,000 Cr+", expenseRatio: "0.57%" },
  { name: "UTI Flexi Cap Fund", amc: "UTI", category: "Flexi Cap", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, aum: "₹23,000 Cr+", expenseRatio: "0.89%" },
  // Mid Cap
  { name: "Axis Midcap Fund", amc: "Axis", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹28,000 Cr+", expenseRatio: "0.51%" },
  { name: "Kotak Emerging Equity Fund", amc: "Kotak", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, aum: "₹37,000 Cr+", expenseRatio: "0.38%" },
  { name: "HDFC Mid-Cap Opportunities", amc: "HDFC", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, aum: "₹64,000 Cr+", expenseRatio: "0.82%" },
  { name: "Nippon India Growth Fund", amc: "Nippon India", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, aum: "₹25,000 Cr+", expenseRatio: "0.82%" },
  { name: "SBI Magnum Midcap Fund", amc: "SBI", category: "Mid Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹16,000 Cr+", expenseRatio: "0.87%" },
  // Small Cap
  { name: "Nippon India Small Cap Fund", amc: "Nippon India", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, aum: "₹60,000 Cr+", expenseRatio: "0.73%" },
  { name: "SBI Small Cap Fund", amc: "SBI", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹28,000 Cr+", expenseRatio: "0.60%" },
  { name: "Axis Small Cap Fund", amc: "Axis", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹19,000 Cr+", expenseRatio: "0.57%" },
  { name: "Quant Small Cap Fund", amc: "Quant", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 1000, aum: "₹23,000 Cr+", expenseRatio: "0.62%" },
  { name: "HDFC Small Cap Fund", amc: "HDFC", category: "Small Cap", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 100, aum: "₹31,000 Cr+", expenseRatio: "0.64%" },
  // ELSS
  { name: "Mirae Asset Tax Saver Fund", amc: "Mirae Asset", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹24,000 Cr+", expenseRatio: "0.29%" },
  { name: "Axis Long Term Equity Fund", amc: "Axis", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹34,000 Cr+", expenseRatio: "0.49%" },
  { name: "Quant Tax Plan Fund", amc: "Quant", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹9,000 Cr+", expenseRatio: "0.50%" },
  { name: "SBI Long Term Equity Fund", amc: "SBI", category: "ELSS", subCategory: "Direct Growth", riskLevel: "Very High", minSIP: 500, aum: "₹23,000 Cr+", expenseRatio: "0.83%" },
  // Hybrid
  { name: "ICICI Pru Equity & Debt Fund", amc: "ICICI Prudential", category: "Aggressive Hybrid", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹36,000 Cr+", expenseRatio: "1.06%" },
  { name: "HDFC Balanced Advantage Fund", amc: "HDFC", category: "Balanced Advantage", subCategory: "Direct Growth", riskLevel: "Moderate", minSIP: 100, aum: "₹90,000 Cr+", expenseRatio: "0.74%" },
  { name: "SBI Equity Hybrid Fund", amc: "SBI", category: "Aggressive Hybrid", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, aum: "₹64,000 Cr+", expenseRatio: "0.87%" },
  // Index
  { name: "UTI Nifty 50 Index Fund", amc: "UTI", category: "Index Fund", subCategory: "Direct Growth", riskLevel: "High", minSIP: 500, aum: "₹17,000 Cr+", expenseRatio: "0.20%" },
  { name: "HDFC Index Fund Nifty 50", amc: "HDFC", category: "Index Fund", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹14,000 Cr+", expenseRatio: "0.20%" },
  { name: "Nippon India Index Nifty 50", amc: "Nippon India", category: "Index Fund", subCategory: "Direct Growth", riskLevel: "High", minSIP: 100, aum: "₹8,000 Cr+", expenseRatio: "0.20%" },
  // Debt
  { name: "HDFC Short Term Debt Fund", amc: "HDFC", category: "Short Duration", subCategory: "Direct Growth", riskLevel: "Low", minSIP: 100, aum: "₹14,000 Cr+", expenseRatio: "0.24%" },
  { name: "SBI Magnum Ultra Short Duration", amc: "SBI", category: "Ultra Short Duration", subCategory: "Direct Growth", riskLevel: "Low", minSIP: 500, aum: "₹12,000 Cr+", expenseRatio: "0.29%" },
];

const CATEGORIES = ["All", "Large Cap", "Flexi Cap", "Mid Cap", "Small Cap", "ELSS", "Hybrid", "Index Fund", "Debt"];

const RISK_CONFIG: Record<string, { pill: string; dot: string }> = {
  "Low":       { pill: "bg-emerald-600/15 text-emerald-400 border border-emerald-600/30", dot: "bg-emerald-500" },
  "Moderate":  { pill: "bg-blue-600/15 text-blue-400 border border-blue-600/30", dot: "bg-blue-500" },
  "High":      { pill: "bg-amber-600/15 text-amber-400 border border-amber-600/30", dot: "bg-amber-500" },
  "Very High": { pill: "bg-rose-600/15 text-rose-400 border border-rose-600/30", dot: "bg-rose-500" },
};

function FundCard({ fund }: { fund: Fund }) {
  const risk = RISK_CONFIG[fund.riskLevel];
  return (
    <div className="bg-[#0d1526] rounded-xl border border-[#1e2d4a] p-4 hover:border-[#2d4466] hover:shadow-lg hover:shadow-black/30 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="font-bold text-white text-sm leading-snug mb-0.5">{fund.name}</p>
          <p className="text-xs text-slate-500">{fund.amc} · {fund.category}</p>
        </div>
        <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold ${risk.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
          {fund.riskLevel}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3 py-2.5 border-y border-[#1e2d4a]">
        <div>
          <p className="text-xs text-slate-500 mb-0.5">AUM</p>
          <p className="text-xs font-semibold text-slate-300">{fund.aum ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-0.5">Exp. Ratio</p>
          <p className="text-xs font-semibold text-slate-300">{fund.expenseRatio ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-0.5">Min SIP</p>
          <p className="text-xs font-semibold text-slate-300">₹{fund.minSIP}/mo</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a
          href={`https://groww.in/search?q=${encodeURIComponent(fund.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25 hover:bg-[#10b981]/20 transition-all"
        >
          Groww
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href={`https://coin.zerodha.com/search?q=${encodeURIComponent(fund.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-blue-600/10 text-blue-400 border border-blue-600/25 hover:bg-blue-600/20 transition-all"
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
    <section className="min-h-screen bg-[#060c18] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">
            Direct Plans · Zero Commission
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
            Top Mutual Funds in India
          </h1>
          <p className="text-slate-500 max-w-xl">
            30+ curated funds across equity, hybrid, and debt. Invest directly via Groww or Zerodha with zero commission.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Equity Funds", value: "20+", color: "text-blue-400" },
            { label: "Debt & Hybrid", value: "10+", color: "text-[#10b981]" },
            { label: "Fund Categories", value: "8", color: "text-violet-400" },
            { label: "Commission", value: "Zero", color: "text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0d1526] rounded-xl p-4 border border-[#1e2d4a]">
              <p className={`text-2xl font-black ${s.color} mb-0.5`}>{s.value}</p>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by fund name or AMC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-96 pl-10 pr-4 py-2.5 rounded-xl border border-[#1e2d4a] bg-[#0d1526] text-white text-sm focus:outline-none focus:border-amber-500/50 placeholder-slate-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-amber-500 text-black"
                    : "bg-[#0d1526] border border-[#1e2d4a] text-slate-400 hover:text-white hover:border-[#2d4466]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-slate-500 mb-4 font-medium">
          {filtered.length} fund{filtered.length !== 1 ? "s" : ""} {activeCategory !== "All" ? `in ${activeCategory}` : ""}
          {searchQuery ? ` matching "${searchQuery}"` : ""}
        </p>

        {/* Card grid — mobile & tablet */}
        <div className="lg:hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No funds match your search.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((fund) => (
                <FundCard key={fund.name} fund={fund} />
              ))}
            </div>
          )}
        </div>

        {/* Table — desktop only */}
        <div className="hidden lg:block bg-[#0d1526] rounded-2xl border border-[#1e2d4a] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2d4a] bg-[#162038]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider w-[35%]">Fund</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">AUM</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Exp. Ratio</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Min SIP</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invest</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center text-slate-500">
                    No funds match your search.
                  </td>
                </tr>
              ) : filtered.map((fund) => {
                const risk = RISK_CONFIG[fund.riskLevel];
                return (
                  <tr key={fund.name} className="border-b border-[#1e2d4a] hover:bg-[#162038] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-white text-sm leading-tight">{fund.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{fund.amc} · Direct Growth</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-medium text-slate-400 bg-[#162038] px-2.5 py-1 rounded-md">
                        {fund.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-300 font-medium">{fund.aum ?? "—"}</td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-slate-300">{fund.expenseRatio ?? "—"}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${risk.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                        {fund.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-medium text-slate-300">₹{fund.minSIP}/mo</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://groww.in/search?q=${encodeURIComponent(fund.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25 hover:bg-[#10b981]/20 transition-all"
                        >
                          Groww <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={`https://coin.zerodha.com/search?q=${encodeURIComponent(fund.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600/10 text-blue-400 border border-blue-600/25 hover:bg-blue-600/20 transition-all"
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
        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#0d1526] rounded-xl border border-[#1e2d4a]">
            <div>
              <p className="font-bold text-white text-sm mb-1">Calculate SIP Returns</p>
              <p className="text-xs text-slate-500">Project how a monthly SIP could grow over time.</p>
            </div>
            <Link
              href="/calculators/sip-calculator"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-all"
            >
              SIP Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#0d1526] rounded-xl border border-[#1e2d4a]">
            <div>
              <p className="font-bold text-white text-sm mb-1">New vs Old Tax Regime</p>
              <p className="text-xs text-slate-500">ELSS funds help you save tax under Section 80C.</p>
            </div>
            <Link
              href="/calculators/new-vs-old-regime-calculator"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#162038] hover:bg-[#1e2d4a] text-white text-xs font-bold rounded-lg border border-[#1e2d4a] transition-all"
            >
              Tax Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-slate-600 leading-relaxed max-w-3xl">
          Mutual fund investments are subject to market risks. Past performance is not indicative of future returns. Calculate Future is not a SEBI-registered investment adviser. Read all scheme documents carefully before investing.
        </p>
      </div>
    </section>
  );
}
