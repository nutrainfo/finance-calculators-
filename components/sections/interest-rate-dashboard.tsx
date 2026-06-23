"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ExternalLink, TrendingUp } from "lucide-react";

interface BankRate {
  bank: string;
  shortName: string;
  type: "public" | "private" | "sfb";
  fdRates: { tenure: string; rate: number }[];
  rdRate: number;
  savingsRate: number;
  lastUpdated: string;
  source: string;
}

const STATIC_RATES: BankRate[] = [
  { bank: "State Bank of India", shortName: "SBI", type: "public", fdRates: [{ tenure: "1 Year", rate: 6.80 }, { tenure: "2 Years", rate: 7.00 }, { tenure: "3 Years", rate: 6.75 }, { tenure: "5 Years", rate: 6.50 }], rdRate: 6.50, savingsRate: 2.70, lastUpdated: "Jun 2025", source: "https://www.sbi.co.in" },
  { bank: "Bank of Baroda", shortName: "BOB", type: "public", fdRates: [{ tenure: "1 Year", rate: 6.85 }, { tenure: "2 Years", rate: 7.00 }, { tenure: "3 Years", rate: 7.15 }, { tenure: "5 Years", rate: 6.50 }], rdRate: 6.50, savingsRate: 2.75, lastUpdated: "Jun 2025", source: "https://www.bankofbaroda.in" },
  { bank: "Punjab National Bank", shortName: "PNB", type: "public", fdRates: [{ tenure: "1 Year", rate: 6.80 }, { tenure: "2 Years", rate: 6.80 }, { tenure: "3 Years", rate: 7.00 }, { tenure: "5 Years", rate: 6.50 }], rdRate: 6.50, savingsRate: 2.70, lastUpdated: "Jun 2025", source: "https://www.pnbindia.in" },
  { bank: "Canara Bank", shortName: "Canara", type: "public", fdRates: [{ tenure: "1 Year", rate: 6.85 }, { tenure: "2 Years", rate: 6.85 }, { tenure: "3 Years", rate: 6.85 }, { tenure: "5 Years", rate: 6.70 }], rdRate: 6.70, savingsRate: 2.90, lastUpdated: "Jun 2025", source: "https://canarabank.com" },
  { bank: "Union Bank of India", shortName: "Union", type: "public", fdRates: [{ tenure: "1 Year", rate: 6.80 }, { tenure: "2 Years", rate: 6.80 }, { tenure: "3 Years", rate: 6.80 }, { tenure: "5 Years", rate: 6.50 }], rdRate: 6.50, savingsRate: 2.75, lastUpdated: "Jun 2025", source: "https://www.unionbankofindia.co.in" },
  { bank: "HDFC Bank", shortName: "HDFC", type: "private", fdRates: [{ tenure: "1 Year", rate: 6.60 }, { tenure: "2 Years", rate: 7.00 }, { tenure: "3 Years", rate: 7.00 }, { tenure: "5 Years", rate: 7.00 }], rdRate: 6.50, savingsRate: 3.00, lastUpdated: "Jun 2025", source: "https://www.hdfcbank.com" },
  { bank: "ICICI Bank", shortName: "ICICI", type: "private", fdRates: [{ tenure: "1 Year", rate: 6.70 }, { tenure: "2 Years", rate: 7.00 }, { tenure: "3 Years", rate: 7.00 }, { tenure: "5 Years", rate: 7.00 }], rdRate: 6.60, savingsRate: 3.00, lastUpdated: "Jun 2025", source: "https://www.icicibank.com" },
  { bank: "Axis Bank", shortName: "Axis", type: "private", fdRates: [{ tenure: "1 Year", rate: 6.70 }, { tenure: "2 Years", rate: 7.10 }, { tenure: "3 Years", rate: 7.10 }, { tenure: "5 Years", rate: 7.00 }], rdRate: 6.70, savingsRate: 3.00, lastUpdated: "Jun 2025", source: "https://www.axisbank.com" },
  { bank: "Kotak Mahindra Bank", shortName: "Kotak", type: "private", fdRates: [{ tenure: "1 Year", rate: 7.10 }, { tenure: "2 Years", rate: 7.10 }, { tenure: "3 Years", rate: 7.00 }, { tenure: "5 Years", rate: 6.20 }], rdRate: 6.20, savingsRate: 3.50, lastUpdated: "Jun 2025", source: "https://www.kotak.com" },
  { bank: "IDFC FIRST Bank", shortName: "IDFC", type: "private", fdRates: [{ tenure: "1 Year", rate: 7.25 }, { tenure: "2 Years", rate: 7.25 }, { tenure: "3 Years", rate: 7.25 }, { tenure: "5 Years", rate: 7.00 }], rdRate: 7.00, savingsRate: 7.00, lastUpdated: "Jun 2025", source: "https://www.idfcfirstbank.com" },
  { bank: "IndusInd Bank", shortName: "IndusInd", type: "private", fdRates: [{ tenure: "1 Year", rate: 7.25 }, { tenure: "2 Years", rate: 7.25 }, { tenure: "3 Years", rate: 7.25 }, { tenure: "5 Years", rate: 7.25 }], rdRate: 7.00, savingsRate: 4.00, lastUpdated: "Jun 2025", source: "https://www.indusind.com" },
  { bank: "Federal Bank", shortName: "Federal", type: "private", fdRates: [{ tenure: "1 Year", rate: 6.80 }, { tenure: "2 Years", rate: 7.00 }, { tenure: "3 Years", rate: 7.00 }, { tenure: "5 Years", rate: 6.60 }], rdRate: 6.60, savingsRate: 3.05, lastUpdated: "Jun 2025", source: "https://www.federalbank.co.in" },
  { bank: "Bandhan Bank", shortName: "Bandhan", type: "private", fdRates: [{ tenure: "1 Year", rate: 7.85 }, { tenure: "2 Years", rate: 7.85 }, { tenure: "3 Years", rate: 7.85 }, { tenure: "5 Years", rate: 7.85 }], rdRate: 7.50, savingsRate: 6.00, lastUpdated: "Jun 2025", source: "https://www.bandhanbank.com" },
  { bank: "RBL Bank", shortName: "RBL", type: "private", fdRates: [{ tenure: "1 Year", rate: 7.50 }, { tenure: "2 Years", rate: 7.80 }, { tenure: "3 Years", rate: 7.80 }, { tenure: "5 Years", rate: 7.50 }], rdRate: 7.50, savingsRate: 4.75, lastUpdated: "Jun 2025", source: "https://www.rblbank.com" },
  { bank: "Yes Bank", shortName: "Yes", type: "private", fdRates: [{ tenure: "1 Year", rate: 7.25 }, { tenure: "2 Years", rate: 7.25 }, { tenure: "3 Years", rate: 7.25 }, { tenure: "5 Years", rate: 7.25 }], rdRate: 7.25, savingsRate: 4.00, lastUpdated: "Jun 2025", source: "https://www.yesbank.in" },
  { bank: "AU Small Finance Bank", shortName: "AU SFB", type: "sfb", fdRates: [{ tenure: "1 Year", rate: 7.25 }, { tenure: "2 Years", rate: 7.50 }, { tenure: "3 Years", rate: 7.50 }, { tenure: "5 Years", rate: 7.25 }], rdRate: 7.25, savingsRate: 7.00, lastUpdated: "Jun 2025", source: "https://www.aubank.in" },
  { bank: "Ujjivan Small Finance Bank", shortName: "Ujjivan", type: "sfb", fdRates: [{ tenure: "1 Year", rate: 8.00 }, { tenure: "2 Years", rate: 8.25 }, { tenure: "3 Years", rate: 8.25 }, { tenure: "5 Years", rate: 8.00 }], rdRate: 8.00, savingsRate: 7.50, lastUpdated: "Jun 2025", source: "https://www.ujjivansfb.in" },
  { bank: "Jana Small Finance Bank", shortName: "Jana SFB", type: "sfb", fdRates: [{ tenure: "1 Year", rate: 8.25 }, { tenure: "2 Years", rate: 8.25 }, { tenure: "3 Years", rate: 8.25 }, { tenure: "5 Years", rate: 8.00 }], rdRate: 8.00, savingsRate: 7.50, lastUpdated: "Jun 2025", source: "https://www.janabank.com" },
  { bank: "Suryoday Small Finance Bank", shortName: "Suryoday", type: "sfb", fdRates: [{ tenure: "1 Year", rate: 8.60 }, { tenure: "2 Years", rate: 8.60 }, { tenure: "3 Years", rate: 8.60 }, { tenure: "5 Years", rate: 8.25 }], rdRate: 8.25, savingsRate: 7.25, lastUpdated: "Jun 2025", source: "https://www.suryodaybank.com" },
  { bank: "ESAF Small Finance Bank", shortName: "ESAF", type: "sfb", fdRates: [{ tenure: "1 Year", rate: 8.25 }, { tenure: "2 Years", rate: 8.25 }, { tenure: "3 Years", rate: 8.25 }, { tenure: "5 Years", rate: 8.00 }], rdRate: 8.00, savingsRate: 7.00, lastUpdated: "Jun 2025", source: "https://www.esafbank.com" },
];

