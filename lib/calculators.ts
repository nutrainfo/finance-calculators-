// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_00_00_00_000) return `₹${(amount / 1_00_00_00_000).toFixed(2)} Cr`;
    if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
    if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(2)} L`;
    if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(2)} K`;
    return `₹${amount.toFixed(2)}`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// ─── SIP Calculator ───────────────────────────────────────────────────────────

export interface SIPResult {
  totalInvested: number;
  totalReturns: number;
  maturityValue: number;
  absoluteReturn: number;
  cagr: number;
  yearlyBreakdown: Array<{
    year: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

export function calculateSIP(
  monthlyAmount: number,
  annualRate: number,
  years: number
): SIPResult {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const maturityValue = monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvested = monthlyAmount * n;
  const totalReturns = maturityValue - totalInvested;
  const absoluteReturn = (totalReturns / totalInvested) * 100;
  const cagr = (Math.pow(maturityValue / totalInvested, 1 / years) - 1) * 100;

  const yearlyBreakdown = Array.from({ length: years }, (_, i) => {
    const yr = i + 1;
    const months = yr * 12;
    const val = monthlyAmount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const inv = monthlyAmount * months;
    return { year: yr, invested: inv, value: Math.round(val), returns: Math.round(val - inv) };
  });

  return {
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
    maturityValue: Math.round(maturityValue),
    absoluteReturn: Math.round(absoluteReturn * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    yearlyBreakdown,
  };
}

// ─── Step-Up SIP ──────────────────────────────────────────────────────────────

export interface StepUpSIPResult {
  totalInvested: number;
  maturityValue: number;
  totalReturns: number;
  yearlyBreakdown: Array<{ year: number; monthlyAmount: number; invested: number; value: number }>;
}

export function calculateStepUpSIP(
  initialMonthly: number,
  annualRate: number,
  years: number,
  stepUpPercent: number
): StepUpSIPResult {
  const r = annualRate / 100 / 12;
  let totalInvested = 0;
  let maturityValue = 0;
  const yearlyBreakdown = [];

  for (let yr = 1; yr <= years; yr++) {
    const monthly = initialMonthly * Math.pow(1 + stepUpPercent / 100, yr - 1);
    const remainingMonths = (years - yr + 1) * 12;
    const contribution = monthly * ((Math.pow(1 + r, 12) - 1) / r) * (1 + r);
    const fv = contribution * Math.pow(1 + r, (years - yr) * 12);
    maturityValue += fv;
    totalInvested += monthly * 12;
    yearlyBreakdown.push({
      year: yr,
      monthlyAmount: Math.round(monthly),
      invested: Math.round(monthly * 12),
      value: Math.round(fv),
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    maturityValue: Math.round(maturityValue),
    totalReturns: Math.round(maturityValue - totalInvested),
    yearlyBreakdown,
  };
}

// ─── Lumpsum Calculator ───────────────────────────────────────────────────────

export interface LumpsumResult {
  principal: number;
  maturityValue: number;
  totalReturns: number;
  absoluteReturn: number;
  cagr: number;
  yearlyBreakdown: Array<{ year: number; value: number; returns: number }>;
}

export function calculateLumpsum(
  principal: number,
  annualRate: number,
  years: number
): LumpsumResult {
  const maturityValue = principal * Math.pow(1 + annualRate / 100, years);
  const totalReturns = maturityValue - principal;
  const absoluteReturn = (totalReturns / principal) * 100;

  const yearlyBreakdown = Array.from({ length: years }, (_, i) => {
    const yr = i + 1;
    const val = principal * Math.pow(1 + annualRate / 100, yr);
    return { year: yr, value: Math.round(val), returns: Math.round(val - principal) };
  });

  return {
    principal: Math.round(principal),
    maturityValue: Math.round(maturityValue),
    totalReturns: Math.round(totalReturns),
    absoluteReturn: Math.round(absoluteReturn * 100) / 100,
    cagr: annualRate,
    yearlyBreakdown,
  };
}

// ─── EMI Calculator ───────────────────────────────────────────────────────────

export interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principal: number;
  schedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  const r = annualRate / 100 / 12;
  const emi = r === 0
    ? principal / tenureMonths
    : (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);

  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;

  let balance = principal;
  const schedule = Array.from({ length: tenureMonths }, (_, i) => {
    const interest = balance * r;
    const princ = emi - interest;
    balance -= princ;
    return {
      month: i + 1,
      emi: Math.round(emi),
      principal: Math.round(princ),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    };
  });

  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    principal: Math.round(principal),
    schedule,
  };
}

// ─── FD Calculator ────────────────────────────────────────────────────────────

export interface FDResult {
  principal: number;
  maturityValue: number;
  totalInterest: number;
  effectiveRate: number;
}

export function calculateFD(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number = 4
): FDResult {
  const r = annualRate / 100 / compoundingFrequency;
  const n = years * compoundingFrequency;
  const maturityValue = principal * Math.pow(1 + r, n);
  const totalInterest = maturityValue - principal;
  const effectiveRate = (Math.pow(1 + annualRate / 100 / compoundingFrequency, compoundingFrequency) - 1) * 100;

  return {
    principal: Math.round(principal),
    maturityValue: Math.round(maturityValue),
    totalInterest: Math.round(totalInterest),
    effectiveRate: Math.round(effectiveRate * 100) / 100,
  };
}

// ─── RD Calculator ────────────────────────────────────────────────────────────

export interface RDResult {
  totalInvested: number;
  maturityValue: number;
  totalInterest: number;
}

export function calculateRD(
  monthlyAmount: number,
  annualRate: number,
  years: number
): RDResult {
  const r = annualRate / 100 / 4;
  const n = years * 4;
  let maturityValue = 0;
  const months = years * 12;

  for (let i = 1; i <= months; i++) {
    const quartersRemaining = Math.ceil((months - i + 1) / 3);
    maturityValue += monthlyAmount * Math.pow(1 + r, quartersRemaining);
  }

  const totalInvested = monthlyAmount * months;
  return {
    totalInvested: Math.round(totalInvested),
    maturityValue: Math.round(maturityValue),
    totalInterest: Math.round(maturityValue - totalInvested),
  };
}

// ─── PPF Calculator ───────────────────────────────────────────────────────────

export function calculatePPF(
  yearlyAmount: number,
  years: number = 15
): { totalInvested: number; maturityValue: number; totalInterest: number; yearlyBreakdown: Array<{ year: number; balance: number; interest: number }> } {
  const rate = 0.071; // Current PPF rate 7.1%
  let balance = 0;
  const yearlyBreakdown = [];

  for (let yr = 1; yr <= years; yr++) {
    balance += yearlyAmount;
    const interest = balance * rate;
    balance += interest;
    yearlyBreakdown.push({ year: yr, balance: Math.round(balance), interest: Math.round(interest) });
  }

  return {
    totalInvested: yearlyAmount * years,
    maturityValue: Math.round(balance),
    totalInterest: Math.round(balance - yearlyAmount * years),
    yearlyBreakdown,
  };
}

// ─── SWP Calculator ───────────────────────────────────────────────────────────

export function calculateSWP(
  corpus: number,
  monthlyWithdrawal: number,
  annualRate: number
): { months: number; totalWithdrawn: number; finalBalance: number; schedule: Array<{ month: number; balance: number; withdrawal: number }> } {
  const r = annualRate / 100 / 12;
  let balance = corpus;
  let months = 0;
  const schedule = [];

  while (balance > 0 && months < 600) {
    months++;
    balance = balance * (1 + r) - monthlyWithdrawal;
    schedule.push({
      month: months,
      balance: Math.max(0, Math.round(balance)),
      withdrawal: Math.min(monthlyWithdrawal, Math.round(balance + monthlyWithdrawal)),
    });
    if (balance <= 0) break;
  }

  return {
    months,
    totalWithdrawn: monthlyWithdrawal * months,
    finalBalance: Math.max(0, Math.round(balance)),
    schedule: schedule.slice(0, 120), // First 10 years for display
  };
}

// ─── Income Tax (FY 2024-25) ──────────────────────────────────────────────────

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  tax: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  inHandMonthly: number;
  slabs: Array<{ range: string; rate: string; tax: number }>;
}

export function calculateIncomeTax(
  grossIncome: number,
  regime: "new" | "old" = "new",
  deductions: { section80c?: number; hra?: number; other?: number } = {}
): TaxResult {
  let taxableIncome = grossIncome;

  if (regime === "old") {
    const totalDeductions =
      Math.min(deductions.section80c || 0, 150000) +
      (deductions.hra || 0) +
      (deductions.other || 0) +
      50000; // Standard deduction
    taxableIncome = Math.max(0, grossIncome - totalDeductions);
  } else {
    taxableIncome = Math.max(0, grossIncome - 75000); // Standard deduction new regime
  }

  let tax = 0;
  const slabs: TaxResult["slabs"] = [];

  if (regime === "new") {
    const newSlabs = [
      { min: 0, max: 400000, rate: 0, label: "₹0 - ₹4L" },
      { min: 400000, max: 800000, rate: 0.05, label: "₹4L - ₹8L" },
      { min: 800000, max: 1200000, rate: 0.10, label: "₹8L - ₹12L" },
      { min: 1200000, max: 1600000, rate: 0.15, label: "₹12L - ₹16L" },
      { min: 1600000, max: 2000000, rate: 0.20, label: "₹16L - ₹20L" },
      { min: 2000000, max: 2400000, rate: 0.25, label: "₹20L - ₹24L" },
      { min: 2400000, max: Infinity, rate: 0.30, label: "₹24L+" },
    ];

    // Rebate u/s 87A for income up to ₹12L
    let rebateApplied = false;
    for (const slab of newSlabs) {
      if (taxableIncome > slab.min) {
        const taxable = Math.min(taxableIncome, slab.max) - slab.min;
        const slabTax = taxable * slab.rate;
        tax += slabTax;
        slabs.push({ range: slab.label, rate: `${slab.rate * 100}%`, tax: Math.round(slabTax) });
      }
    }
    if (taxableIncome <= 1200000) tax = 0; // Rebate
  } else {
    const oldSlabs = [
      { min: 0, max: 250000, rate: 0, label: "₹0 - ₹2.5L" },
      { min: 250000, max: 500000, rate: 0.05, label: "₹2.5L - ₹5L" },
      { min: 500000, max: 1000000, rate: 0.20, label: "₹5L - ₹10L" },
      { min: 1000000, max: Infinity, rate: 0.30, label: "₹10L+" },
    ];
    for (const slab of oldSlabs) {
      if (taxableIncome > slab.min) {
        const taxable = Math.min(taxableIncome, slab.max) - slab.min;
        const slabTax = taxable * slab.rate;
        tax += slabTax;
        slabs.push({ range: slab.label, rate: `${slab.rate * 100}%`, tax: Math.round(slabTax) });
      }
    }
    if (taxableIncome <= 500000) tax = 0; // Rebate old regime
  }

  const cess = tax * 0.04;
  const totalTax = tax + cess;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    grossIncome: Math.round(grossIncome),
    taxableIncome: Math.round(taxableIncome),
    tax: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    inHandMonthly: Math.round((grossIncome - totalTax) / 12),
    slabs,
  };
}

// ─── Retirement Calculator ────────────────────────────────────────────────────

export function calculateRetirement(params: {
  currentAge: number;
  retirementAge: number;
  monthlyExpenses: number;
  currentSavings: number;
  monthlySavings: number;
  expectedReturn: number;
  inflationRate: number;
  lifeExpectancy: number;
}) {
  const { currentAge, retirementAge, monthlyExpenses, currentSavings, monthlySavings, expectedReturn, inflationRate, lifeExpectancy } = params;
  const yearsToRetirement = retirementAge - currentAge;
  const retirementYears = lifeExpectancy - retirementAge;

  const futureMonthlyExpense = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const realReturnRate = (expectedReturn - inflationRate) / 100;
  const corpusNeeded = (futureMonthlyExpense * 12 * (1 - Math.pow(1 + realReturnRate, -retirementYears))) / realReturnRate;

  const r = expectedReturn / 100 / 12;
  const n = yearsToRetirement * 12;
  const sipCorpus = monthlySavings * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const lumpsumCorpus = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
  const totalCorpus = sipCorpus + lumpsumCorpus;
  const shortfall = Math.max(0, corpusNeeded - totalCorpus);
  const surplus = Math.max(0, totalCorpus - corpusNeeded);

  return {
    corpusNeeded: Math.round(corpusNeeded),
    totalCorpus: Math.round(totalCorpus),
    shortfall: Math.round(shortfall),
    surplus: Math.round(surplus),
    futureMonthlyExpense: Math.round(futureMonthlyExpense),
    sipCorpus: Math.round(sipCorpus),
    lumpsumCorpus: Math.round(lumpsumCorpus),
    isOnTrack: totalCorpus >= corpusNeeded,
  };
}

// ─── Inflation Calculator ─────────────────────────────────────────────────────

export function calculateInflationImpact(amount: number, inflationRate: number, years: number) {
  const futureValue = amount * Math.pow(1 + inflationRate / 100, years);
  const presentValue = amount / Math.pow(1 + inflationRate / 100, years);
  const purchasingPowerLoss = ((amount - presentValue) / amount) * 100;

  return {
    currentValue: amount,
    futureValue: Math.round(futureValue),
    presentValue: Math.round(presentValue),
    purchasingPowerLoss: Math.round(purchasingPowerLoss * 100) / 100,
    yearlyBreakdown: Array.from({ length: Math.min(years, 30) }, (_, i) => ({
      year: i + 1,
      value: Math.round(amount / Math.pow(1 + inflationRate / 100, i + 1)),
    })),
  };
}

// ─── Capital Gains ────────────────────────────────────────────────────────────

export function calculateCapitalGains(params: {
  salePrice: number;
  purchasePrice: number;
  holdingYears: number;
  assetType: "equity" | "debt" | "property";
}) {
  const { salePrice, purchasePrice, holdingYears, assetType } = params;
  const gain = salePrice - purchasePrice;
  const isLongTerm =
    assetType === "equity" ? holdingYears >= 1 :
    assetType === "property" ? holdingYears >= 2 : holdingYears >= 3;

  let taxRate = 0;
  let taxableGain = gain;
  let exemption = 0;

  if (assetType === "equity") {
    if (isLongTerm) {
      exemption = 100000; // ₹1L LTCG exemption
      taxableGain = Math.max(0, gain - exemption);
      taxRate = 12.5;
    } else {
      taxRate = 20;
    }
  } else if (assetType === "debt") {
    taxRate = isLongTerm ? 20 : 30; // Slab for short term
  } else {
    if (isLongTerm) {
      const cii2001 = 100, ciiPurchase = 310, ciiSale = 363; // Approximate
      const indexedCost = purchasePrice * (ciiSale / ciiPurchase);
      taxableGain = Math.max(0, salePrice - indexedCost);
      taxRate = 20;
    } else {
      taxRate = 30;
    }
  }

  const tax = (taxableGain * taxRate) / 100;
  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return {
    gain,
    taxableGain: Math.round(taxableGain),
    exemption,
    taxRate,
    tax: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    netProfit: Math.round(gain - totalTax),
    isLongTerm,
    gainType: isLongTerm ? "Long Term Capital Gain (LTCG)" : "Short Term Capital Gain (STCG)",
  };
}
