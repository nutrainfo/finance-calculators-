"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Share2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
  breadcrumb: { label: string; href: string }[];
  children: ReactNode;
  faqs?: { q: string; a: string }[];
}

export default function CalculatorLayout({ title, description, breadcrumb, children, faqs }: Props) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text: description, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 mb-8">
          {breadcrumb.map((item, i) => (
            <span key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
              {i === breadcrumb.length - 1 ? (
                <span className="text-slate-600 dark:text-slate-300 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Page header */}
        <div className="flex items-start justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>
          <button
            onClick={handleShare}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm hover:border-blue-300 hover:text-blue-600 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Calculator content */}
        <div className="pb-20">
          {children}
        </div>

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <div className="pb-20 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">{faq.q}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
