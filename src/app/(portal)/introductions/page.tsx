"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Heart, Clock, CheckCircle, Calendar, XCircle } from "lucide-react";
import { IntroductionTimeline } from "@/components/portal/introduction-timeline";
import { EmptyState } from "@/components/portal/empty-state";
import { introductions } from "@/lib/mock-data";

type FilterStatus = "all" | "pending" | "accepted" | "meeting_scheduled" | "completed" | "declined";

export default function IntroductionsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filteredIntroductions = introductions.filter((intro) => {
    if (filterStatus === "all") return true;
    return intro.status === filterStatus;
  });

  const statusCounts = {
    all: introductions.length,
    pending: introductions.filter((i) => i.status === "pending").length,
    accepted: introductions.filter((i) => i.status === "accepted").length,
    meeting_scheduled: introductions.filter((i) => i.status === "meeting_scheduled").length,
    completed: introductions.filter((i) => i.status === "completed").length,
    declined: introductions.filter((i) => i.status === "declined").length,
  };

  const statusLabels: Record<FilterStatus, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    all: { label: "All", icon: Heart },
    pending: { label: "Pending", icon: Clock },
    accepted: { label: "Accepted", icon: CheckCircle },
    meeting_scheduled: { label: "Meeting Scheduled", icon: Calendar },
    completed: { label: "Completed", icon: CheckCircle },
    declined: { label: "Declined", icon: XCircle },
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#2D1318] mb-2">Introductions</h1>
        <p className="text-[#6B5B5E]">
          Track your introductions and meeting progress with potential matches.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Pending"
          value={statusCounts.pending}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          label="Accepted"
          value={statusCounts.accepted}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Meetings"
          value={statusCounts.meeting_scheduled}
          icon={Calendar}
          color="burgundy"
        />
        <StatCard
          label="Total"
          value={statusCounts.all}
          icon={Heart}
          color="gold"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(statusLabels) as FilterStatus[]).map((status) => {
            const { label, icon: Icon } = statusLabels[status];
            const count = statusCounts[status];
            if (status !== "all" && count === 0) return null;

            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  filterStatus === status
                    ? "bg-[#7B1E3A] text-white"
                    : "bg-[#F5E0E8] text-[#6B5B5E] hover:bg-[#FECDD3]"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
                <span className="text-xs opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      {filteredIntroductions.length === 0 ? (
        <EmptyState
          type="introductions"
          title={filterStatus !== "all" ? `No ${statusLabels[filterStatus].label.toLowerCase()} introductions` : undefined}
          description={
            filterStatus !== "all"
              ? "Try selecting a different filter to see your introductions."
              : undefined
          }
        />
      ) : (
        <div className="max-w-3xl">
          <IntroductionTimeline introductions={filteredIntroductions} />
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 bg-[#F5E0E8] rounded-2xl p-6 max-w-3xl">
        <h3 className="text-lg font-serif font-semibold text-[#2D1318] mb-3">
          How Introductions Work
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7B1E3A] text-white flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-medium text-[#2D1318]">Mutual Interest</p>
              <p className="text-[#6B5B5E]">Both you and your match express interest</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7B1E3A] text-white flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-medium text-[#2D1318]">Introduction</p>
              <p className="text-[#6B5B5E]">Matchmaker facilitates the introduction</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7B1E3A] text-white flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-medium text-[#2D1318]">Meeting</p>
              <p className="text-[#6B5B5E]">Schedule and attend your first meeting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: "yellow" | "green" | "burgundy" | "gold";
}) {
  const colorStyles = {
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    burgundy: "bg-[#F5E0E8] text-[#7B1E3A] border-[#FECDD3]",
    gold: "bg-[#C9956B]/10 text-[#C9956B] border-[#C9956B]/30",
  };

  return (
    <div className={cn("rounded-xl border p-4", colorStyles[color])}>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs opacity-75">{label}</p>
        </div>
      </div>
    </div>
  );
}
