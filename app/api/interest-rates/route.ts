import { NextResponse } from "next/server";

// Static fallback rates - updated manually per official bank websites
// Source: Each bank's official website (sbi.co.in, hdfcbank.com, etc.)
const FALLBACK_RATES = [
  {
    bank: "State Bank of India",
    shortName: "SBI",
    fdRates: [
      { tenure: "1 Year", rate: 6.80 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 6.75 },
      { tenure: "5 Years", rate: 6.50 },
    ],
    rdRate: 6.50,
    savingsRate: 2.70,
    lastUpdated: "Jun 2025",
    source: "https://www.sbi.co.in/web/interest-rates/deposit-rates/retail-domestic-term-deposits",
  },
  {
    bank: "HDFC Bank",
    shortName: "HDFC",
    fdRates: [
      { tenure: "1 Year", rate: 6.60 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 6.50,
    savingsRate: 3.00,
    lastUpdated: "Jun 2025",
    source: "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?folderPath=/OD/DEPOSITS/Fixed%20Deposit/",
  },
  {
    bank: "ICICI Bank",
    shortName: "ICICI",
    fdRates: [
      { tenure: "1 Year", rate: 6.70 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 6.60,
    savingsRate: 3.00,
    lastUpdated: "Jun 2025",
    source: "https://www.icicibank.com/personal-banking/deposits/fixed-deposit/interest-rate",
  },
  {
    bank: "Axis Bank",
    shortName: "Axis",
    fdRates: [
      { tenure: "1 Year", rate: 6.70 },
      { tenure: "2 Years", rate: 7.10 },
      { tenure: "3 Years", rate: 7.10 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 6.70,
    savingsRate: 3.00,
    lastUpdated: "Jun 2025",
    source: "https://www.axisbank.com/retail/rates-fees/deposits-interest-rates",
  },
  {
    bank: "Kotak Mahindra Bank",
    shortName: "Kotak",
    fdRates: [
      { tenure: "1 Year", rate: 7.10 },
      { tenure: "2 Years", rate: 7.10 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 6.20 },
    ],
    rdRate: 6.20,
    savingsRate: 3.50,
    lastUpdated: "Jun 2025",
    source: "https://www.kotak.com/en/personal-banking/deposits/term-deposit/interest-rates.html",
  },
  {
    bank: "Bank of Baroda",
    shortName: "BOB",
    fdRates: [
      { tenure: "1 Year", rate: 6.85 },
      { tenure: "2 Years", rate: 7.15 },
      { tenure: "3 Years", rate: 7.15 },
      { tenure: "5 Years", rate: 6.50 },
    ],
    rdRate: 6.85,
    savingsRate: 2.75,
    lastUpdated: "Jun 2025",
    source: "https://www.bankofbaroda.in/interest-rate-and-service-charges/deposit-interest-rate",
  },
  {
    bank: "Punjab National Bank",
    shortName: "PNB",
    fdRates: [
      { tenure: "1 Year", rate: 6.80 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 6.50 },
    ],
    rdRate: 6.50,
    savingsRate: 2.70,
    lastUpdated: "Jun 2025",
    source: "https://www.pnbindia.in/interest-rate-on-domestic-deposit.html",
  },
  {
    bank: "Canara Bank",
    shortName: "Canara",
    fdRates: [
      { tenure: "1 Year", rate: 6.85 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 6.70 },
    ],
    rdRate: 6.70,
    savingsRate: 2.90,
    lastUpdated: "Jun 2025",
    source: "https://canarabank.com/User_page.aspx?menuid=13&submenu=46&CatID=3",
  },
  {
    bank: "Union Bank of India",
    shortName: "Union",
    fdRates: [
      { tenure: "1 Year", rate: 6.80 },
      { tenure: "2 Years", rate: 7.00 },
      { tenure: "3 Years", rate: 7.00 },
      { tenure: "5 Years", rate: 6.70 },
    ],
    rdRate: 6.50,
    savingsRate: 2.75,
    lastUpdated: "Jun 2025",
    source: "https://www.unionbankofindia.co.in/english/IntRateDomesticDepo.aspx",
  },
  {
    bank: "IDFC FIRST Bank",
    shortName: "IDFC",
    fdRates: [
      { tenure: "1 Year", rate: 7.25 },
      { tenure: "2 Years", rate: 7.25 },
      { tenure: "3 Years", rate: 7.25 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 7.00,
    savingsRate: 7.00,
    lastUpdated: "Jun 2025",
    source: "https://www.idfcfirstbank.com/personal-banking/deposits/fixed-deposit",
  },
  {
    bank: "IndusInd Bank",
    shortName: "IndusInd",
    fdRates: [
      { tenure: "1 Year", rate: 7.25 },
      { tenure: "2 Years", rate: 7.25 },
      { tenure: "3 Years", rate: 7.25 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 7.00,
    savingsRate: 4.00,
    lastUpdated: "Jun 2025",
    source: "https://www.indusind.com/iblapp/content/IndusInd/en/home/personal-banking/deposits/fixed-deposit/fd-interest-rates.html",
  },
  {
    bank: "Yes Bank",
    shortName: "Yes",
    fdRates: [
      { tenure: "1 Year", rate: 7.25 },
      { tenure: "2 Years", rate: 7.25 },
      { tenure: "3 Years", rate: 7.25 },
      { tenure: "5 Years", rate: 7.00 },
    ],
    rdRate: 7.00,
    savingsRate: 5.00,
    lastUpdated: "Jun 2025",
    source: "https://www.yesbank.in/personal-banking/yes-depositors/fixed-deposit/interest-rate",
  },
];

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // In production, you would scrape or call bank APIs here
    // For now, return the curated static rates with proper attribution
    return NextResponse.json({
      rates: FALLBACK_RATES,
      lastUpdated: new Date().toISOString(),
      source: "official_bank_websites",
      disclaimer: "Rates are indicative. Please verify from official bank websites before investing. Senior citizens typically get 0.25%-0.50% additional interest.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rates", rates: FALLBACK_RATES },
      { status: 500 }
    );
  }
}