const TYPE_LABELS: Record<string, string> = { public: "Public", private: "Private", sfb: "SFB" };

export default function InterestRateDashboard() {
  const [rates, setRates] = useState<BankRate[]>(STATIC_RATES);
  const [loading, setLoading] = useState(false);
  const [selectedTenure, setSelectedTenure] = useState("1 Year");
  const [selectedType, setSelectedType] = useState<"all" | "public" | "private" | "sfb">("all");
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/interest-rates");
      if (res.ok) { const data = await res.json(); if (data.rates?.length) setRates(data.rates); setLastFetched(new Date()); }
    } catch { /* use static */ } finally { setLoading(false); }
  };

  useEffect(() => { fetchRates(); }, []);

  const tenures = ["1 Year", "2 Years", "3 Years", "5 Years"];

  const sorted = [...rates]
    .filter((b) => selectedType === "all" || b.type === selectedType)
    .sort((a, b) => {
      const aR = a.fdRates.find((r) => r.tenure === selectedTenure)?.rate || 0;
      const bR = b.fdRates.find((r) => r.tenure === selectedTenure)?.rate || 0;
      return bR - aR;
    });

  return (
    <section className="py-20" style={{ background: "#060c18" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">Updated Jun 2025</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">FD Rate Comparison</h2>
            <p className="text-slate-500 mt-1 text-sm">Compare across 20+ public, private & small finance banks</p>
          </div>
          <button onClick={fetchRates} disabled={loading}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1e2d4a] bg-[#0d1526] text-slate-400 text-sm hover:text-white hover:border-amber-500/30 transition-all">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(["all", "public", "private", "sfb"] as const).map((t) => (
            <button key={t} onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === t ? "bg-amber-500 text-black" : "bg-[#0d1526] border border-[#1e2d4a] text-slate-400 hover:text-white"
              }`}>
              {t === "all" ? "All Banks" : t === "public" ? "Public Sector" : t === "private" ? "Private Sector" : "Small Finance"}
            </button>
          ))}
          <div className="h-6 w-px bg-[#1e2d4a] self-center mx-1 hidden sm:block" />
          {tenures.map((t) => (
            <button key={t} onClick={() => setSelectedTenure(t)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTenure === t ? "bg-[#162038] border border-[#3b82f6]/40 text-blue-400" : "bg-[#0d1526] border border-[#1e2d4a] text-slate-400 hover:text-white"
              }`}>
              {t}
            </button>
          ))}
        </div>
        {lastFetched && <p className="text-[11px] text-slate-600 mb-4">Fetched: {lastFetched.toLocaleTimeString("en-IN")}</p>}

        {/* Table */}
        <div className="bg-[#0d1526] rounded-2xl border border-[#1e2d4a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e2d4a]">
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest w-8">#</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Bank</th>
                  <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Type</th>
                  <th className="text-center px-4 py-3 text-[10px] font-bold text-amber-600 uppercase tracking-widest">FD {selectedTenure}</th>
                  <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest hidden sm:table-cell">RD</th>
                  <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest hidden md:table-cell">Savings</th>
                  <th className="text-center px-4 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Source</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((bank, i) => {
                  const tenureRate = bank.fdRates.find((r) => r.tenure === selectedTenure);
                  const isTop = i === 0;
                  const isTop3 = i < 3;
                  return (
                    <tr key={bank.shortName}
                      className={`border-t border-[#1e2d4a]/50 transition-colors hover:bg-[#162038] ${isTop ? "bg-amber-500/4" : ""}`}
                    >
                      <td className="px-5 py-3.5">
                        <span className={`text-sm font-black ${isTop ? "text-amber-400" : isTop3 ? "text-slate-400" : "text-slate-700"}`}>
                          {isTop ? "★" : i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#162038] border border-[#1e2d4a] flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-black text-slate-400">{bank.shortName.slice(0, 3)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white leading-tight">{bank.bank}</p>
                            <p className="text-[10px] text-slate-600">{bank.lastUpdated}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          bank.type === "sfb" ? "bg-amber-500/10 text-amber-400" :
                          bank.type === "private" ? "bg-blue-600/10 text-blue-400" :
                          "bg-[#162038] text-slate-500"
                        }`}>
                          {TYPE_LABELS[bank.type]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-baseline justify-center gap-0.5">
                          <span className={`text-lg font-black ${isTop ? "text-amber-400" : "text-white"}`}>
                            {tenureRate?.rate.toFixed(2)}
                          </span>
                          <span className="text-xs text-slate-600">%</span>
                        </div>
                        {isTop && (
                          <span className="block text-[9px] font-bold text-amber-500 uppercase tracking-wider">Best Rate</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                        <span className="text-sm font-semibold text-slate-300">{bank.rdRate.toFixed(2)}%</span>
                      </td>
                      <td className="px-4 py-3.5 text-center hidden md:table-cell">
                        <span className="text-sm font-semibold text-slate-300">{bank.savingsRate.toFixed(2)}%</span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <a href={bank.source} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 transition-colors">
                          <TrendingUp className="w-3 h-3" />
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-slate-600 text-center max-w-3xl mx-auto">
          Senior citizens get 0.25%–0.75% extra p.a. SFBs insured up to ₹5L under DICGC. Always verify from official bank website before investing.
        </p>
      </div>
    </section>
  );
}
