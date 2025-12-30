// import Link from "next/link";

// export default function LandingPage() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold mb-2">Gold Trader Platform</h1>

//       <p className="text-gray-400 mb-8">Secure. Local. Private.</p>

//       <div className="flex gap-4">
//         <Link
//           href="/login"
//           className="px-6 py-2 border border-white hover:bg-white hover:text-black transition"
//         >
//           Go to Customer
//         </Link>

//         <Link
//           href="/signup"
//           className="px-6 py-2 bg-[#D4AF37] text-black hover:opacity-90 transition"
//         >
//           Add New Customer
//         </Link>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [accessID, setAccessID] = useState("");
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  // Hardcoded for demonstration; ideally handled via a secure session or API
  const VAULT_ID = "ADMIN_01";
  const VAULT_KEY = "GOLD_2025";

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessID === VAULT_ID && password === VAULT_KEY) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      // Subtle shake effect or reset
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 selection:bg-[#d4af37]/30">
      {/* Decorative Background Element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extralight tracking-[0.3em] text-[#d4af37] uppercase">
            Aureum <span className="font-bold">Vault</span>
          </h1>
          <p className="text-[10px] tracking-[.5em] text-gray-500 uppercase mt-4">
            Secured Asset Management Terminal
          </p>
        </div>

        {!isUnlocked ? (
          /* Authentication Form */
          <form
            onSubmit={handleUnlock}
            className={`space-y-6 p-8 border border-[#1a1a1a] bg-black/40 backdrop-blur-sm rounded-2xl transition-all duration-300 ${
              error ? "border-red-900 animate-bounce" : ""
            }`}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 ml-1">
                  Personnel ID
                </label>
                <input
                  type="text"
                  value={accessID}
                  onChange={(e) => setAccessID(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] p-3 text-[#d4af37] focus:outline-none focus:border-[#d4af37]/50 rounded transition-all"
                  placeholder="Enter ID"
                />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2 ml-1">
                  Access Key
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] p-3 text-[#d4af37] focus:outline-none focus:border-[#d4af37]/50 rounded transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-transparent border border-[#d4af37] text-[#d4af37] text-xs font-bold uppercase tracking-[.2em] hover:bg-[#d4af37] hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
            >
              Authorize Access
            </button>
            {error && (
              <p className="text-[9px] text-red-500 text-center uppercase tracking-widest">
                Invalid Credentials
              </p>
            )}
          </form>
        ) : (
          /* Unlocked Navigation */
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-4">
              <span className="text-[10px] text-emerald-500 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-tighter">
                Authentication Verified
              </span>
            </div>

            <Link
              href="/login"
              className="group relative px-6 py-4 border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#d4af37]/50 transition-all text-center"
            >
              <span className="text-xs uppercase tracking-[.3em] text-gray-400 group-hover:text-[#d4af37]">
                Customer Directory
              </span>
            </Link>

            <Link
              href="/signup"
              className="px-6 py-4 bg-[#d4af37] text-black text-center text-xs font-bold uppercase tracking-[.3em] hover:brightness-110 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
            >
              Onboard New Asset
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
