import InterestRateDashboard from "@/components/sections/interest-rate-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Bank Interest Rates — FD, RD & Savings Rates Today",
  description: "Compare live FD, RD and savings account interest rates across SBI, HDFC, ICICI, Axis, Kotak, IDFC FIRST Bank and more. Updated regularly from official sources.",
};

export default function InterestRatesPage() {
  return (
    <div className="bg-[#060c18] min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">Updated Regularly</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
          Live Bank Interest Rates
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Compare FD, RD and savings account interest rates from India&apos;s top banks. Sourced directly from official bank websites.
        </p>
      </div>
      <InterestRateDashboard />
    </div>
  );
}
