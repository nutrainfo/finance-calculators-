"use client";

import { BookOpen, BarChart2, TrendingUp, Receipt, Flame, Home } from "lucide-react";

const articles = [
  {
    title: "What is SIP and How Does It Work?",
    description: "Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds, harnessing the power of rupee cost averaging and compounding.",
    readTime: "5 min read",
    category: "Investing",
    Icon: TrendingUp,
  },
  {
    title: "FD vs Mutual Funds: Which is Better?",
    description: "Compare the risk, returns, and tax implications of Fixed Deposits and Mutual Funds to make the right investment decision for your goals.",
    readTime: "8 min read",
    category: "Comparison",
    Icon: BarChart2,
  },
  {
    title: "Understanding the Power of Compounding",
    description: "Learn how compound interest can grow your wealth exponentially over time and why starting early makes all the difference.",
    readTime: "6 min read",
    category: "Basics",
    Icon: TrendingUp,
  },
  {
    title: "New Tax Regime vs Old Tax Regime FY25",
    description: "A comprehensive guide to choosing between the new and old income tax regime for FY 2024-25, with examples and tax calculations.",
    readTime: "10 min read",
    category: "Tax",
    Icon: Receipt,
  },
  {
    title: "How to Plan for Early Retirement (FIRE)",
    description: "Discover the Financial Independence, Retire Early (FIRE) movement and how to calculate the corpus you need to retire on your own terms.",
    readTime: "12 min read",
    category: "Retirement",
    Icon: Flame,
  },
  {
    title: "EMI vs Prepayment: When to Prepay Your Loan",
    description: "Should you invest your surplus money or use it to prepay your home loan? A mathematical approach to making this crucial decision.",
    readTime: "7 min read",
    category: "Loans",
    Icon: Home,
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
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Articles */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Learn Finance
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Financial Education Center
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Master personal finance with our expert guides and articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {articles.map((article) => {
            const Icon = article.Icon;
            return (
              <article
                key={article.title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 card-hover cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {article.description}
                    </p>
                    <span className="text-xs text-slate-400">{article.readTime}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Glossary */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Financial Glossary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossaryTerms.map((item) => (
              <div
                key={item.term}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
              >
                <div className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1">
                  {item.term}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
