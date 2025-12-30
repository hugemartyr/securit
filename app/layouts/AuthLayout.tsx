// app/layouts/AuthLayout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm border border-gray-700 p-6">
        {children}
      </div>
    </main>
  );
}
