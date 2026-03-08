import { AdminLayout as AdminShell } from '@/components/layouts/AdminLayout';

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
    <AdminShell>{children}</AdminShell>
  );
}
