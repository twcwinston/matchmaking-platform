"use client";

import { cn } from "@/lib/utils";
import { Clock, CheckCircle, Calendar, XCircle, MessageCircle } from "lucide-react";
import type { Introduction } from "@/lib/mock-data";

interface IntroductionTimelineProps {
  introductions: Introduction[];
  className?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    dotColor: "bg-yellow-400",
    label: "Pending Response",
  },
  accepted: {
    icon: CheckCircle,
    color: "bg-emerald-50 text-emerald-700 border-emerald-300",
    dotColor: "bg-emerald-400",
    label: "Accepted",
  },
  meeting_scheduled: {
    icon: Calendar,
    color: "bg-[#F5E0E8] text-[#7B1E3A] border-[#FECDD3]",
    dotColor: "bg-[#7B1E3A]",
    label: "Meeting Scheduled",
  },
  completed: {
    icon: CheckCircle,
    color: "bg-[#C9956B]/10 text-[#C9956B] border-[#C9956B]/30",
    dotColor: "bg-[#C9956B]",
    label: "Completed",
  },
  declined: {
    icon: XCircle,
    color: "bg-gray-100 text-gray-500 border-gray-300",
    dotColor: "bg-gray-400",
    label: "Declined",
  },
};

export function IntroductionTimeline({ introductions, className }: IntroductionTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {introductions.map((intro, index) => {
        const config = statusConfig[intro.status];
        const Icon = config.icon;
        const isLast = index === introductions.length - 1;

        return (
          <div key={intro.id} className="relative flex gap-4">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-[#F5E0E8]" />
            )}

            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm",
                  config.dotColor
                )}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={intro.matchPhoto}
                    alt={intro.matchName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#F5E0E8]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#2D1318] font-serif">
                      {intro.matchName}
                    </h4>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border mt-1",
                        config.color
                      )}
                    >
                      {config.label}
                    </span>
                  </div>
                  <time className="text-xs text-[#6B5B5E] whitespace-nowrap">
                    {new Date(intro.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <p className="text-sm text-[#6B5B5E] mb-3">
                  {intro.message}
                </p>

                {intro.status === "meeting_scheduled" && intro.meetingDetails && (
                  <div className="bg-[#FFF8F0] rounded-lg p-3 border border-[#E3C4A8]">
                    <h5 className="text-sm font-semibold text-[#2D1318] mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C9956B]" />
                      Meeting Details
                    </h5>
                    <div className="text-sm text-[#6B5B5E] space-y-1">
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(intro.meetingDetails.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span> {intro.meetingDetails.time}
                      </p>
                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {intro.meetingDetails.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
