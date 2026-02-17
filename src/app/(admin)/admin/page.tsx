'use client';

import { StatsCard } from '@/components/admin/stats-card';
import {
  Users,
  ShieldCheck,
  Heart,
  TrendingUp,
  DollarSign,
  UserPlus,
  Send,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import {
  mockMetrics,
  mockRecentActivity,
  mockProfiles,
  mockVerifications,
  Activity,
} from '@/lib/mock-admin-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const activityIcons = {
  signup: UserPlus,
  verification: ShieldCheck,
  match: Heart,
  introduction: Send,
  payment: CreditCard,
  message: MessageCircle,
};

const activityColors = {
  signup: 'bg-blue-100 text-blue-600',
  verification: 'bg-yellow-100 text-yellow-600',
  match: 'bg-pink-100 text-pink-600',
  introduction: 'bg-purple-100 text-purple-600',
  payment: 'bg-green-100 text-green-600',
  message: 'bg-indigo-100 text-indigo-600',
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

function ActivityItem({ activity }: { activity: Activity }) {
  const Icon = activityIcons[activity.type];
  const colorClass = activityColors[activity.type];

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-[#FFF8F0] rounded-xl transition-colors">
      <div className={cn('p-2 rounded-lg', colorClass)}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#2D1318]">
          <span className="font-medium">{activity.profileName}</span>
          <span className="text-[#6B5B5E]"> — {activity.description}</span>
        </p>
        <p className="text-xs text-[#6B5B5E]">{formatTimeAgo(activity.timestamp)}</p>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  count,
  description,
  href,
  icon: Icon,
  color,
}: {
  title: string;
  count: number;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl p-5 shadow-sm border border-[#F5E0E8]/50 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn('p-2 rounded-xl', color)}>
          <Icon className="w-5 h-5" />
        </div>
        <ArrowRight className="w-5 h-5 text-[#6B5B5E] group-hover:text-[#7B1E3A] transition-colors" />
      </div>
      <h3 className="font-semibold text-[#2D1318]">{title}</h3>
      <p className="text-2xl font-bold text-[#7B1E3A] mt-1">{count}</p>
      <p className="text-xs text-[#6B5B5E] mt-1">{description}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  // Get today's date for greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Calculate some quick stats
  const activeProfiles = mockProfiles.filter((p) => p.status === 'active').length;
  const pendingVerifications = mockVerifications.length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2D1318]">{greeting}, Matchmaker!</h1>
        <p className="text-[#6B5B5E] mt-1">
          Here&apos;s what&apos;s happening with your matchmaking service today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatsCard
          title="Total Profiles"
          value={mockMetrics.totalProfiles}
          icon={Users}
          trend={mockMetrics.totalProfilesTrend}
        />
        <StatsCard
          title="Pending Verification"
          value={mockMetrics.pendingVerifications}
          icon={ShieldCheck}
          trend={mockMetrics.pendingVerificationsTrend}
        />
        <StatsCard
          title="Active Matches"
          value={mockMetrics.activeMatches}
          icon={Heart}
          trend={mockMetrics.activeMatchesTrend}
        />
        <StatsCard
          title="Success Rate"
          value={`${mockMetrics.successRate}%`}
          icon={TrendingUp}
          trend={mockMetrics.successRateTrend}
        />
        <StatsCard
          title="Revenue"
          value={formatCurrency(mockMetrics.revenue)}
          icon={DollarSign}
          trend={mockMetrics.revenueTrend}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <QuickActionCard
          title="Verification Queue"
          count={pendingVerifications}
          description="Profiles awaiting verification"
          href="/admin/verification"
          icon={ShieldCheck}
          color="bg-yellow-100 text-yellow-600"
        />
        <QuickActionCard
          title="New Signups"
          count={mockMetrics.newSignupsThisWeek}
          description="This week"
          href="/admin/profiles"
          icon={UserPlus}
          color="bg-blue-100 text-blue-600"
        />
        <QuickActionCard
          title="Introductions Sent"
          count={mockMetrics.introductionsSent}
          description="This month"
          href="/admin/introductions"
          icon={Send}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#F5E0E8]/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5E0E8] flex items-center justify-between">
            <h2 className="font-semibold text-[#2D1318] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#7B1E3A]" />
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" className="text-[#7B1E3A] hover:bg-[#F5E0E8]">
              View All
            </Button>
          </div>
          <div className="p-4 divide-y divide-[#F5E0E8]/50">
            {mockRecentActivity.slice(0, 6).map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Quick Stats & Upcoming */}
        <div className="space-y-6">
          {/* Today's Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#F5E0E8]/50 p-6">
            <h2 className="font-semibold text-[#2D1318] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#7B1E3A]" />
              Today&apos;s Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#FFF8F0] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-[#2D1318]">Active Profiles</span>
                </div>
                <span className="font-bold text-[#2D1318]">{activeProfiles}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FFF8F0] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-sm text-[#2D1318]">Pending Reviews</span>
                </div>
                <span className="font-bold text-[#2D1318]">{pendingVerifications}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FFF8F0] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Send className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-[#2D1318]">Meetings Scheduled</span>
                </div>
                <span className="font-bold text-[#2D1318]">
                  {mockMetrics.meetingsScheduled}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#F5E0E8]/50 p-6">
            <h2 className="font-semibold text-[#2D1318] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#7B1E3A]" />
              Match Performance
            </h2>
            <div className="aspect-[4/3] bg-[#FFF8F0] rounded-xl flex items-center justify-center border-2 border-dashed border-[#E3C4A8]">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-[#C9956B] mx-auto mb-2" />
                <p className="text-sm text-[#6B5B5E]">Chart Coming Soon</p>
                <p className="text-xs text-[#6B5B5E] mt-1">
                  Match success trends over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#7B1E3A] to-[#5C1229] rounded-2xl p-6 text-white">
          <Heart className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-sm opacity-80">Successful Matches</p>
          <p className="text-3xl font-bold mt-1">47</p>
          <p className="text-sm mt-2 opacity-70">All time engagements</p>
        </div>
        <div className="bg-gradient-to-br from-[#C9956B] to-[#A67744] rounded-2xl p-6 text-white">
          <Users className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-sm opacity-80">Premium Members</p>
          <p className="text-3xl font-bold mt-1">34</p>
          <p className="text-sm mt-2 opacity-70">Currently active</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#F5E0E8]/50">
          <MessageCircle className="w-8 h-8 text-[#7B1E3A] mb-3" />
          <p className="text-sm text-[#6B5B5E]">Unread Messages</p>
          <p className="text-3xl font-bold text-[#2D1318] mt-1">3</p>
          <Link
            href="/admin/messages"
            className="text-sm text-[#7B1E3A] mt-2 inline-flex items-center gap-1 hover:underline"
          >
            View messages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#F5E0E8]/50">
          <Calendar className="w-8 h-8 text-[#7B1E3A] mb-3" />
          <p className="text-sm text-[#6B5B5E]">Scheduled Meetings</p>
          <p className="text-3xl font-bold text-[#2D1318] mt-1">5</p>
          <p className="text-sm text-[#6B5B5E] mt-2">This week</p>
        </div>
      </div>
    </div>
  );
}
