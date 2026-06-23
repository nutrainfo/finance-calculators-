"use client";

import Link from "next/link";
import { TrendingUp, Mail } from "lucide-react";

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const footerLinks = {
  Investment: [
    { label: "SIP Calculator", href: "/calculators/sip-calculator" },
    { label: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" },
    { label: "Step-Up SIP", href: "/calculators/step-up-sip-calculator" },
    { label: "Retirement Calculator", href: "/calculators/retirement-calculator" },
    { label: "FIRE Calculator", href: "/calculators/fire-calculator" },
  ],
  "Deposits & Banking": [
    { label: "FD Calculator", href: "/calculators/fd-calculator" },
    { label: "RD Calculator", href: "/calculators/rd-calculator" },
    { label: "PPF Calculator", href: "/calculators/ppf-calculator" },
    { label: "Compound Interest", href: "/calculators/compound-interest-calculator" },
    { label: "Simple Interest", href: "/calculators/simple-interest-calculator" },
  ],
  "Loans & EMI": [
    { label: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator" },
    { label: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator" },
    { label: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator" },
    { label: "Education Loan", href: "/calculators/education-loan-calculator" },
    { label: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator" },
  ],
  Tax: [
    { label: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
    { label: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator" },
    { label: "Capital Gains Tax", href: "/calculators/capital-gains-calculator" },
    { label: "Mutual Funds", href: "/mutual-funds" },
    { label: "Live Interest Rates", href: "/interest-rates" },
    { label: "All Calculators", href: "/calculators" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Calculate Future</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              India&apos;s most comprehensive financial calculator platform. Plan, calculate, and secure your financial future.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:hello@calculatefuture.in" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2025 Calculate Future. All rights reserved. Made in India.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 border-t border-slate-800 pt-6 space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-500">Regulatory Notice:</strong> Calculate Future is not a registered investment adviser, broker-dealer, or financial planner under SEBI (Investment Advisers) Regulations, 2013. We do not provide personalised investment advice. All information on this platform is for general educational and informational purposes only and does not constitute financial, tax, legal, or investment advice.
          </p>
          <p>
            <strong className="text-slate-500">Mutual Fund Disclaimer:</strong> Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. The fund data displayed is sourced from publicly available information; Calculate Future does not guarantee its accuracy or completeness. We are not affiliated with AMFI, Groww, Zerodha, or any asset management company.
          </p>
          <p>
            <strong className="text-slate-500">Calculator Accuracy:</strong> All calculators use standard industry formulas (SEBI-prescribed SIP formula, RBI reducing-balance EMI method, Income Tax Act FY 2024-25 slabs). Results are illustrative and may differ from actual outcomes due to market fluctuations, bank policy changes, and other factors. Always verify computations with the respective financial institution before transacting.
          </p>
          <p>
            <strong className="text-slate-500">Bank Rate Data:</strong> Interest rates shown are indicative based on publicly available data as of June 2025 and may change without notice. Verify current rates from official bank websites before opening any deposit account.
          </p>
        </div>
      </div>
    </footer>
  );
}
