"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Camera,
  Shield,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileSections } from "@/components/portal/profile-sections";
import { StatusBadge } from "@/components/portal/status-badge";
import { currentUser } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="p-4 lg:p-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#FECDD3]/50 overflow-hidden mb-8">
        {/* Cover gradient */}
        <div className="h-32 bg-gradient-to-r from-[#7B1E3A] to-[#9E3A55]" />

        <div className="px-6 pb-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <img
                src={currentUser.photoUrl}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#7B1E3A] text-white flex items-center justify-center shadow-lg hover:bg-[#5C1229] transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#2D1318]">
                      {currentUser.name}
                    </h1>
                    <div className="flex gap-2">
                      {currentUser.isVerified && <StatusBadge type="verified" />}
                      {currentUser.isPremium && <StatusBadge type="premium" />}
                    </div>
                  </div>
                  <p className="text-[#6B5B5E] mb-3">{currentUser.headline}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#6B5B5E]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C9956B]" />
                      <span>{currentUser.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#C9956B]" />
                      <span>{currentUser.occupation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#C9956B]" />
                      <span>{currentUser.education}</span>
                    </div>
                  </div>
                </div>

                <Link href="/profile/edit">
                  <Button className="bg-[#7B1E3A] hover:bg-[#5C1229] text-white rounded-lg">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mt-6 p-4 bg-[#FFF8F0] rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#2D1318]">Profile Completion</span>
              <span className="text-sm font-bold text-[#7B1E3A]">
                {currentUser.profileCompletion}%
              </span>
            </div>
            <div className="h-2 bg-[#F5E0E8] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7B1E3A] to-[#C9956B] rounded-full transition-all duration-500"
                style={{ width: `${currentUser.profileCompletion}%` }}
              />
            </div>
            {currentUser.profileCompletion < 100 && (
              <p className="text-xs text-[#6B5B5E] mt-2">
                Complete your profile to get 3x more matches. Add more photos and details!
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-[#F5E0E8] rounded-xl">
              <div className="text-2xl font-bold text-[#7B1E3A]">{currentUser.age}</div>
              <div className="text-xs text-[#6B5B5E]">Years Old</div>
            </div>
            <div className="text-center p-4 bg-[#F5E0E8] rounded-xl">
              <div className="text-2xl font-bold text-[#7B1E3A]">{currentUser.height}</div>
              <div className="text-xs text-[#6B5B5E]">Height</div>
            </div>
            <div className="text-center p-4 bg-[#F5E0E8] rounded-xl">
              <div className="flex items-center justify-center gap-1">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-lg font-bold text-emerald-600">
                  {currentUser.isVerified ? "Yes" : "No"}
                </span>
              </div>
              <div className="text-xs text-[#6B5B5E]">Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <ProfileSections profile={currentUser} isOwnProfile />

      {/* Upgrade to Premium */}
      {!currentUser.isPremium && (
        <div className="mt-8 bg-gradient-to-r from-[#C9956B] to-[#E3C4A8] rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">Upgrade to Premium</h3>
                <p className="text-white/80 text-sm">
                  Get priority matching, unlimited messages, and exclusive features.
                </p>
              </div>
            </div>
            <Button className="bg-white text-[#C9956B] hover:bg-white/90 rounded-lg">
              Learn More
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
