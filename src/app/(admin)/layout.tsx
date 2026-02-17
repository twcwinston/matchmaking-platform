import { AdminSidebar } from '@/components/admin/admin-sidebar';

export const metadata = {
  title: 'Admin Portal | Matchmaker',
  description: 'Matchmaker administration portal',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
