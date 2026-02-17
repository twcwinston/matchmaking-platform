"use client";

import { cn } from "@/lib/utils";
import { MapPin, Briefcase } from "lucide-react";
import { CompatibilityScore } from "./compatibility-score";
import { StatusBadge } from "./status-badge";
import Link from "next/link";
import type { Match } from "@/lib/mock-data";

interface MatchCardProps {
  match: Match;
  className?: string;
}

export function MatchCard({ match, className }: MatchCardProps) {
  const { profile, compatibilityScore, status } = match;

  return (
    <Link href={`/matches/${match.id}`}>
      <div
        className={cn(
          "group bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 overflow-hidden",
          "transition-all duration-200 ease-out",
          "hover:shadow-lg hover:-translate-y-1",
          "cursor-pointer",
          className
        )}
      >
        {/* Photo Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F5E0E8]">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Status badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {profile.isVerified && <StatusBadge type="verified" size="sm" />}
            {profile.isPremium && <StatusBadge type="premium" size="sm" />}
          </div>

          {/* Compatibility score */}
          <div className="absolute top-3 right-3">
            <CompatibilityScore score={compatibilityScore} size="sm" showLabel={false} />
          </div>

          {/* New badge */}
          {status === "new" && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-[#7B1E3A] text-white text-xs font-semibold px-2 py-1 rounded-full">
                New
              </span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-[#2D1318] font-serif truncate">
              {profile.name}, {profile.age}
            </h3>
          </div>

          <p className="text-sm text-[#6B5B5E] line-clamp-2 mb-3 min-h-[2.5rem]">
            {profile.headline}
          </p>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-[#6B5B5E]">
              <MapPin className="w-4 h-4 text-[#C9956B]" />
              <span className="truncate">{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B5B5E]">
              <Briefcase className="w-4 h-4 text-[#C9956B]" />
              <span className="truncate">{profile.occupation}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
