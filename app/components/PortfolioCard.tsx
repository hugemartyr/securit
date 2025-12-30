"use client";

import { Wallet, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

type PortfolioData = {
  goldOwned: number;
  avgBuyPrice: number;
  totalValue: number;
};

export default function PortfolioCard() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    async function fetchPortfolio() {
      const res = await fetch("/api/portfolio");

      if (!res.ok) return;

      const json = await res.json();
      setData(json);
    }

    fetchPortfolio();
  }, []);

  if (!data) {
    return (
      <div className="w-full max-w-md p-6 rounded-2xl border border-gray-800 text-gray-500">
        Loading portfolio...
      </div>
    );
  }

  return (
    <div className="group relative w-full max-w-md bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(212,175,55,0.3)] hover:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-1">
            Your Portfolio
          </h2>
          <div className="h-0.5 w-8 bg-[#D4AF37] rounded-full"></div>
        </div>
        <div className="p-2 bg-black border border-gray-800 rounded-lg group-hover:border-[#D4AF37]/50 transition-colors">
          <Wallet className="w-5 h-5 text-[#D4AF37]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Estimated Value</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tight">
              ₹{data.totalValue.toLocaleString("en-IN")}
            </span>
            <div className="flex items-center text-xs text-emerald-500 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.4%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-900">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
              Gold Owned
            </p>
            <p className="text-lg font-semibold text-[#D4AF37]">
              {data.goldOwned}{" "}
              <span className="text-xs font-normal text-gray-400">g</span>
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
              Avg. Buy Price
            </p>
            <p className="text-lg font-semibold text-white">
              ₹{data.avgBuyPrice}{" "}
              <span className="text-xs font-normal text-gray-400">/g</span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-[#D4AF37] opacity-[0.03] blur-3xl rounded-full pointer-events-none"></div>
    </div>
  );
}
