// // app/components/AuthForm.tsx
// "use client";

// type AuthFormProps = {
//   title: string;
//   submitText: string;
//   showConfirmPassword?: boolean;
//   footerText: string;
//   footerLinkText: string;
//   footerLinkHref: string;
//   endpoint: "/api/login" | "/api/signup";
//   onSuccess: () => void;
// };

// export default function AuthForm({
//   title,
//   submitText,
//   showConfirmPassword = false,
//   footerText,
//   footerLinkText,
//   footerLinkHref,
//   endpoint,
//   onSuccess,
// }: AuthFormProps) {
//   async function handleSubmit() {
//     const inputs = document.querySelectorAll("input");
//     const email = inputs[0].value;
//     const password = inputs[1].value;

//     if (showConfirmPassword) {
//       const confirm = inputs[2].value;
//       if (password !== confirm) {
//         alert("Passwords do not match");
//         return;
//       }
//     }

//     const res = await fetch(endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.error);
//       return;
//     }

//     onSuccess();
//   }

//   return (
//     <>
//       <h2 className="text-2xl font-semibold mb-6">{title}</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full mb-4 p-2 bg-black border border-gray-700"
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full mb-4 p-2 bg-black border border-gray-700"
//       />

//       {showConfirmPassword && (
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="w-full mb-4 p-2 bg-black border border-gray-700"
//         />
//       )}

//       <button
//         onClick={handleSubmit}
//         className="w-full py-2 bg-[#D4AF37] text-black"
//       >
//         {submitText}
//       </button>

//       <p className="text-sm text-gray-400 mt-4">
//         {footerText}{" "}
//         <a href={footerLinkHref} className="text-[#D4AF37]">
//           {footerLinkText}
//         </a>
//       </p>
//     </>
//   );
// }

// app/components/AuthForm.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";

type AuthFormProps = {
  title: string;
  submitText: string;
  showConfirmPassword?: boolean;
  showGoldValueInput?: boolean; // Corrected prop name consistency
  showRegistrationFields?: boolean;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  endpoint: "/api/login" | "/api/signup";
  onSuccess: () => void;
};

export default function AuthForm({
  title,
  submitText,
  showConfirmPassword = false,
  showGoldValueInput = false,
  showRegistrationFields = false,
  footerText,
  footerLinkText,
  footerLinkHref,
  endpoint,
  onSuccess,
}: AuthFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  const fullnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);
  const particularsRef = useRef<HTMLInputElement>(null);
  const remarksRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;
    // Capture gold value
    const fullName = fullnameRef.current?.value || "";
    const address = addressRef.current?.value || "";
    const mobileNumber = mobileNumberRef.current?.value || "";
    const particulars = particularsRef.current?.value || "";
    const remarks = remarksRef.current?.value || "";

    // if (showConfirmPassword) {
    //   const confirm = confirmRef.current?.value;
    //   if (password !== confirm) {
    //     alert("Passwords do not match");
    //     return;
    //   }
    // }

    // Prepare the payload
    const payload: any = {
      email,
      fullName,
      address,
      mobileNumber,
      particulars,
      remarks,
    };
    // if (showGoldValueInput) {
    //   payload.goldOwned = goldOwned;
    // }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "An error occurred");
      return;
    }

    onSuccess();
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-[0_0_50px_-12px_rgba(212,175,55,0.15)]">
      <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
        {title}
      </h2>
      <p className="text-gray-500 text-center mb-8 text-sm">
        Please enter your details to continue.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
            Full Name
          </label>
          <input
            ref={fullnameRef}
            type="text"
            placeholder="Your name"
            required
            className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
          />
        </div>

        {/* <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="••••••••"
            required
            className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
          />
        </div> */}

        {/* {showConfirmPassword && (
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
              Confirm Password
            </label>
            <input
              ref={confirmRef}
              type="password"
              placeholder="••••••••"
              required
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
          </div>
        )} */}

        {/* {showGoldValueInput && (
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
              Initial Gold Balance (grams)
            </label>
            <input
              ref={goldValueRef} // Fixed: Now uses the specific gold ref
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        )} */}

        {showRegistrationFields && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Your email address"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                Address
              </label>
              <input
                ref={addressRef}
                type="text"
                placeholder="Your address"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            {/* <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                Mobile Number
              </label>
              <input
                ref={mobileNumberRef}
                type="text"
                placeholder="Your mobile number"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div> */}

            <div className="group">
              <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">
                Mobile Number
              </label>

              <div className="relative flex items-center">
                {/* The Interior Button (Left Corner) */}
                <button
                  type="button"
                  className="absolute right-2 p-1.5 text-[#d4af37]/60 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-md transition-all duration-300 z-10"
                  onClick={() => console.log("Action Triggered")}
                >
                  {/* Example: A simple '+' or 'ID' icon */}
                  {/* <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg> */}
                  Get OTP
                </button>

                {/* The Input Field */}
                <input
                  ref={mobileNumberRef}
                  type="text"
                  placeholder="Your mobile number"
                  /* Note the 'pl-11' - this padding ensures the text doesn't overlap the button */
                  className="w-full pl-11 pr-4 py-3 bg-[#050505] border border-[#1a1a1a] rounded-lg text-white placeholder:text-gray-700 
                 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 
                 transition-all duration-500 shadow-inner group-hover:border-gray-600"
                />

                {/* Aesthetic Gold Underline Detail */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-focus-within:w-full" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                Particulars
              </label>
              <input
                ref={particularsRef}
                type="text"
                placeholder="Particulars"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                Remarks
              </label>
              <input
                ref={remarksRef}
                type="text"
                placeholder="Remarks"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-3.5 mt-2 bg-[#D4AF37] hover:bg-[#b8962e] text-black font-bold rounded-lg transition-colors shadow-lg active:scale-[0.98]"
        >
          {submitText}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-400">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="text-[#D4AF37] font-semibold hover:underline decoration-1 underline-offset-4"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
