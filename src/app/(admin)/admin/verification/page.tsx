'use client';

import { useState } from 'react';
import { VerificationCard } from '@/components/admin/verification-card';
import { mockVerifications, Verification } from '@/lib/mock-admin-data';
import { ShieldCheck, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function VerificationPage() {
  const [verifications, setVerifications] = useState(mockVerifications);
  const [processedIds, setProcessedIds] = useState<Set<string>>(new Set());

  const handleApprove = (id: string, notes: string) => {
    setProcessedIds((prev) => new Set([...prev, id]));
    setVerifications((prev) => prev.filter((v) => v.id !== id));
    toast.success('Profile verification approved', {
      description: 'The user has been notified and their profile is now active.',
    });
  };

  const handleReject = (id: string, notes: string) => {
    setProcessedIds((prev) => new Set([...prev, id]));
    setVerifications((prev) => prev.filter((v) => v.id !== id));
    toast.error('Profile verification rejected', {
      description: 'The user has been notified to resubmit their documents.',
    });
  };

  const pendingCount = verifications.length;
  const approvedToday = processedIds.size;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2D1318] flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#7B1E3A]" />
            Verification Queue
          </h1>
          <p className="text-[#6B5B5E] mt-1">
            Review and verify user identity documents to activate their profiles.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Approved Today</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{approvedToday}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Rejected Today</span>
          </div>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F5E0E8]/50">
          <div className="flex items-center gap-2 text-[#6B5B5E] mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Flagged</span>
          </div>
          <p className="text-2xl font-bold text-[#6B5B5E]">0</p>
        </div>
      </div>

      {/* Verification Guidelines */}
      <div className="bg-[#F5E0E8]/30 rounded-2xl p-6 mb-8 border border-[#F5E0E8]">
        <h2 className="font-semibold text-[#7B1E3A] mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Verification Guidelines
        </h2>
        <ul className="grid md:grid-cols-2 gap-2 text-sm text-[#6B5B5E]">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            Name on document must match profile name
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            Photo should be clearly visible and match profile photos
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            Document should not be expired
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            All text and details should be legible
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            Reject if document appears altered or tampered
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            Reject if age doesn&apos;t match stated profile age
          </li>
        </ul>
      </div>

      {/* Verification Cards */}
      {verifications.length > 0 ? (
        <div className="space-y-6">
          {verifications.map((verification) => (
            <VerificationCard
              key={verification.id}
              verification={verification}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#F5E0E8]/50">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-[#2D1318] mb-2">
            All Caught Up!
          </h2>
          <p className="text-[#6B5B5E] max-w-md mx-auto">
            There are no pending verifications at the moment. New submissions will
            appear here automatically.
          </p>
          <Button
            variant="outline"
            className="mt-6 border-[#E3C4A8] text-[#7B1E3A] hover:bg-[#F5E0E8]"
          >
            View Verification History
          </Button>
        </div>
      )}
    </div>
  );
}
