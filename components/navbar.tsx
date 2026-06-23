"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, BarChart2 } from "lucide-react";

const calculatorGroups = [
  {
    label: "Investment",
    items: [
      { label: "SIP Calculator", href: "/calculators/sip-calculator" },
      { label: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" },
      { label: "Step-Up SIP", href: "/calculators/step-up-sip-calculator" },
      { label: "SWP Calculator", href: "/calculators/swp-calculator" },
      { label: "Retirement Calculator", href: "/calculators/retirement-calculator" },
      { label: "FIRE Calculator", href: "/calculators/fire-calculator" },
    ],
  },
  {
    label: "Deposits",
    items: [
      { label: "FD Calculator", href: "/calculators/fd-calculator" },
      { label: "RD Calculator", href: "/calculators/rd-calculator" },
      { label: "PPF Calculator", href: "/calculators/ppf-calculator" },
      { label: "Senior Citizen FD", href: "/calculators/senior-citizen-fd-calculator" },
    ],
  },
  {
    label: "Loans",
    items: [
      { label: "Home Loan EMI", href: "/calculators/home-loan-emi-calculator" },
      { label: "Personal Loan EMI", href: "/calculators/personal-loan-emi-calculator" },
      { label: "Car Loan EMI", href: "/calculators/car-loan-emi-calculator" },
      { label: "Loan Prepayment", href: "/calculators/loan-prepayment-calculator" },
    ],
  },
  {
    label: "Tax",
    items: [
      { label: "Income Tax", href: "/calculators/income-tax-calculator" },
      { label: "New vs Old Regime", href: "/calculators/new-vs-old-regime-calculator" },
      { label: "Capital Gains", href: "/calculators/capital-gains-calculator" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060c18]/95 backdrop-blur-xl border-b border-[#1e2d4a] shadow-xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-600/20">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-black text-white text-sm tracking-tight">Calculate</span>
              <span className="font-black text-amber-400 text-sm tracking-tight"> Future</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {calculatorGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveGroup(group.label)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  {group.label}
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activeGroup === group.label ? "rotate-180" : ""}`} />
                </button>
                {activeGroup === group.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-[#0d1526] rounded-xl shadow-2xl shadow-black/60 border border-[#1e2d4a] py-1.5 z-50">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-[#162038] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/mutual-funds"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              Mutual Funds
            </Link>
            <Link
              href="/interest-rates"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              Live Rates
            </Link>
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/calculators"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-all duration-200 shadow-lg shadow-amber-600/20"
            >
              All Calculators
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#060c18] border-t border-[#1e2d4a] max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-5 space-y-5">
            {calculatorGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2 px-1">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-[#0d1526] rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-[#1e2d4a] space-y-1">
              <Link href="/mutual-funds" onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-amber-400">Mutual Funds</Link>
              <Link href="/interest-rates" onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-amber-400">Live Interest Rates</Link>
              <Link href="/calculators" onClick={() => setMobileOpen(false)}
                className="block mt-3 px-4 py-3 text-center text-sm font-bold bg-amber-500 text-black rounded-xl">All Calculators</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
