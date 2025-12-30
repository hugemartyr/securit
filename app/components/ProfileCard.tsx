"use client";

import { useEffect, useState } from "react";

type Remark = {
  text: string;
  date: string;
};

type User = {
  id: string;
  fullName: string;
  address: string;
  mobileNumber: string;
  particulars: string;
  remarks: Remark[];
  faceEnabled: boolean;
};

export default function ProfileCard({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [newRemark, setNewRemark] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  async function saveRemark() {
    if (!newRemark.trim()) return;
    setSaving(true);
    // Note: Consider updating state locally instead of reload for better UX
    await fetch("/api/portfolio", {
      method: "POST",
      body: JSON.stringify({ remark: newRemark }),
    });
    setNewRemark("");
    window.location.reload();
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-[#d4af37] tracking-[.3em] uppercase text-xs">
          Accessing Ledger...
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="text-center p-8 border border-red-900/50 bg-black text-red-500 rounded-lg">
        DATA CORRUPTION: PROFILE NOT FOUND
      </div>
    );

  return (
    <div className="max-w-xl mx-auto bg-[#050505] text-[#d4af37] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
      {/* 1. Header: Identification Block */}
      <div className="p-6 border-b border-[#1a1a1a] bg-gradient-to-r from-black to-[#0a0a0a]">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-[#d4af37]">
              {user.fullName}
            </h2>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-[#996515] rounded-full"></span>{" "}
                {user.mobileNumber}
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-[#996515] rounded-full"></span>{" "}
                {user.address}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div
            className={`px-3 py-1 rounded-full text-[9px] tracking-tighter border ${
              user.faceEnabled
                ? "border-emerald-500/50 text-emerald-500 bg-emerald-500/5"
                : "border-[#d4af37]/30 text-[#d4af37]/60"
            }`}
          >
            {user.faceEnabled ? "● BIOMETRIC VERIFIED" : "○ SCAN PENDING"}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* 2. Content Grid: Details & Biometric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="border-l-2 border-[#d4af37] pl-4">
              <h4 className="text-[10px] uppercase text-gray-500 tracking-widest mb-1">
                Asset Description
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed italic">
                "{user.particulars}"
              </p>
            </div>
          </div>

          {/* Biometric Frame */}
          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#996515] to-[#d4af37] rounded opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative w-28 h-28 bg-black flex items-center justify-center rounded border border-[#1a1a1a]">
                <img
                  src="/fingerprint.png"
                  alt="Fingerprint"
                  className="w-16 h-16 opacity-40 brightness-150 contrast-125 group-hover:scale-110 transition-transform"
                />
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Interaction: New Remark */}
        <div className="pt-6 border-t border-[#1a1a1a]">
          <div className="flex gap-0 overflow-hidden rounded-md border border-[#1a1a1a]">
            <input
              className="flex-1 bg-black text-[#d4af37] px-4 py-3 text-xs focus:outline-none placeholder:text-gray-700"
              placeholder="APPEND NOTES TO LEDGER..."
              value={newRemark}
              onChange={(e) => setNewRemark(e.target.value)}
            />
            <button
              onClick={saveRemark}
              disabled={saving}
              className="bg-[#d4af37] text-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#b8860b] transition-colors disabled:opacity-50"
            >
              {saving ? "..." : "Commit"}
            </button>
          </div>
        </div>

        {/* 4. History: Timeline of Remarks */}
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase text-[#d4af37] tracking-[0.3em] font-bold">
            Audit History
          </h3>
          <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-3">
              {user.remarks?.map((r, i) => (
                <li
                  key={i}
                  className="group border-b border-[#1a1a1a] pb-3 last:border-0"
                >
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                      {r.text}
                    </span>
                    <span className="text-[9px] text-gray-600 whitespace-nowrap uppercase tracking-tighter">
                      {new Date(r.date).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
