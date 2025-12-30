// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";
import FaceLogin from "../components/FaceLogin";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div>
      {/* Main Flex Container */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto p-4">
        {/* Left Column: Standard Auth */}
        <div className="flex-1 min-w-[350px] bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl shadow-2xl transition-all duration-500 hover:border-[#d4af37]/30">
          <AuthForm
            title="Go to Customer"
            submitText="Login"
            footerText="New Customer?"
            footerLinkText="Register"
            footerLinkHref="/signup"
            endpoint="/api/login"
            onSuccess={() => router.push("/dashboard")}
          />
        </div>

        {/* Middle Divider (Visible on Desktop) */}
        <div className="hidden md:flex items-center">
          <div className="h-3/4 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent" />
        </div>

        {/* Right Column: Face Login */}
        <div className="flex-1 min-w-[350px]">
          <FaceLogin />
        </div>
      </div>

      {/* <hr className="my-10 border-[#1a1a1a]" /> */}
    </div>
  );
}
