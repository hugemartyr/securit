// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function FaceLogin() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [ready, setReady] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           setReady(true);
//         }
//       })
//       .catch(() => alert("Camera access denied"));
//   }, []);

//   async function handleFaceLogin() {
//     setLoading(true);

//     const res = await fetch("/api/face/login", {
//       method: "POST",
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.success) {
//       window.location.href = "/dashboard";
//     } else {
//       alert("Face not recognized. Try again or use password.");
//     }
//   }

//   return (
//     <div style={{ marginTop: 20 }}>
//       <h3>Login with Face</h3>

//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         width={300}
//         height={220}
//         style={{ border: "1px solid #ccc" }}
//       />

//       <br />

//       <button onClick={handleFaceLogin} disabled={!ready || loading}>
//         {loading ? "Scanning..." : "Scan Face"}
//       </button>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

export default function FaceLogin() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setReady(true);
        }
      })
      .catch(() => alert("Camera access denied"));
  }, []);

  async function handleFaceLogin() {
    setLoading(true);
    try {
      const res = await fetch("/api/face/login", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/dashboard";
      } else {
        alert("Face not recognized. Try again or use password.");
      }
    } finally {
      setLoading(false);
    }
  }

  // --- Obsidian & Gold Styles ---
  const styles = {
    container:
      "flex flex-col items-center p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl shadow-2xl max-w-md mx-auto",
    title:
      "text-2xl font-bold mb-6 tracking-widest uppercase text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",

    // The "Frame" for the video
    videoWrapper:
      "relative group p-1 bg-gradient-to-tr from-[#8a6d3b] via-[#d4af37] to-[#f9f295] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.2)]",
    videoInner: "relative bg-[#050505] rounded-lg overflow-hidden",
    videoElement: "w-full aspect-video object-cover",

    // Scanner Overlay
    scannerLine:
      "absolute w-full h-[2px] bg-[#d4af37] opacity-50 shadow-[0_0_15px_#d4af37] animate-scan",

    button: `mt-8 w-full py-3 px-6 rounded-lg font-bold uppercase tracking-widest transition-all duration-300 
      ${
        !ready || loading
          ? "bg-[#1a1a1a] text-[#444] cursor-not-allowed"
          : "bg-gradient-to-r from-[#8a6d3b] to-[#d4af37] text-black hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95"
      }`,
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Identity Verification</h3>

      <div className={styles.videoWrapper}>
        <div className={styles.videoInner}>
          {/* Animated Scanning Line */}
          {ready && !loading && <div className={styles.scannerLine} />}

          <video
            ref={videoRef}
            autoPlay
            muted
            className={styles.videoElement}
          />
        </div>
      </div>

      <button
        onClick={handleFaceLogin}
        disabled={!ready || loading}
        className={styles.button}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            Scanning...
          </span>
        ) : (
          "Authenticate"
        )}
      </button>

      <p className="mt-4 text-[10px] text-[#444] uppercase tracking-tighter">
        Secure Biometric Access System v2.1
      </p>
    </div>
  );
}
