'use client';

import { ProfileTable } from '@/components/admin/profile-table';
import { mockProfiles } from '@/lib/mock-admin-data';
import { Users, UserPlus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilesPage() {
  // Calculate stats
  const totalProfiles = mockProfiles.length;
  const activeProfiles = mockProfiles.filter((p) => p.status === 'active').length;
  const pendingProfiles = mockProfiles.filter((p) => p.status === 'pending').length;
  const verifiedProfiles = mockProfiles.filter(
    (p) => p.verificationStatus === 'verified'
  ).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2D1318] flex items-center gap-3">
            <Users className="w-8 h-8 text-[#7B1E3A]" />
            Profile Management
          </h1>
          <p className="text-[#6B5B5E] mt-1">
            Manage all user profiles, verification status, and account settings.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="border-[#E3C4A8] text-[#7B1E3A] hover:bg-[#F5E0E8]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#7B1E3A] hover:bg-[#5C1229] text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Profile
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <p className="text-sm text-[#6B5B5E]">Total Profiles</p>
          <p className="text-2xl font-bold text-[#2D1318] mt-1">{totalProfiles}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <p className="text-sm text-[#6B5B5E]">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{activeProfiles}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <p className="text-sm text-[#6B5B5E]">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingProfiles}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <p className="text-sm text-[#6B5B5E]">Verified</p>
          <p className="text-2xl font-bold text-[#C9956B] mt-1">{verifiedProfiles}</p>
        </div>
      </div>

      {/* Profile Table */}
      <ProfileTable profiles={mockProfiles} />
    </div>
  );
}
