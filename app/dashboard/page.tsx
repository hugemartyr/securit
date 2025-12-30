// app/dashboard/page.tsx
import Navbar from "../components/Navbar";
import PriceCard from "../components/PriceCard";
import PortfolioCard from "../components/PortfolioCard";
import { getSession } from "@/lib/session";
import FaceRegister from "../components/FaceRegister";
import { readDB } from "@/lib/db";
import ProfileCard from "../components/ProfileCard";

export default async function DashboardPage() {
  const userId = await getSession();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const db = readDB();
  const user = db.users.find((u) => u.id === userId);

  return (
    <main className="min-h-screen bg-[#050505] p-8 text-[#d4af37]">
      <Navbar />

      {/* Grid Layout: 
          - md:grid-cols-3 creates 3 equal columns.
          - The PriceCard takes 1 column (1/3).
          - The right-side container takes 2 columns (2/3).
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-8">
        {/* Left Column: Sidebar (1/3) */}
        <aside className="space-y-6">
          <div className="sticky top-8">
            <PriceCard />
            <div className="mt-4 p-4 border border-[#1a1a1a] rounded-lg bg-[#0a0a0a]/50">
              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 text-center">
                System Status: Active
              </p>
            </div>
          </div>
        </aside>

        {/* Right Column: Main Content (2/3) */}
        <div className="md:col-span-2 space-y-8">
          {/* Profile Section */}
          <section className="w-full">
            <ProfileCard userId={userId} />
          </section>

          {/* Conditional Biometric Registration */}
          {!user?.faceEnabled && (
            <section className="w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="relative">
                {/* Visual separator for the biometric section */}
                <div className="absolute -top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
                <FaceRegister userId={userId} />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
