"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Heart,
  MessageCircle,
  User,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { currentUser, notifications } from "@/lib/mock-data";
import { StatusBadge } from "./status-badge";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/matches", label: "My Matches", icon: Users, badge: 3 },
  { href: "/introductions", label: "Introductions", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageCircle, badge: 1 },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#FECDD3]/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-[#2D1318] hover:bg-[#F5E0E8] rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B1E3A] to-[#5C1229] flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif font-bold text-[#2D1318] text-lg">Matchmaker</span>
          </Link>
          <Link
            href="/notifications"
            className="p-2 text-[#2D1318] hover:bg-[#F5E0E8] rounded-lg relative"
          >
            <Bell className="w-6 h-6" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#7B1E3A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-[#FECDD3]/50 flex flex-col",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#FECDD3]/50">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B1E3A] to-[#5C1229] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif font-bold text-[#2D1318] text-xl">Matchmaker</span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 text-[#6B5B5E] hover:text-[#2D1318]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-[#7B1E3A] text-white shadow-md"
                        : "text-[#6B5B5E] hover:bg-[#F5E0E8] hover:text-[#7B1E3A]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span
                        className={cn(
                          "ml-auto text-xs font-bold px-2 py-0.5 rounded-full",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#7B1E3A] text-white"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-[#FECDD3]/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF8F0]">
            <img
              src={currentUser.photoUrl}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#F5E0E8]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#2D1318] truncate">
                {currentUser.name}
              </p>
              <div className="flex items-center gap-1">
                {currentUser.isVerified && (
                  <StatusBadge type="verified" size="sm" />
                )}
              </div>
            </div>
            <button className="p-1 text-[#6B5B5E] hover:text-[#7B1E3A]">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  return (
    <header
      className={cn(
        "hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-[#FECDD3]/50",
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#2D1318]">
          Welcome back, {currentUser.name.split(" ")[0]}!
        </h1>
        <p className="text-sm text-[#6B5B5E]">
          Here&apos;s what&apos;s happening with your matches today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-[#6B5B5E] hover:text-[#7B1E3A] hover:bg-[#F5E0E8] rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          {unreadNotifications > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-[#7B1E3A] text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#F5E0E8]">
          <img
            src={currentUser.photoUrl}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#F5E0E8]"
          />
          <div className="hidden xl:block">
            <p className="text-sm font-semibold text-[#2D1318]">{currentUser.name}</p>
            <p className="text-xs text-[#6B5B5E]">View profile</p>
          </div>
        </div>
      </div>
    </header>
  );
}
