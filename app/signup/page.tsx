// app/signup/page.tsx
"use client";

import { useRouter } from "next/navigation";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthLayout>
      <AuthForm
        title="Create Account"
        submitText="Sign Up"
        footerText="Already registered?"
        footerLinkText="Login"
        footerLinkHref="/login"
        endpoint="/api/signup"
        showRegistrationFields
        onSuccess={() => router.push("/dashboard")}
      />
    </AuthLayout>
  );
}
