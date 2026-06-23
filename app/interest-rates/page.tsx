import InterestRateDashboard from "@/components/sections/interest-rate-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Bank Interest Rates — FD, RD & Savings Rates Today",
  description: "Compare live FD, RD and savings account interest rates across SBI, HDFC, ICICI, Axis, Kotak, IDFC FIRST Bank and more. Updated regularly from official sources.",
};

export default function InterestRatesPage() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Live Bank Interest Rates
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Compare FD, RD and savings account interest rates from India&apos;s top banks. Sourced directly from official bank websites.
        </p>
      </div>
      <InterestRateDashboard />
    </div>
  );
}
