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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-800 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-800 to-emerald-600 bg-clip-text text-transparent">
              Calculate Future
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {calculatorGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveGroup(group.label)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                  {group.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeGroup === group.label ? "rotate-180" : ""}`} />
                </button>
                {activeGroup === group.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
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
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            >
              Mutual Funds
            </Link>
            <Link
              href="/interest-rates"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            >
              Live Rates
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/calculators"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
            >
              All Calculators
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {calculatorGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
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
              className="block px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-400"
            >
              Mutual Funds
            </Link>
            <Link
              href="/interest-rates"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-blue-700 dark:text-blue-400"
            >
              Live Interest Rates
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
