"use client";

import { BookOpen, BarChart2, TrendingUp, Receipt, Flame, Home } from "lucide-react";

const articles = [
  {
    title: "What is SIP and How Does It Work?",
    description: "Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds, harnessing the power of rupee cost averaging and compounding.",
    readTime: "5 min read",
    category: "Investing",
    Icon: TrendingUp,
    color: "#3b82f6",
  },
  {
    title: "FD vs Mutual Funds: Which is Better?",
    description: "Compare the risk, returns, and tax implications of Fixed Deposits and Mutual Funds to make the right investment decision for your goals.",
    readTime: "8 min read",
    category: "Comparison",
    Icon: BarChart2,
    color: "#10b981",
  },
  {
    title: "Understanding the Power of Compounding",
    description: "Learn how compound interest can grow your wealth exponentially over time and why starting early makes all the difference.",
    readTime: "6 min read",
    category: "Basics",
    Icon: TrendingUp,
    color: "#8b5cf6",
  },
  {
    title: "New Tax Regime vs Old Tax Regime FY25",
    description: "A comprehensive guide to choosing between the new and old income tax regime for FY 2024-25, with examples and tax calculations.",
    readTime: "10 min read",
    category: "Tax",
    Icon: Receipt,
    color: "#f59e0b",
  },
  {
    title: "How to Plan for Early Retirement (FIRE)",
    description: "Discover the Financial Independence, Retire Early (FIRE) movement and how to calculate the corpus you need to retire on your own terms.",
    readTime: "12 min read",
    category: "Retirement",
    Icon: Flame,
    color: "#f43f5e",
  },
  {
    title: "EMI vs Prepayment: When to Prepay Your Loan",
    description: "Should you invest your surplus money or use it to prepay your home loan? A mathematical approach to making this crucial decision.",
    readTime: "7 min read",
    category: "Loans",
    Icon: Home,
    color: "#06b6d4",
  },
];

const glossaryTerms = [
  { term: "CAGR", definition: "Compound Annual Growth Rate — the rate at which an investment grows annually over time." },
  { term: "NAV", definition: "Net Asset Value — the per-unit price of a mutual fund scheme." },
  { term: "XIRR", definition: "Extended Internal Rate of Return — measures actual returns for SIP investments." },
  { term: "TDS", definition: "Tax Deducted at Source — tax deducted before income is paid to you." },
  { term: "LTCG", definition: "Long Term Capital Gains — profit from assets held for more than 1-3 years (varies by asset)." },
  { term: "PPF", definition: "Public Provident Fund — a 15-year government-backed savings scheme with tax-free returns." },
];

export default function FinancialEducation() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(180deg, #060c18 0%, #091220 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d1526] border border-[#1e2d4a] text-amber-400 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Learn Finance
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Financial Education Center
          </h2>
          <p className="text-slate-500">
            Master personal finance with our expert guides and articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-16">
          {articles.map((article) => {
            const Icon = article.Icon;
            return (
              <article
                key={article.title}
                className="bg-[#0d1526] rounded-2xl p-5 border border-[#1e2d4a] hover:border-[#2d4466] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${article.color}15`, border: `1px solid ${article.color}25` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: article.color }} />
                  </div>
                  <div>
                    <span
                      className="inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-2"
                      style={{ background: `${article.color}15`, color: article.color }}
                    >
                      {article.category}
                    </span>
                    <h3 className="font-bold text-white text-sm mb-1.5 leading-snug group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      {article.description}
                    </p>
                    <span className="text-xs text-slate-600">{article.readTime}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Glossary */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 text-center tracking-tight">
            Financial Glossary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {glossaryTerms.map((item) => (
              <div
                key={item.term}
                className="bg-[#0d1526] rounded-xl p-4 border border-[#1e2d4a]"
              >
                <div className="font-bold text-amber-400 text-sm mb-1">
                  {item.term}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {item.definition}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
