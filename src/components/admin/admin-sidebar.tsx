'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Heart,
  MessageSquareHeart,
  MessageCircle,
  CreditCard,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Profiles',
    href: '/admin/profiles',
    icon: Users,
  },
  {
    label: 'Verification',
    href: '/admin/verification',
    icon: ShieldCheck,
  },
  {
    label: 'Matching',
    href: '/admin/matching',
    icon: Heart,
  },
  {
    label: 'Introductions',
    href: '/admin/introductions',
    icon: MessageSquareHeart,
  },
  {
    label: 'Messages',
    href: '/admin/messages',
    icon: MessageCircle,
  },
  {
    label: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#7B1E3A] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9956B] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Matchmaker</h1>
            <p className="text-xs text-white/60">Admin Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Admin Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C9956B] flex items-center justify-center text-white font-semibold">
            M
          </div>
          <div>
            <p className="text-sm font-medium text-white">Matchmaker</p>
            <p className="text-xs text-white/60">admin@platform.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
