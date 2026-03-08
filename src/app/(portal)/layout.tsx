import { MobileBottomNav, Sidebar, TopBar } from "@/components/portal/sidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <TopBar />
          {/* Mobile spacing for fixed header */}
          <div className="pt-16 pb-20 lg:pt-0 lg:pb-0">
            {children}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
