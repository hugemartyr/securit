// app/components/PriceCard.tsx
"use client";

import { Activity, Zap } from "lucide-react";

export default function PriceCard() {
  return (
    <div className="group relative w-full max-w-md bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(212,175,55,0.2)] hover:border-gray-700">
      {/* Live Status Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
            Live Market Price
          </h2>
        </div>
        <div className="p-2 bg-black border border-gray-800 rounded-lg group-hover:border-[#D4AF37]/50 transition-colors">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
        </div>
      </div>

      {/* Price Display */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            <p className="text-sm text-gray-500">24K 99.9% Pure Gold</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tight">
              ₹6,230
            </span>
            <span className="text-lg font-medium text-[#D4AF37]">/ gram</span>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-900/50">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-0.5">
              Day High
            </p>
            <p className="text-sm font-medium text-white">₹6,285</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-0.5">
              Day Low
            </p>
            <p className="text-sm font-medium text-white">₹6,190</p>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#D4AF37] opacity-[0.02] blur-3xl rounded-full pointer-events-none"></div>
    </div>
  );
}
