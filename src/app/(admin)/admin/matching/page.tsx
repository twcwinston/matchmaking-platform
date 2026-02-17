'use client';

import { useState } from 'react';
import { MatchSuggestion } from '@/components/admin/match-suggestion';
import {
  mockMatches,
  mockProfiles,
  Match,
  Profile,
} from '@/lib/mock-admin-data';
import {
  Heart,
  Search,
  Filter,
  Sparkles,
  User,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function MatchingPage() {
  const [matches, setMatches] = useState(mockMatches);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Get verified profiles for selection
  const verifiedProfiles = mockProfiles.filter(
    (p) => p.verificationStatus === 'verified' && p.status === 'active'
  );

  // Filter profiles by search
  const filteredProfiles = verifiedProfiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get matches for selected profile
  const profileMatches = selectedProfileId
    ? matches.filter(
        (m) =>
          m.profile1.id === selectedProfileId ||
          m.profile2.id === selectedProfileId
      )
    : matches.filter((m) => m.status === 'suggested');

  const handleApprove = (id: string, notes: string) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: 'approved' as const, matchmakerNotes: notes } : m
      )
    );
    toast.success('Match approved!', {
      description: 'This match has been added to the introduction queue.',
    });
  };

  const handleReject = (id: string, notes: string) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: 'declined' as const, matchmakerNotes: notes } : m
      )
    );
    toast.info('Match rejected', {
      description: 'This suggestion has been dismissed.',
    });
  };

  const selectedProfile = verifiedProfiles.find((p) => p.id === selectedProfileId);

  // Stats
  const suggestedCount = matches.filter((m) => m.status === 'suggested').length;
  const approvedCount = matches.filter((m) => m.status === 'approved').length;
  const mutualCount = matches.filter((m) => m.status === 'mutual').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2D1318] flex items-center gap-3">
            <Heart className="w-8 h-8 text-[#7B1E3A]" />
            AI Match Suggestions
          </h1>
          <p className="text-[#6B5B5E] mt-1">
            Review AI-generated match suggestions and approve the best fits.
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-[#7B1E3A] hover:bg-[#5C1229] text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate New Suggestions
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <p className="text-sm text-[#6B5B5E]">Pending Review</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{suggestedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <p className="text-sm text-[#6B5B5E]">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <p className="text-sm text-[#6B5B5E]">Mutual Interest</p>
          <p className="text-2xl font-bold text-[#7B1E3A] mt-1">{mutualCount}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Profile Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-[#F5E0E8]/50 overflow-hidden sticky top-8">
            <div className="px-4 py-3 bg-[#FFF8F0] border-b border-[#F5E0E8]">
              <h2 className="font-semibold text-[#2D1318] flex items-center gap-2">
                <User className="w-4 h-4 text-[#7B1E3A]" />
                Select Profile
              </h2>
            </div>
            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5B5E]" />
                <Input
                  placeholder="Search profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-sm border-[#E3C4A8]"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProfileId('')}
                className={cn(
                  'w-full justify-start text-sm mb-2',
                  !selectedProfileId && 'bg-[#F5E0E8] text-[#7B1E3A]'
                )}
              >
                All Suggestions
              </Button>
              <div className="max-h-[400px] overflow-y-auto space-y-1">
                {filteredProfiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfileId(profile.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors',
                      selectedProfileId === profile.id
                        ? 'bg-[#F5E0E8]'
                        : 'hover:bg-[#FFF8F0]'
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-semibold text-sm flex-shrink-0">
                      {profile.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2D1318] truncate">
                        {profile.name}
                      </p>
                      <p className="text-xs text-[#6B5B5E] truncate">
                        {profile.age} • {profile.gender === 'male' ? 'M' : 'F'}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B5B5E] flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Match Suggestions */}
        <div className="lg:col-span-3 space-y-6">
          {/* Selected Profile Header */}
          {selectedProfile && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-bold text-2xl">
                  {selectedProfile.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#2D1318]">
                      {selectedProfile.name}
                    </h2>
                    {selectedProfile.verificationStatus === 'verified' && (
                      <Badge
                        variant="outline"
                        className="bg-[#C9956B]/20 text-[#A67744] border-[#C9956B]"
                      >
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-[#6B5B5E]">
                    {selectedProfile.age} years old • {selectedProfile.location}
                  </p>
                  <p className="text-sm text-[#6B5B5E]">{selectedProfile.occupation}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#6B5B5E]">Match Suggestions</p>
                  <p className="text-2xl font-bold text-[#7B1E3A]">
                    {profileMatches.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Banner */}
          {!selectedProfile && (
            <div className="bg-gradient-to-r from-[#7B1E3A] to-[#9E3A55] rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    AI-Powered Match Suggestions
                  </h2>
                  <p className="text-white/80 text-sm">
                    Our AI analyzes values, lifestyle, personality, and practical
                    factors to suggest highly compatible matches. Review each
                    suggestion carefully and approve the ones you believe will lead
                    to meaningful connections.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Match Cards */}
          {profileMatches.length > 0 ? (
            profileMatches.map((match) => (
              <MatchSuggestion
                key={match.id}
                match={match}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#F5E0E8]/50">
              <Heart className="w-16 h-16 text-[#F5E0E8] mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-[#2D1318] mb-2">
                No Suggestions Available
              </h2>
              <p className="text-[#6B5B5E] max-w-md mx-auto">
                {selectedProfile
                  ? `No match suggestions are currently available for ${selectedProfile.name}. Generate new suggestions to find compatible matches.`
                  : 'Select a profile from the sidebar to view their match suggestions, or generate new AI suggestions.'}
              </p>
              <Button className="mt-6 bg-[#7B1E3A] hover:bg-[#5C1229] text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Suggestions
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
