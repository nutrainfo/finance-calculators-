"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Are the calculators on Calculate Future accurate?",
    answer: "Yes, all our calculators use industry-standard, SEBI-approved formulas. SIP calculations use the standard SIP future value formula, EMI uses the reducing balance method, and FD uses compound interest formulas. Our results match those of AMFI, RBI, and leading banks.",
  },
  {
    question: "Is Calculate Future free to use?",
    answer: "Yes, completely free! All 30+ calculators are free to use without any registration or subscription. We believe financial planning tools should be accessible to every Indian.",
  },
  {
    question: "How are FD interest rates updated?",
    answer: "Our live interest rate dashboard fetches data from official bank websites and displays rates for SBI, HDFC, ICICI, Axis, Kotak, IDFC FIRST, and more. Rates are updated regularly. Always verify with the official bank website before investing.",
  },
  {
    question: "Can I save my calculations?",
    answer: "Yes! You can save calculations locally on your device. When you install the Calculate Future app (PWA), your saved calculations persist and are accessible even offline.",
  },
  {
    question: "Which is better — New Tax Regime or Old Tax Regime?",
    answer: "It depends on your income level and deductions. Our New vs Old Regime Calculator compares both instantly. Generally, if you have high deductions (80C, HRA, home loan), the old regime may be beneficial. For income above ₹15L with fewer deductions, the new regime often wins.",
  },
  {
    question: "What is the FIRE number and how do I calculate it?",
    answer: "The FIRE (Financial Independence, Retire Early) number is the corpus you need to retire and live off investment returns. Use the 4% rule: FIRE Number = Annual Expenses × 25. Our FIRE Calculator helps you find your exact number adjusted for Indian inflation.",
  },
  {
    question: "How is SIP better than a lumpsum investment?",
    answer: "SIP benefits from Rupee Cost Averaging — you buy more units when markets are down and fewer when markets are up, reducing average cost over time. It also enforces financial discipline. However, if you have a large lumpsum and markets are at a low, a lumpsum can give better returns.",
  },
  {
    question: "Can I use the app offline on my phone?",
    answer: "Yes! Install the Calculate Future app (PWA) on your Android or iPhone. After the first load, all calculators work completely offline. Perfect for calculating on the go without internet.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="py-20 bg-[#0b0e11]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1e24] border border-[#2a303a] text-[#707a8a] text-xs font-semibold mb-4">
            Frequently Asked
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Common Questions
          </h2>
          <p className="text-[#707a8a]">
            Everything you need to know about Calculate Future
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#1a1e24] border border-[#2a303a] rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#252b33] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white text-sm">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#707a8a] flex-shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-[#707a8a] leading-relaxed text-sm border-t border-[#2a303a] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
