import HeroSection from "@/components/sections/hero-section";
import FeaturedCalculators from "@/components/sections/featured-calculators";
import InterestRateDashboard from "@/components/sections/interest-rate-dashboard";
import MutualFundsSection from "@/components/sections/mutual-funds-section";
import InvestmentTools from "@/components/sections/investment-tools";
import FinancialEducation from "@/components/sections/financial-education";
import PWAInstallSection from "@/components/sections/pwa-install-section";
import FAQSection from "@/components/sections/faq-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculate Future - India's #1 Financial Calculator Platform",
  description: "Free financial calculators for SIP, FD, EMI, income tax and 30+ tools. Compare 30+ mutual funds with Groww and Zerodha links. Plan your financial future with India's most accurate calculator platform.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCalculators />
      <InterestRateDashboard />
      <MutualFundsSection />
      <InvestmentTools />
      <FinancialEducation />
      <PWAInstallSection />
      <FAQSection />
    </>
  );
}
