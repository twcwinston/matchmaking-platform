'use client';

import { useState } from 'react';
import { IntroductionForm, IntroductionList } from '@/components/admin/introduction-form';
import { mockMatches, mockIntroductions, Introduction } from '@/lib/mock-admin-data';
import {
  MessageSquareHeart,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function IntroductionsPage() {
  const [introductions, setIntroductions] = useState(mockIntroductions);

  const handleSendIntroduction = (matchId: string, message: string) => {
    const match = mockMatches.find((m) => m.id === matchId);
    if (!match) return;

    const newIntroduction: Introduction = {
      id: `i${Date.now()}`,
      match: match,
      status: 'sent',
      message,
      sentAt: new Date().toISOString(),
      respondedAt: null,
      outcome: null,
    };

    setIntroductions((prev) => [newIntroduction, ...prev]);
    toast.success('Introduction sent!', {
      description: `Both ${match.profile1.name} and ${match.profile2.name} have been notified.`,
    });
  };

  // Stats
  const sentCount = introductions.filter((i) => i.status === 'sent').length;
  const pendingCount = introductions.filter((i) => i.status === 'pending').length;
  const acceptedCount = introductions.filter(
    (i) => i.status === 'accepted_one' || i.status === 'accepted_both'
  ).length;
  const completedCount = introductions.filter((i) => i.status === 'completed').length;
  const declinedCount = introductions.filter((i) => i.status === 'declined').length;

  // Get approved matches that can be introduced
  const availableMatches = mockMatches.filter(
    (m) =>
      (m.status === 'approved' || m.status === 'mutual') &&
      !introductions.some((i) => i.match.id === m.id)
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2D1318] flex items-center gap-3">
            <MessageSquareHeart className="w-8 h-8 text-[#7B1E3A]" />
            Introduction Manager
          </h1>
          <p className="text-[#6B5B5E] mt-1">
            Create personalized introductions and track their progress.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <Send className="w-4 h-4" />
            <span className="text-sm">Sent</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{sentCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Accepted</span>
          </div>
          <p className="text-2xl font-bold text-pink-600">{acceptedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{completedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Declined</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">{declinedCount}</p>
        </div>
      </div>

      {/* Success Rate Banner */}
      <div className="bg-gradient-to-r from-[#C9956B] to-[#E3C4A8] rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Introduction Success Rate
              </h2>
              <p className="text-white/80 text-sm">
                Based on introductions that led to mutual interest
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-white">67%</p>
            <p className="text-white/80 text-sm">+12% this month</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="bg-[#F5E0E8]/50 p-1">
          <TabsTrigger
            value="create"
            className="data-[state=active]:bg-white data-[state=active]:text-[#7B1E3A]"
          >
            Create Introduction
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-white data-[state=active]:text-[#7B1E3A]"
          >
            Introduction History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <div className="grid lg:grid-cols-2 gap-6">
            <IntroductionForm
              matches={[...availableMatches, ...mockMatches.filter((m) => m.status === 'approved' || m.status === 'mutual')]}
              onSend={handleSendIntroduction}
            />
            <div className="space-y-6">
              {/* Tips Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50">
                <h3 className="font-semibold text-[#2D1318] mb-4">
                  Introduction Tips
                </h3>
                <ul className="space-y-3 text-sm text-[#6B5B5E]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Personalize each introduction with specific compatibility points
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Highlight shared values and lifestyle preferences
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Suggest conversation starters based on common interests
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Keep the tone warm, professional, and encouraging
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Mention the compatibility score to build confidence
                  </li>
                </ul>
              </div>

              {/* Ready to Introduce */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50">
                <h3 className="font-semibold text-[#2D1318] mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#7B1E3A]" />
                  Ready to Introduce
                </h3>
                {availableMatches.length > 0 ? (
                  <div className="space-y-3">
                    {availableMatches.slice(0, 3).map((match) => (
                      <div
                        key={match.id}
                        className="flex items-center justify-between p-3 bg-[#FFF8F0] rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-semibold text-sm border-2 border-white">
                              {match.profile1.name.charAt(0)}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#C9956B]/30 flex items-center justify-center text-[#7B1E3A] font-semibold text-sm border-2 border-white">
                              {match.profile2.name.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#2D1318]">
                              {match.profile1.name.split(' ')[0]} &{' '}
                              {match.profile2.name.split(' ')[0]}
                            </p>
                            <p className="text-xs text-[#6B5B5E]">
                              {match.compatibilityScore}% compatible
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#6B5B5E] text-center py-4">
                    No approved matches waiting for introduction
                  </p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <IntroductionList introductions={introductions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
