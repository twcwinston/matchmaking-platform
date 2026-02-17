'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Send,
  Heart,
  Sparkles,
  User,
  Briefcase,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { Match, Profile, Introduction } from '@/lib/mock-admin-data';
import { cn } from '@/lib/utils';

interface IntroductionFormProps {
  matches: Match[];
  onSend?: (matchId: string, message: string) => void;
}

interface IntroductionListProps {
  introductions: Introduction[];
}

function ProfileMiniCard({ profile }: { profile: Profile }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#FFF8F0] rounded-xl">
      <div className="w-12 h-12 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-bold text-lg">
        {profile.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[#2D1318] truncate">{profile.name}</h4>
          {profile.verificationStatus === 'verified' && (
            <ShieldCheck className="w-4 h-4 text-[#C9956B]" />
          )}
        </div>
        <p className="text-sm text-[#6B5B5E] truncate">{profile.age} • {profile.location}</p>
      </div>
    </div>
  );
}

export function IntroductionForm({ matches, onSend }: IntroductionFormProps) {
  const [selectedMatchId, setSelectedMatchId] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const selectedMatch = matches.find((m) => m.id === selectedMatchId);

  // Only show approved matches that haven't been introduced yet
  const availableMatches = matches.filter(
    (m) => m.status === 'approved' || m.status === 'mutual'
  );

  const generateIntroMessage = () => {
    if (!selectedMatch) return;

    const p1 = selectedMatch.profile1;
    const p2 = selectedMatch.profile2;
    const score = selectedMatch.compatibilityScore;

    const template = `Assalamu Alaikum ${p1.name} and ${p2.name}!

I am delighted to introduce you both. Your compatibility score of ${score}% reflects strong alignment across several key areas.

${p1.name}, ${p1.age}, is a ${p1.occupation.toLowerCase()} based in ${p1.location}.
${p2.name}, ${p2.age}, is a ${p2.occupation.toLowerCase()} based in ${p2.location}.

What makes this match special:
• Strong values alignment (${selectedMatch.breakdown.values}%)
• Compatible lifestyle preferences (${selectedMatch.breakdown.lifestyle}%)
• Aligned family expectations (${selectedMatch.breakdown.family}%)

I believe you'll find meaningful conversations ahead. Please take time to review each other's profiles and let me know if you'd like to proceed.

Warm regards,
Your Matchmaker`;

    setMessage(template);
  };

  const handleSend = async () => {
    if (!selectedMatchId || !message) return;

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSend?.(selectedMatchId, message);
    setMessage('');
    setSelectedMatchId('');
    setIsSending(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F5E0E8]/50 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-[#FFF8F0] border-b border-[#F5E0E8]">
        <h3 className="font-semibold text-[#2D1318] flex items-center gap-2">
          <Send className="w-5 h-5 text-[#7B1E3A]" />
          Create New Introduction
        </h3>
        <p className="text-sm text-[#6B5B5E] mt-1">
          Send a personalized introduction to a matched pair
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Match Selection */}
        <div>
          <label className="text-sm font-medium text-[#2D1318] mb-2 block">
            Select Match
          </label>
          <Select value={selectedMatchId} onValueChange={setSelectedMatchId}>
            <SelectTrigger className="w-full border-[#E3C4A8]">
              <SelectValue placeholder="Choose a match to introduce..." />
            </SelectTrigger>
            <SelectContent>
              {availableMatches.length === 0 ? (
                <SelectItem value="none" disabled>
                  No approved matches available
                </SelectItem>
              ) : (
                availableMatches.map((match) => (
                  <SelectItem key={match.id} value={match.id}>
                    {match.profile1.name} & {match.profile2.name} ({match.compatibilityScore}%)
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Match Preview */}
        {selectedMatch && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <ProfileMiniCard profile={selectedMatch.profile1} />
              <ProfileMiniCard profile={selectedMatch.profile2} />
            </div>

            {/* Compatibility Summary */}
            <div className="p-4 bg-[#F5E0E8]/30 rounded-xl">
              <h4 className="text-sm font-semibold text-[#7B1E3A] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Compatibility Highlights
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {(
                  Object.entries(selectedMatch.breakdown) as [string, number][]
                ).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className={cn(
                        'text-lg font-bold',
                        value >= 85
                          ? 'text-green-600'
                          : value >= 70
                          ? 'text-[#C9956B]'
                          : 'text-[#6B5B5E]'
                      )}
                    >
                      {value}%
                    </div>
                    <div className="text-xs text-[#6B5B5E] capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Composer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#2D1318]">
                  Introduction Message
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateIntroMessage}
                  className="text-[#7B1E3A] hover:text-[#5C1229] hover:bg-[#F5E0E8]"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Generate Template
                </Button>
              </div>
              <Textarea
                placeholder="Write a personalized introduction message for both parties..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-[#E3C4A8] focus:border-[#7B1E3A] focus:ring-[#7B1E3A]/20 resize-none min-h-[200px]"
                rows={8}
              />
              <p className="text-xs text-[#6B5B5E] mt-2">
                This message will be sent to both {selectedMatch.profile1.name} and{' '}
                {selectedMatch.profile2.name}
              </p>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={isSending || !message.trim()}
              className="w-full bg-[#7B1E3A] hover:bg-[#5C1229] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSending ? 'Sending...' : 'Send Introduction'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// Introduction List Component
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  sent: 'bg-blue-100 text-blue-800 border-blue-200',
  accepted_one: 'bg-purple-100 text-purple-800 border-purple-200',
  accepted_both: 'bg-green-100 text-green-800 border-green-200',
  declined: 'bg-gray-100 text-gray-800 border-gray-200',
  completed: 'bg-[#C9956B]/20 text-[#A67744] border-[#C9956B]',
};

const statusLabels = {
  pending: 'Pending',
  sent: 'Sent',
  accepted_one: 'One Accepted',
  accepted_both: 'Both Accepted',
  declined: 'Declined',
  completed: 'Completed',
};

export function IntroductionList({ introductions }: IntroductionListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F5E0E8]/50 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-[#FFF8F0] border-b border-[#F5E0E8]">
        <h3 className="font-semibold text-[#2D1318] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#7B1E3A]" />
          Introduction History
        </h3>
      </div>

      <div className="divide-y divide-[#F5E0E8]">
        {introductions.length === 0 ? (
          <div className="p-8 text-center">
            <Heart className="w-12 h-12 text-[#F5E0E8] mx-auto mb-3" />
            <p className="text-[#6B5B5E]">No introductions yet</p>
          </div>
        ) : (
          introductions.map((intro) => (
            <div
              key={intro.id}
              className="p-4 hover:bg-[#FFF8F0]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-semibold text-sm border-2 border-white">
                      {intro.match.profile1.name.charAt(0)}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#C9956B]/30 flex items-center justify-center text-[#7B1E3A] font-semibold text-sm border-2 border-white">
                      {intro.match.profile2.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-[#2D1318] text-sm">
                      {intro.match.profile1.name} & {intro.match.profile2.name}
                    </p>
                    <p className="text-xs text-[#6B5B5E]">
                      Sent {formatDate(intro.sentAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn('capitalize text-xs', statusColors[intro.status])}
                  >
                    {statusLabels[intro.status]}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-[#6B5B5E]" />
                </div>
              </div>
              {intro.outcome && (
                <p className="text-xs text-[#6B5B5E] mt-2 ml-14 italic">
                  Outcome: {intro.outcome}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
