"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ExternalLink, Landmark } from "lucide-react";

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
  // Public Sector Banks
  {
    bank: "State Bank of India",
    shortName: "SBI",
    type: "public",
    fdRates: [
      { tenure: "1 Year", rate: 6.80 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 6.75 },
      { tenure: "5 Years", rate: 6.50 },
    ],
    rdRate: 6.50,
    savingsRate: 2.70,
    lastUpdated: "Jun 2025",
    source: "https://www.sbi.co.in",
  },
  {
    bank: "Bank of Baroda",
    shortName: "BOB",
    type: "public",
    fdRates: [
      { tenure: "1 Year", rate: 6.85 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.15 },
      { tenure: "5 Years", rate: 6.50 },
    ],
    rdRate: 6.50,
    savingsRate: 2.75,
    lastUpdated: "Jun 2025",
    source: "https://www.bankofbaroda.in",
  },
  {
    bank: "Punjab National Bank",
    shortName: "PNB",
    type: "public",
    fdRates: [
      { tenure: "1 Year", rate: 6.80 },
      { tenure: "2 Years", rate: 6.80 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 6.50 },
    ],
    rdRate: 6.50,
    savingsRate: 2.70,
    lastUpdated: "Jun 2025",
    source: "https://www.pnbindia.in",
  },
  {
    bank: "Canara Bank",
    shortName: "Canara",
    type: "public",
    fdRates: [
      { tenure: "1 Year", rate: 6.85 },
      { tenure: "2 Years", rate: 6.85 },
      { tenure: "3 Years", rate: 6.85 },
      { tenure: "5 Years", rate: 6.70 },
    ],
    rdRate: 6.70,
    savingsRate: 2.90,
    lastUpdated: "Jun 2025",
    source: "https://canarabank.com",
  },
  {
    bank: "Union Bank of India",
    shortName: "Union",
    type: "public",
    fdRates: [
      { tenure: "1 Year", rate: 6.80 },
      { tenure: "2 Years", rate: 6.80 },
      { tenure: "3 Years", rate: 6.80 },
      { tenure: "5 Years", rate: 6.50 },
    ],
    rdRate: 6.50,
    savingsRate: 2.75,
    lastUpdated: "Jun 2025",
    source: "https://www.unionbankofindia.co.in",
  },
  // Private Sector Banks
  {
    bank: "HDFC Bank",
    shortName: "HDFC",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 6.60 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 6.50,
    savingsRate: 3.00,
    lastUpdated: "Jun 2025",
    source: "https://www.hdfcbank.com",
  },
  {
    bank: "ICICI Bank",
    shortName: "ICICI",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 6.70 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 6.60,
    savingsRate: 3.00,
    lastUpdated: "Jun 2025",
    source: "https://www.icicibank.com",
  },
  {
    bank: "Axis Bank",
    shortName: "Axis",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 6.70 },
      { tenure: "2 Years", rate: 7.10 },
      { tenure: "3 Years", rate: 7.10 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 6.70,
    savingsRate: 3.00,
    lastUpdated: "Jun 2025",
    source: "https://www.axisbank.com",
  },
  {
    bank: "Kotak Mahindra Bank",
    shortName: "Kotak",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 7.10 },
      { tenure: "2 Years", rate: 7.10 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 6.20 },
    ],
    rdRate: 6.20,
    savingsRate: 3.50,
    lastUpdated: "Jun 2025",
    source: "https://www.kotak.com",
  },
  {
    bank: "IDFC FIRST Bank",
    shortName: "IDFC",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 7.25 },
      { tenure: "2 Years", rate: 7.25 },
      { tenure: "3 Years", rate: 7.25 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 7.00,
    savingsRate: 7.00,
    lastUpdated: "Jun 2025",
    source: "https://www.idfcfirstbank.com",
  },
  {
    bank: "IndusInd Bank",
    shortName: "IndusInd",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 7.25 },
      { tenure: "2 Years", rate: 7.25 },
      { tenure: "3 Years", rate: 7.25 },
      { tenure: "5 Years", rate: 7.25 },
    ],
    rdRate: 7.00,
    savingsRate: 4.00,
    lastUpdated: "Jun 2025",
    source: "https://www.indusind.com",
  },
  {
    bank: "Federal Bank",
    shortName: "Federal",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 6.80 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 6.60 },
    ],
    rdRate: 6.60,
    savingsRate: 3.05,
    lastUpdated: "Jun 2025",
    source: "https://www.federalbank.co.in",
  },
  {
    bank: "Bandhan Bank",
    shortName: "Bandhan",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 7.85 },
      { tenure: "2 Years", rate: 7.85 },
      { tenure: "3 Years", rate: 7.85 },
      { tenure: "5 Years", rate: 7.85 },
    ],
    rdRate: 7.50,
    savingsRate: 6.00,
    lastUpdated: "Jun 2025",
    source: "https://www.bandhanbank.com",
  },
  {
    bank: "RBL Bank",
    shortName: "RBL",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 7.50 },
      { tenure: "2 Years", rate: 7.80 },
      { tenure: "3 Years", rate: 7.80 },
      { tenure: "5 Years", rate: 7.50 },
    ],
    rdRate: 7.50,
    savingsRate: 4.75,
    lastUpdated: "Jun 2025",
    source: "https://www.rblbank.com",
  },
  {
    bank: "Yes Bank",
    shortName: "Yes",
    type: "private",
    fdRates: [
      { tenure: "1 Year", rate: 7.25 },
      { tenure: "2 Years", rate: 7.25 },
      { tenure: "3 Years", rate: 7.25 },
      { tenure: "5 Years", rate: 7.25 },
    ],
    rdRate: 7.25,
    savingsRate: 4.00,
    lastUpdated: "Jun 2025",
    source: "https://www.yesbank.in",
  },
  // Small Finance Banks
  {
    bank: "AU Small Finance Bank",
    shortName: "AU SFB",
    type: "sfb",
    fdRates: [
      { tenure: "1 Year", rate: 7.25 },
      { tenure: "2 Years", rate: 7.50 },
      { tenure: "3 Years", rate: 7.50 },
      { tenure: "5 Years", rate: 7.25 },
    ],
    rdRate: 7.25,
    savingsRate: 7.00,
    lastUpdated: "Jun 2025",
    source: "https://www.aubank.in",
  },
  {
    bank: "Ujjivan Small Finance Bank",
    shortName: "Ujjivan",
    type: "sfb",
    fdRates: [
      { tenure: "1 Year", rate: 8.00 },
      { tenure: "2 Years", rate: 8.25 },
      { tenure: "3 Years", rate: 8.25 },
      { tenure: "5 Years", rate: 8.00 },
    ],
    rdRate: 8.00,
    savingsRate: 7.50,
    lastUpdated: "Jun 2025",
    source: "https://www.ujjivansfb.in",
  },
  {
    bank: "Jana Small Finance Bank",
    shortName: "Jana SFB",
    type: "sfb",
    fdRates: [
      { tenure: "1 Year", rate: 8.25 },
      { tenure: "2 Years", rate: 8.25 },
      { tenure: "3 Years", rate: 8.25 },
      { tenure: "5 Years", rate: 8.00 },
    ],
    rdRate: 8.00,
    savingsRate: 7.50,
    lastUpdated: "Jun 2025",
    source: "https://www.janabank.com",
  },
  {
    bank: "Suryoday Small Finance Bank",
    shortName: "Suryoday",
    type: "sfb",
    fdRates: [
      { tenure: "1 Year", rate: 8.60 },
      { tenure: "2 Years", rate: 8.60 },
      { tenure: "3 Years", rate: 8.60 },
      { tenure: "5 Years", rate: 8.25 },
    ],
    rdRate: 8.25,
    savingsRate: 7.25,
    lastUpdated: "Jun 2025",
    source: "https://www.suryodaybank.com",
  },
  {
    bank: "ESAF Small Finance Bank",
    shortName: "ESAF",
    type: "sfb",
    fdRates: [
      { tenure: "1 Year", rate: 8.25 },
      { tenure: "2 Years", rate: 8.25 },
      { tenure: "3 Years", rate: 8.25 },
      { tenure: "5 Years", rate: 8.00 },
    ],
    rdRate: 8.00,
    savingsRate: 7.00,
    lastUpdated: "Jun 2025",
    source: "https://www.esafbank.com",
  },
];

