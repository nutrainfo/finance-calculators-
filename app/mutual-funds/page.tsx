import MutualFundsSection from "@/components/sections/mutual-funds-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutual Funds in India - Compare & Invest via Groww or Zerodha | Calculate Future",
  description: "Browse 30+ top-rated mutual funds across Large Cap, Mid Cap, Small Cap, ELSS, Hybrid and Index categories. Compare NAV, AUM, expense ratios and invest directly via Groww or Zerodha Coin.",
};

export default function MutualFundsPage() {
  return (
    <main className="pt-16 sm:pt-20">
      <MutualFundsSection />
    </main>
  );
}
