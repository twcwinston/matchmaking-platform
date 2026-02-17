"use client";

import Link from "next/link";
import { Heart, MapPin, GraduationCap, Briefcase, ShieldCheck, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompatibilityScore } from "./CompatibilityScore";

interface MatchCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    occupation: string;
    education: string;
    headline: string;
    compatibilityScore: number;
    photos: string[];
    verified: boolean;
    premium: boolean;
    matchReasons?: string[];
  };
  showActions?: boolean;
  onInterest?: () => void;
  onPass?: () => void;
}

export function MatchCard({
  profile,
  showActions = true,
  onInterest,
  onPass,
}: MatchCardProps) {
  return (
    <Card className="group overflow-hidden bg-white border-gold-light/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Photo Section */}
      <div className="relative aspect-[4/5] bg-soft-rose overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/60" />
        
        {/* Placeholder image - in real app, use next/image */}
        <div className="w-full h-full bg-gradient-to-br from-burgundy-light/30 to-gold-light/30 flex items-center justify-center">
          <span className="text-6xl font-serif text-burgundy/30">
            {profile.name.charAt(0)}
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {profile.verified && (
            <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {profile.premium && (
            <Badge className="bg-gradient-to-r from-gold to-gold-light text-dark text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>

        {/* Compatibility Score */}
        <div className="absolute top-3 right-3">
          <CompatibilityScore score={profile.compatibilityScore} size="sm" />
        </div>

        {/* Name & Basic Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-serif text-xl font-semibold">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-white/90 text-sm mt-1">{profile.headline}</p>
        </div>
      </div>

      {/* Details Section */}
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2 text-sm text-warm-gray">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-burgundy" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-burgundy" />
            <span>{profile.occupation}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-burgundy" />
            <span>{profile.education}</span>
          </div>
        </div>

        {/* Why You Matched */}
        {profile.matchReasons && profile.matchReasons.length > 0 && (
          <div className="pt-3 border-t border-gold-light/50">
            <p className="text-xs font-medium text-burgundy mb-2">
              Why you matched:
            </p>
            <ul className="space-y-1">
              {profile.matchReasons.slice(0, 2).map((reason, idx) => (
                <li key={idx} className="text-xs text-warm-gray flex items-start gap-2">
                  <Heart className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="pt-3 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-warm-gray/30 text-warm-gray hover:bg-soft-rose"
              onClick={onPass}
            >
              Not for me
            </Button>
            <Button
              className="flex-1 bg-burgundy hover:bg-burgundy-dark"
              onClick={onInterest}
            >
              <Heart className="w-4 h-4 mr-2" />
              Interested
            </Button>
          </div>
        )}

        {/* View Full Profile Link */}
        <Link
          href={`/portal/matches/${profile.id}`}
          className="block text-center text-sm text-burgundy hover:text-burgundy-dark font-medium pt-2"
        >
          View Full Profile
        </Link>
      </CardContent>
    </Card>
  );
}
