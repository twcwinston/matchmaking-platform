"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  X,
  MessageCircle,
  Share2,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompatibilityScore, CompatibilityBreakdown } from "@/components/portal/compatibility-score";
import { WhyMatched } from "@/components/portal/why-matched";
import { ProfileSections } from "@/components/portal/profile-sections";
import { StatusBadge } from "@/components/portal/status-badge";
import { matches } from "@/lib/mock-data";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const match = matches.find((m) => m.id === id);

  if (!match) {
    return (
      <div className="p-4 lg:p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-serif font-bold text-[#2D1318] mb-2">Match not found</h2>
          <p className="text-[#6B5B5E] mb-6">This match may no longer be available.</p>
          <Link href="/matches">
            <Button className="bg-[#7B1E3A] hover:bg-[#5C1229] text-white rounded-lg">
              Back to Matches
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { profile, compatibilityScore, compatibilityBreakdown, whyMatched } = match;

  const handleInterest = () => {
    // In real app, this would call an API
    alert(`Interest expressed in ${profile.name}! The matchmaker will be notified.`);
  };

  const handlePass = () => {
    // In real app, this would call an API
    if (confirm(`Are you sure you want to pass on ${profile.name}?`)) {
      router.push("/matches");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Hero Section */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 h-80 bg-gradient-to-b from-[#7B1E3A]/10 to-transparent" />

        {/* Back Button */}
        <div className="relative z-10 p-4 lg:p-8">
          <Link
            href="/matches"
            className="inline-flex items-center gap-2 text-[#6B5B5E] hover:text-[#7B1E3A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Matches</span>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="relative z-10 px-4 lg:px-8 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg border border-[#FECDD3]/50 overflow-hidden">
              <div className="md:flex">
                {/* Photo Section */}
                <div className="md:w-2/5 relative">
                  <div className="aspect-[3/4] md:aspect-auto md:h-full">
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {profile.isVerified && <StatusBadge type="verified" />}
                    {profile.isPremium && <StatusBadge type="premium" />}
                  </div>
                </div>

                {/* Info Section */}
                <div className="md:w-3/5 p-6 lg:p-8">
                  <div className="flex flex-col h-full">
                    {/* Name & Basic Info */}
                    <div className="mb-6">
                      <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#2D1318] mb-2">
                        {profile.name}, {profile.age}
                      </h1>
                      <p className="text-lg text-[#6B5B5E] mb-4">{profile.headline}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-[#6B5B5E]">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C9956B]" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#C9956B]" />
                          <span>{profile.occupation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#C9956B]" />
                          <span>{profile.education}</span>
                        </div>
                      </div>
                    </div>

                    {/* Compatibility Score */}
                    <div className="flex items-center gap-6 mb-6 p-4 bg-[#FFF8F0] rounded-xl">
                      <CompatibilityScore score={compatibilityScore} size="lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#2D1318] mb-2">Compatibility Score</h3>
                        <CompatibilityBreakdown breakdown={compatibilityBreakdown} />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        onClick={handlePass}
                        variant="outline"
                        className="flex-1 border-[#6B5B5E] text-[#6B5B5E] hover:bg-[#F5E0E8] rounded-xl py-6"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Pass
                      </Button>
                      <Button
                        onClick={handleInterest}
                        className="flex-1 bg-[#7B1E3A] hover:bg-[#5C1229] text-white rounded-xl py-6"
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        I&apos;m Interested
                      </Button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-[#F5E0E8]">
                      <button className="flex items-center gap-2 text-sm text-[#6B5B5E] hover:text-[#7B1E3A] transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Ask Matchmaker
                      </button>
                      <button className="flex items-center gap-2 text-sm text-[#6B5B5E] hover:text-[#7B1E3A] transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                      <button className="flex items-center gap-2 text-sm text-[#6B5B5E] hover:text-[#7B1E3A] transition-colors">
                        <Flag className="w-4 h-4" />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 lg:px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Why Matched */}
            <div className="lg:col-span-1">
              <WhyMatched items={whyMatched} />
            </div>

            {/* Full Profile */}
            <div className="lg:col-span-2">
              <ProfileSections profile={profile} />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#FECDD3] p-4 z-30">
        <div className="flex gap-3">
          <Button
            onClick={handlePass}
            variant="outline"
            className="flex-1 border-[#6B5B5E] text-[#6B5B5E] rounded-xl"
          >
            <X className="w-5 h-5 mr-2" />
            Pass
          </Button>
          <Button
            onClick={handleInterest}
            className="flex-1 bg-[#7B1E3A] hover:bg-[#5C1229] text-white rounded-xl"
          >
            <Heart className="w-5 h-5 mr-2" />
            Interested
          </Button>
        </div>
      </div>

      {/* Bottom spacing for fixed CTA on mobile */}
      <div className="lg:hidden h-20" />
    </div>
  );
}
