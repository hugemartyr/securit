"use client";

import { useRouter } from "next/navigation";
import { LogOut, Coins } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0a0a] border-b border-gray-800 px-6 py-3 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand/Logo Area */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 bg-black border border-gray-800 rounded-xl group-hover:border-[#D4AF37]/50 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
            <Coins className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
              GOLD <span className="text-[#D4AF37]">TRADER</span>
            </h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
              Profile Page
            </span>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-[1px] bg-gray-800 mx-2 hidden sm:block"></div>

          <button
            onClick={logout}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-black border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 hover:bg-[#111] transition-all duration-200 active:scale-95"
          >
            <span className="text-xs font-semibold uppercase tracking-wider">
              Logout
            </span>
            <LogOut className="w-4 h-4 group-hover:text-[#D4AF37] transition-colors" />
          </button>
        </div>
      </div>
    </nav>
  );
}
