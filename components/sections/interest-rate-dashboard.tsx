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
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-4">
            <Landmark className="w-3.5 h-3.5" />
            20+ Banks Covered
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Bank Interest Rate Comparison
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Compare FD rates across public sector banks, private banks, and small finance banks. Rates updated June 2025.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {(["all", "public", "private", "sfb"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedType === t
                    ? "bg-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                }`}
              >
                {t === "all" ? "All Banks" : TYPE_LABELS[t]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              {tenures.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTenure(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedTenure === t
                      ? "bg-blue-800 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {lastFetched && (
                <span className="text-xs text-slate-500">
                  Updated: {lastFetched.toLocaleTimeString("en-IN")}
                </span>
              )}
              <button
                onClick={fetchRates}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:border-blue-300 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Rate Table */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-800 to-blue-700 text-white">
                  <th className="text-left px-6 py-4 font-semibold text-sm">Bank</th>
                  <th className="text-center px-4 py-4 font-semibold text-sm">Type</th>
                  <th className="text-center px-4 py-4 font-semibold text-sm">FD Rate ({selectedTenure})</th>
                  <th className="text-center px-4 py-4 font-semibold text-sm hidden sm:table-cell">RD Rate</th>
                  <th className="text-center px-4 py-4 font-semibold text-sm hidden md:table-cell">Savings Rate</th>
                  <th className="text-center px-4 py-4 font-semibold text-sm">Source</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((bank, i) => {
                  const tenureRate = bank.fdRates.find((r) => r.tenure === selectedTenure);
                  const isTop = i === 0;
                  return (
                    <tr
                      key={bank.shortName}
                      className={`border-t border-slate-100 dark:border-slate-700 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                        isTop ? "bg-emerald-50/50 dark:bg-emerald-950/20" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {bank.shortName.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white text-sm">
                              {bank.bank}
                            </div>
                            <div className="text-xs text-slate-500">Updated: {bank.lastUpdated}</div>
                          </div>
                          {isTop && (
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          bank.type === "sfb"
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                            : bank.type === "private"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        }`}>
                          {bank.type === "sfb" ? "SFB" : bank.type === "private" ? "Private" : "Public"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-lg font-bold ${isTop ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>
                          {tenureRate?.rate.toFixed(2)}%
                        </span>
                        <span className="text-xs text-slate-500 block">p.a.</span>
                      </td>
                      <td className="px-4 py-4 text-center hidden sm:table-cell">
                        <span className="font-semibold text-slate-900 dark:text-white">{bank.rdRate.toFixed(2)}%</span>
                      </td>
                      <td className="px-4 py-4 text-center hidden md:table-cell">
                        <span className="font-semibold text-slate-900 dark:text-white">{bank.savingsRate.toFixed(2)}%</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <a
                          href={bank.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs hover:underline"
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

        <p className="mt-4 text-center text-xs text-slate-500 max-w-3xl mx-auto">
          Rates shown are for general public (non-senior citizens). Senior citizens typically receive an additional 0.25%–0.75% p.a. Small Finance Banks (SFBs) are regulated by RBI and deposits are insured up to ₹5 lakh under DICGC. Always verify rates directly from the official bank website before investing.
        </p>
      </div>
    </section>
  );
}
