"use client";

import { cn } from "@/lib/utils";
import {
  User,
  GraduationCap,
  Briefcase,
  Home,
  Heart,
  Sparkles,
  Camera,
  MapPin,
  Calendar,
  Ruler,
  BookOpen,
  Users,
  Target,
} from "lucide-react";
import type { UserProfile } from "@/lib/mock-data";

interface ProfileSectionsProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
  className?: string;
}

export function ProfileSections({ profile, isOwnProfile = false, className }: ProfileSectionsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* About Section */}
      <ProfileSection title="About" icon={User}>
        <p className="text-[#6B5B5E] leading-relaxed">{profile.about}</p>
      </ProfileSection>

      {/* Basic Info */}
      <ProfileSection title="Basic Information" icon={User}>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem label="Age" value={`${profile.age} years`} icon={Calendar} />
          <InfoItem label="Height" value={profile.height} icon={Ruler} />
          <InfoItem label="Location" value={profile.location} icon={MapPin} />
          <InfoItem label="Religion" value={profile.religion} icon={BookOpen} />
        </div>
      </ProfileSection>

      {/* Education & Career */}
      <ProfileSection title="Education & Career" icon={GraduationCap}>
        <div className="space-y-3">
          <InfoItem 
            label="Education" 
            value={profile.education} 
            icon={GraduationCap}
            fullWidth
          />
          <InfoItem 
            label="Occupation" 
            value={profile.occupation} 
            icon={Briefcase}
            fullWidth
          />
        </div>
      </ProfileSection>

      {/* Family Background */}
      <ProfileSection title="Family Background" icon={Home}>
        <div className="space-y-3">
          <InfoItem 
            label="Family Type" 
            value={profile.familyType} 
            icon={Home}
          />
          <InfoItem 
            label="Father's Occupation" 
            value={profile.familyBackground.fatherOccupation} 
            icon={Briefcase}
          />
          <InfoItem 
            label="Mother's Occupation" 
            value={profile.familyBackground.motherOccupation} 
            icon={Briefcase}
          />
          <InfoItem 
            label="Siblings" 
            value={profile.familyBackground.siblings} 
            icon={Users}
          />
        </div>
      </ProfileSection>

      {/* Values */}
      <ProfileSection title="Values & Beliefs" icon={Heart}>
        <div className="flex flex-wrap gap-2">
          {profile.values.map((value, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-[#F5E0E8] text-[#7B1E3A] rounded-full text-sm font-medium"
            >
              {value}
            </span>
          ))}
        </div>
      </ProfileSection>

      {/* Interests */}
      <ProfileSection title="Interests & Hobbies" icon={Sparkles}>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-[#FFF8F0] border border-[#E3C4A8] text-[#6B5B5E] rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </ProfileSection>

      {/* Lifestyle */}
      <ProfileSection title="Lifestyle" icon={Sparkles}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFF8F0] rounded-xl p-4">
            <p className="text-xs text-[#6B5B5E] mb-1">Daily Routine</p>
            <p className="font-medium text-[#2D1318]">{profile.lifestyle.routine}</p>
          </div>
          <div className="bg-[#FFF8F0] rounded-xl p-4">
            <p className="text-xs text-[#6B5B5E] mb-1">Social Style</p>
            <p className="font-medium text-[#2D1318]">{profile.lifestyle.socialStyle}</p>
          </div>
          <div className="bg-[#FFF8F0] rounded-xl p-4">
            <p className="text-xs text-[#6B5B5E] mb-1">Diet</p>
            <p className="font-medium text-[#2D1318]">{profile.lifestyle.diet}</p>
          </div>
        </div>
      </ProfileSection>

      {/* Partner Preferences */}
      <ProfileSection title="Partner Preferences" icon={Target}>
        <div className="space-y-3">
          <InfoItem 
            label="Preferred Age Range" 
            value={profile.partnerPreferences.ageRange} 
          />
          <InfoItem 
            label="Minimum Education" 
            value={profile.partnerPreferences.educationMin} 
          />
          <InfoItem 
            label="Location Preference" 
            value={profile.partnerPreferences.locationPreference} 
          />
        </div>
      </ProfileSection>

      {/* Photos */}
      {profile.photos.length > 1 && (
        <ProfileSection title="Photos" icon={Camera}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {profile.photos.map((photo, index) => (
              <div 
                key={index}
                className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5E0E8]"
              >
                <img
                  src={photo}
                  alt={`${profile.name} photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </ProfileSection>
      )}
    </div>
  );
}

interface ProfileSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}

function ProfileSection({ title, icon: Icon, children, className }: ProfileSectionProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 p-6", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-[#C9956B]" />
        <h3 className="text-lg font-semibold text-[#2D1318] font-serif">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  fullWidth?: boolean;
}

function InfoItem({ label, value, icon: Icon, fullWidth = false }: InfoItemProps) {
  return (
    <div className={cn("flex items-start gap-3", fullWidth ? "col-span-2" : "")}>
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-[#F5E0E8] flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-[#7B1E3A]" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#6B5B5E] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[#2D1318]">{value}</p>
      </div>
    </div>
  );
}
