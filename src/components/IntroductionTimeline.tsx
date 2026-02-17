"use client";

import { Check, Circle, Clock } from "lucide-react";

interface TimelineEvent {
  date: string;
  event: string;
  status: "completed" | "current" | "upcoming";
}

interface IntroductionTimelineProps {
  events: TimelineEvent[];
}

export function IntroductionTimeline({ events }: IntroductionTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, idx) => {
        const isLast = idx === events.length - 1;
        
        return (
          <div key={idx} className="flex gap-4">
            {/* Icon & Line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  event.status === "completed"
                    ? "bg-green-100"
                    : event.status === "current"
                    ? "bg-burgundy"
                    : "bg-soft-rose"
                }`}
              >
                {event.status === "completed" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : event.status === "current" ? (
                  <Clock className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-warm-gray" />
                )}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 min-h-[24px] ${
                    event.status === "completed"
                      ? "bg-green-200"
                      : "bg-soft-rose"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-4">
              <p
                className={`font-medium ${
                  event.status === "current"
                    ? "text-burgundy"
                    : event.status === "completed"
                    ? "text-dark"
                    : "text-warm-gray"
                }`}
              >
                {event.event}
              </p>
              <p className="text-sm text-warm-gray mt-0.5">{event.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
