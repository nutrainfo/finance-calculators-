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
    <div className="min-h-screen bg-[#060c18] pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 pt-6">
          {breadcrumb.map((item, i) => (
            <span key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              {i === breadcrumb.length - 1 ? (
                <span className="text-slate-300">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-amber-400 transition-colors">
                  {item.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
              {title}
            </h1>
            <button
              onClick={handleShare}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d1526] border border-[#1e2d4a] text-slate-400 text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Calculator content */}
        <div className="pb-20">
          {children}
        </div>

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <div className="pb-20 max-w-3xl">
            <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#0d1526] rounded-xl p-5 border border-[#1e2d4a]">
                  <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