const TYPE_LABELS: Record<string, string> = {
  public: "Public Sector",
  private: "Private Sector",
  sfb: "Small Finance Bank",
};

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
      if (res.ok) {
        const data = await res.json();
        if (data.rates?.length) setRates(data.rates);
        setLastFetched(new Date());
      }
    } catch {
      // Use static rates as fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const tenures = ["1 Year", "2 Years", "3 Years", "5 Years"];

  const getFilteredAndSorted = () => {
    return [...rates]
      .filter((b) => selectedType === "all" || b.type === selectedType)
      .sort((a, b) => {
        const aRate = a.fdRates.find((r) => r.tenure === selectedTenure)?.rate || 0;
        const bRate = b.fdRates.find((r) => r.tenure === selectedTenure)?.rate || 0;
        return bRate - aRate;
      });
  };

  const sorted = getFilteredAndSorted();

  return (
    <section className="py-20 bg-[#0b0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1e24] border border-[#2a303a] text-[#0ecb81] text-xs font-semibold mb-4">
            <Landmark className="w-3.5 h-3.5" />
            20+ Banks Covered
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Bank Interest Rate Comparison
          </h2>
          <p className="text-[#707a8a] max-w-2xl mx-auto">
            Compare FD rates across public sector banks, private banks, and small finance banks. Rates updated June 2025.
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-3 mb-6">
          {/* Bank type filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {(["all", "public", "private", "sfb"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedType === t
                    ? "bg-[#0ecb81] text-[#0b0e11]"
                    : "bg-[#1a1e24] text-[#707a8a] border border-[#2a303a] hover:text-white hover:border-[#3a4150]"
                }`}
              >
                {t === "all" ? "All Banks" : TYPE_LABELS[t]}
              </button>
            ))}
          </div>

          {/* Tenure + refresh row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {tenures.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTenure(t)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTenure === t
                      ? "bg-blue-600 text-white"
                      : "bg-[#1a1e24] text-[#707a8a] border border-[#2a303a] hover:text-white hover:border-[#3a4150]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={fetchRates}
              disabled={loading}
              className="flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1a1e24] border border-[#2a303a] text-[#707a8a] text-xs hover:text-white hover:border-[#3a4150] transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
          {lastFetched && (
            <p className="text-xs text-[#707a8a] text-right">
              Updated: {lastFetched.toLocaleTimeString("en-IN")}
            </p>
          )}
        </div>

        {/* Rate Table */}
        <div className="bg-[#1a1e24] rounded-2xl border border-[#2a303a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#252b33] border-b border-[#2a303a]">
                  <th className="text-left px-5 py-3.5 font-semibold text-xs text-[#707a8a] uppercase tracking-wider">Bank</th>
                  <th className="text-center px-4 py-3.5 font-semibold text-xs text-[#707a8a] uppercase tracking-wider">Type</th>
                  <th className="text-center px-4 py-3.5 font-semibold text-xs text-[#707a8a] uppercase tracking-wider">FD ({selectedTenure})</th>
                  <th className="text-center px-4 py-3.5 font-semibold text-xs text-[#707a8a] uppercase tracking-wider hidden sm:table-cell">RD Rate</th>
                  <th className="text-center px-4 py-3.5 font-semibold text-xs text-[#707a8a] uppercase tracking-wider hidden md:table-cell">Savings</th>
                  <th className="text-center px-4 py-3.5 font-semibold text-xs text-[#707a8a] uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((bank, i) => {
                  const tenureRate = bank.fdRates.find((r) => r.tenure === selectedTenure);
                  const isTop = i === 0;
                  return (
                    <tr
                      key={bank.shortName}
                      className={`border-t border-[#2a303a] transition-colors hover:bg-[#252b33] ${
                        isTop ? "bg-[#0ecb81]/5" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs flex-shrink-0">
                            {bank.shortName.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm leading-tight">
                              {bank.bank}
                            </div>
                            <div className="text-xs text-[#707a8a]">Updated: {bank.lastUpdated}</div>
                          </div>
                          {isTop && (
                            <span className="px-2 py-0.5 bg-[#0ecb81]/15 text-[#0ecb81] text-xs font-bold rounded-md">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                          bank.type === "sfb"
                            ? "bg-amber-600/15 text-amber-400"
                            : bank.type === "private"
                            ? "bg-blue-600/15 text-blue-400"
                            : "bg-[#252b33] text-[#707a8a]"
                        }`}>
                          {bank.type === "sfb" ? "SFB" : bank.type === "private" ? "Private" : "Public"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`text-base font-bold ${isTop ? "text-[#0ecb81]" : "text-white"}`}>
                          {tenureRate?.rate.toFixed(2)}%
                        </span>
                        <span className="text-xs text-[#707a8a] block">p.a.</span>
                      </td>
                      <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                        <span className="font-semibold text-white text-sm">{bank.rdRate.toFixed(2)}%</span>
                      </td>
                      <td className="px-4 py-3.5 text-center hidden md:table-cell">
                        <span className="font-semibold text-white text-sm">{bank.savingsRate.toFixed(2)}%</span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <a
                          href={bank.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 transition-colors"
                        >
                          Official
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

        <p className="mt-4 text-center text-xs text-[#707a8a] max-w-3xl mx-auto">
          Rates shown are for general public (non-senior citizens). Senior citizens typically receive an additional 0.25%–0.75% p.a. Small Finance Banks (SFBs) are regulated by RBI and deposits are insured up to ₹5 lakh under DICGC. Always verify rates directly from the official bank website before investing.
        </p>
      </div>
    </section>
  );
}
