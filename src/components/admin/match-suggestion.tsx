'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Check,
  X,
  Heart,
  Users,
  Home,
  Smile,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from 'lucide-react';
import { Match, Profile } from '@/lib/mock-admin-data';
import { cn } from '@/lib/utils';

interface MatchSuggestionProps {
  match: Match;
  onApprove?: (id: string, notes: string) => void;
  onReject?: (id: string, notes: string) => void;
}

const dimensionIcons = {
  values: Heart,
  lifestyle: Users,
  family: Home,
  personality: Smile,
  practical: Briefcase,
};

const dimensionLabels = {
  values: 'Values Alignment',
  lifestyle: 'Lifestyle Compatibility',
  family: 'Family Expectations',
  personality: 'Personality Fit',
  practical: 'Practical Factors',
};

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-bold text-2xl mb-3">
        {profile.name.charAt(0)}
      </div>
      <h3 className="font-semibold text-[#2D1318]">{profile.name}</h3>
      <p className="text-sm text-[#6B5B5E]">{profile.age} years old</p>
      <p className="text-sm text-[#6B5B5E]">{profile.location}</p>
      <p className="text-xs text-[#6B5B5E] mt-1">{profile.occupation}</p>
      {profile.verificationStatus === 'verified' && (
        <Badge
          variant="outline"
          className="mt-2 bg-[#C9956B]/20 text-[#A67744] border-[#C9956B]"
        >
          <ShieldCheck className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      )}
    </div>
  );
}

function CompatibilityBar({
  dimension,
  score,
}: {
  dimension: keyof typeof dimensionIcons;
  score: number;
}) {
  const Icon = dimensionIcons[dimension];
  const label = dimensionLabels[dimension];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-[#C9956B]';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-400';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#F5E0E8] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#7B1E3A]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-[#2D1318] font-medium truncate">{label}</span>
          <span className="text-sm font-semibold text-[#2D1318]">{score}%</span>
        </div>
        <div className="h-2 bg-[#F5E0E8] rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', getScoreColor(score))}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function MatchSuggestion({ match, onApprove, onReject }: MatchSuggestionProps) {
  const [notes, setNotes] = useState(match.matchmakerNotes);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onApprove?.(match.id, notes);
    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onReject?.(match.id, notes);
    setIsProcessing(false);
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 70) return 'text-[#A67744] bg-[#C9956B]/20 border-[#C9956B]';
    if (score >= 50) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const statusColors = {
    suggested: 'bg-blue-100 text-blue-800 border-blue-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    sent: 'bg-purple-100 text-purple-800 border-purple-200',
    mutual: 'bg-pink-100 text-pink-800 border-pink-200',
    declined: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F5E0E8]/50 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-[#FFF8F0] border-b border-[#F5E0E8] flex items-center justify-between hover:bg-[#FFF8F0]/80 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center -space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-semibold border-2 border-white">
              {match.profile1.name.charAt(0)}
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C9956B]/30 flex items-center justify-center text-[#7B1E3A] font-semibold border-2 border-white">
              {match.profile2.name.charAt(0)}
            </div>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-[#2D1318]">
              {match.profile1.name} & {match.profile2.name}
            </h3>
            <p className="text-sm text-[#6B5B5E]">
              {match.profile1.age} & {match.profile2.age} years old
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className={cn('capitalize', statusColors[match.status])}
          >
            {match.status}
          </Badge>
          <div
            className={cn(
              'px-4 py-2 rounded-xl font-bold border',
              getOverallScoreColor(match.compatibilityScore)
            )}
          >
            {match.compatibilityScore}%
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#6B5B5E]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#6B5B5E]" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6">
          {/* Profiles Side by Side */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <ProfileCard profile={match.profile1} />
            <ProfileCard profile={match.profile2} />
          </div>

          {/* Heart Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="h-px bg-[#F5E0E8] flex-1" />
            <Heart className="w-6 h-6 text-[#7B1E3A] mx-4" />
            <div className="h-px bg-[#F5E0E8] flex-1" />
          </div>

          {/* Compatibility Breakdown */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#7B1E3A] uppercase tracking-wider mb-4">
              Compatibility Breakdown
            </h4>
            <div className="space-y-4">
              {(Object.keys(match.breakdown) as Array<keyof typeof match.breakdown>).map(
                (dimension) => (
                  <CompatibilityBar
                    key={dimension}
                    dimension={dimension}
                    score={match.breakdown[dimension]}
                  />
                )
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="text-sm font-medium text-[#2D1318] mb-2 block">
              Matchmaker Notes
            </label>
            <Textarea
              placeholder="Add notes about this match (why you're approving/rejecting, special considerations...)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border-[#E3C4A8] focus:border-[#7B1E3A] focus:ring-[#7B1E3A]/20 resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          {match.status === 'suggested' && (
            <div className="flex items-center gap-3">
              <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 bg-[#7B1E3A] hover:bg-[#5C1229] text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Approve Match
              </Button>
              <Button
                onClick={handleReject}
                disabled={isProcessing}
                variant="outline"
                className="flex-1 border-[#6B5B5E] text-[#6B5B5E] hover:bg-[#F5E0E8]"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
