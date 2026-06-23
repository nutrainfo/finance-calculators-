import CalculatorLayout from "@/components/calculator-layout";
import Link from "next/link";

export default function Page() {
  return (
    <CalculatorLayout
      title="Simple Interest Calculator Calculator"
      description="Calculate your results instantly with our accurate financial calculator."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators" },
        { label: "Calculator", href: "/calculators/simple-interest-calculator" },
      ]}
    >
      <div className="text-center py-16 bg-white bg-[#162038] rounded-2xl border border-[#1e2d4a]">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          This calculator is being built with the same accuracy and quality as all our other tools.
        </p>
        <Link href="/calculators" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
          View Available Calculators
        </Link>
      </div>
    </CalculatorLayout>
  );
}
