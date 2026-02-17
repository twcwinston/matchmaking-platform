"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  ArrowRight,
  Bell,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/portal/match-card";
import { currentUser, matches, notifications, dashboardStats, introductions } from "@/lib/mock-data";

export default function DashboardPage() {
  const recentMatches = matches.slice(0, 3);
  const recentNotifications = notifications.slice(0, 4);
  const upcomingMeeting = introductions.find((i) => i.status === "meeting_scheduled");

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Profile Completion Banner */}
      {currentUser.profileCompletion < 100 && (
        <div className="bg-gradient-to-r from-[#7B1E3A] to-[#9E3A55] rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold">{currentUser.profileCompletion}%</span>
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold mb-1">Complete Your Profile</h2>
                <p className="text-white/80 text-sm">
                  A complete profile gets 3x more matches. Add more photos and details!
                </p>
              </div>
            </div>
            <Link href="/profile">
              <Button className="bg-white text-[#7B1E3A] hover:bg-white/90 rounded-lg">
                Complete Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C9956B] rounded-full transition-all duration-500"
                style={{ width: `${currentUser.profileCompletion}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Matches"
          value={dashboardStats.totalMatches}
          icon={Users}
          trend="+3 this week"
          color="burgundy"
        />
        <StatCard
          label="New Matches"
          value={dashboardStats.newMatches}
          icon={Heart}
          color="gold"
        />
        <StatCard
          label="Active Introductions"
          value={dashboardStats.activeIntroductions}
          icon={TrendingUp}
          color="rose"
        />
        <StatCard
          label="Unread Messages"
          value={dashboardStats.messagesUnread}
          icon={MessageCircle}
          color="cream"
        />
      </div>

      {/* Upcoming Meeting Alert */}
      {upcomingMeeting && (
        <div className="bg-[#F5E0E8] border border-[#FECDD3] rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#7B1E3A] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#2D1318] font-serif text-lg">
                Upcoming Meeting with {upcomingMeeting.matchName}
              </h3>
              <p className="text-[#6B5B5E] text-sm">
                {upcomingMeeting.meetingDetails?.date} at {upcomingMeeting.meetingDetails?.time} •{" "}
                {upcomingMeeting.meetingDetails?.location}
              </p>
            </div>
            <Link href="/introductions">
              <Button
                variant="outline"
                className="border-[#7B1E3A] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white rounded-lg"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Matches */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-[#2D1318]">Recent Matches</h2>
            <Link
              href="/matches"
              className="text-[#7B1E3A] hover:text-[#5C1229] text-sm font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* Notifications Sidebar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-[#2D1318]">Notifications</h2>
            <Bell className="w-5 h-5 text-[#6B5B5E]" />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 divide-y divide-[#F5E0E8]">
            {recentNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <QuickActionCard
          title="Browse Matches"
          description="View your curated matches"
          href="/matches"
          icon={Users}
        />
        <QuickActionCard
          title="Message Matchmaker"
          description="Ask questions or get advice"
          href="/messages"
          icon={MessageCircle}
        />
        <QuickActionCard
          title="Update Preferences"
          description="Refine what you're looking for"
          href="/settings"
          icon={Heart}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color: "burgundy" | "gold" | "rose" | "cream";
}) {
  const colorStyles = {
    burgundy: "bg-[#7B1E3A]/10 text-[#7B1E3A]",
    gold: "bg-[#C9956B]/10 text-[#C9956B]",
    rose: "bg-[#F5E0E8] text-[#7B1E3A]",
    cream: "bg-[#FFF8F0] text-[#6B5B5E]",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colorStyles[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-[#2D1318] mb-1">{value}</p>
      <p className="text-sm text-[#6B5B5E]">{label}</p>
    </div>
  );
}

function NotificationItem({ notification }: { notification: typeof notifications[0] }) {
  const iconMap = {
    match: Heart,
    introduction: CheckCircle,
    message: MessageCircle,
    system: Bell,
  };
  const Icon = iconMap[notification.type];

  return (
    <Link href={notification.link || "#"} className="block p-4 hover:bg-[#FFF8F0] transition-colors">
      <div className="flex gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
            notification.isRead ? "bg-[#F5E0E8]" : "bg-[#7B1E3A]"
          )}
        >
          <Icon className={cn("w-4 h-4", notification.isRead ? "text-[#7B1E3A]" : "text-white")} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm", notification.isRead ? "text-[#6B5B5E]" : "font-semibold text-[#2D1318]")}>
            {notification.title}
          </p>
          <p className="text-xs text-[#6B5B5E] truncate">{notification.description}</p>
          <p className="text-xs text-[#C9956B] mt-1">
            {new Date(notification.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F5E0E8] flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#7B1E3A]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#2D1318]">{title}</h3>
            <p className="text-sm text-[#6B5B5E]">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
