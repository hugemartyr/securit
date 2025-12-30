"use client";

import { useEffect, useRef, useState } from "react";

export default function FaceRegister({ userId }: { userId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setReady(true);
      }
    });
    // Cleanup stream on unmount
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  async function registerFace() {
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/face/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (data.success) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl shadow-2xl max-w-md mx-auto">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-light tracking-widest text-[#d4af37] uppercase">
          Biometric Registry
        </h3>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-tighter">
          Secure Obsidian Interface
        </p>
      </div>

      {/* Video Frame - The "Golden Frame" */}
      <div className="relative p-1 rounded-xl bg-gradient-to-b from-[#d4af37] via-[#996515] to-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
        <div className="relative overflow-hidden rounded-lg bg-black aspect-video w-72 flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            className={`w-full h-full object-cover grayscale-[0.3] contrast-125 transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Scanning Overlay Effect */}
          {ready && !loading && (
            <div className="absolute inset-0 border-[1px] border-[#d4af37]/20 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]"></div>
            </div>
          )}

          {!ready && (
            <div className="text-[#d4af37] text-xs animate-pulse">
              INITIALIZING OPTICS...
            </div>
          )}
        </div>
      </div>

      {/* Action Section */}
      <div className="mt-8 w-full space-y-4">
        <button
          onClick={registerFace}
          disabled={!ready || loading}
          className={`w-full py-3 px-6 rounded-md transition-all duration-300 font-medium tracking-widest uppercase text-xs
            ${
              loading
                ? "bg-[#1a1a1a] text-gray-600 cursor-not-allowed"
                : "bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black active:scale-95 shadow-[0_0_10px_rgba(212,175,55,0.1)]"
            }`}
        >
          {loading ? "Processing Pattern..." : "Authorize Registry"}
        </button>

        {/* Feedback Messages */}
        {status === "success" && (
          <p className="text-center text-emerald-500 text-[10px] uppercase tracking-[0.2em] animate-fade-in">
            Identity Encrypted & Stored
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-red-500 text-[10px] uppercase tracking-[0.2em]">
            Registry Failed - Retry Required
          </p>
        )}
      </div>
    </div>
  );
}
