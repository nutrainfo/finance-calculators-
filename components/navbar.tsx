"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X, TrendingUp, ChevronDown } from "lucide-react";

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
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-[#0b0e11] border-b border-[#2a303a] ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base text-white">
              Calculate Future
            </span>
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
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[#b7bdc6] hover:text-white hover:bg-[#1a1e24] transition-all">
                  {group.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeGroup === group.label ? "rotate-180" : ""}`} />
                </button>
                {activeGroup === group.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-[#1a1e24] rounded-xl shadow-2xl shadow-black/50 border border-[#2a303a] py-1.5 z-50">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-[#b7bdc6] hover:text-white hover:bg-[#252b33] transition-colors"
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
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#b7bdc6] hover:text-white hover:bg-[#1a1e24] transition-all"
            >
              Mutual Funds
            </Link>
            <Link
              href="/interest-rates"
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#b7bdc6] hover:text-white hover:bg-[#1a1e24] transition-all"
            >
              Live Rates
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#707a8a] hover:text-white hover:bg-[#1a1e24] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              href="/calculators"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              All Calculators
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg text-[#707a8a] hover:text-white hover:bg-[#1a1e24] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0b0e11] border-t border-[#2a303a] max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-5 space-y-5">
            {calculatorGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold text-[#707a8a] uppercase tracking-widest mb-2 px-1">
                  {group.label}
                </p>
                <div className="grid grid-cols-1 gap-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-3 py-2.5 text-sm font-medium text-[#b7bdc6] hover:text-white hover:bg-[#1a1e24] rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/mutual-funds"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Mutual Funds
            </Link>
            <Link
              href="/interest-rates"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Live Interest Rates
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
