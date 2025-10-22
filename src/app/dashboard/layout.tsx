import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />
      <main id="main-content" className="flex-1 pt-16" role="main">
        <div className="max-w-7xl w-full mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}