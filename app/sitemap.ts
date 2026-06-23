import { MetadataRoute } from "next";

const BASE_URL = "https://calculatefuture.in";

const calculators = [
  "sip-calculator",
  "step-up-sip-calculator",
  "lumpsum-calculator",
  "swp-calculator",
  "retirement-calculator",
  "fire-calculator",
  "inflation-calculator",
  "fd-calculator",
  "rd-calculator",
  "ppf-calculator",
  "senior-citizen-fd-calculator",
  "home-loan-emi-calculator",
  "personal-loan-emi-calculator",
  "car-loan-emi-calculator",
  "loan-prepayment-calculator",
  "income-tax-calculator",
  "new-vs-old-regime-calculator",
  "capital-gains-calculator",
  "compound-interest-calculator",
  "simple-interest-calculator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const calcPages = calculators.map((calc) => ({
    url: `${BASE_URL}/calculators/${calc}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/calculators`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/interest-rates`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...calcPages,
  ];
}
