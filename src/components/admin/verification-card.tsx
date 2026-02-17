'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Verification } from '@/lib/mock-admin-data';
import { cn } from '@/lib/utils';

interface VerificationCardProps {
  verification: Verification;
  onApprove?: (id: string, notes: string) => void;
  onReject?: (id: string, notes: string) => void;
}

export function VerificationCard({
  verification,
  onApprove,
  onReject,
}: VerificationCardProps) {
  const [notes, setNotes] = useState(verification.notes);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeSinceSubmission = (dateString: string) => {
    const submitted = new Date(dateString);
    const now = new Date();
    const hours = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    onApprove?.(verification.id, notes);
    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    onReject?.(verification.id, notes);
    setIsProcessing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F5E0E8]/50 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-[#FFF8F0] border-b border-[#F5E0E8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-bold text-lg">
              {verification.profileName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-[#2D1318]">{verification.profileName}</h3>
              <p className="text-sm text-[#6B5B5E]">
                {verification.profileAge} years old • {verification.profileGender === 'male' ? 'Male' : 'Female'}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#F5E0E8]">
        {/* Profile Info */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-[#7B1E3A] uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile Information
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#6B5B5E] w-24">ID:</span>
              <span className="text-[#2D1318] font-medium">{verification.profileId}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#6B5B5E] w-24">Name:</span>
              <span className="text-[#2D1318] font-medium">{verification.profileName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#6B5B5E] w-24">Age:</span>
              <span className="text-[#2D1318] font-medium">{verification.profileAge}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#6B5B5E] w-24">Gender:</span>
              <span className="text-[#2D1318] font-medium capitalize">
                {verification.profileGender}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#6B5B5E] w-24">Submitted:</span>
              <span className="text-[#2D1318] font-medium">
                {getTimeSinceSubmission(verification.submittedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-[#7B1E3A] uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Document ({verification.documentType.toUpperCase()})
          </h4>
          <div className="aspect-[3/2] bg-[#F5E0E8] rounded-xl flex items-center justify-center border-2 border-dashed border-[#C9956B]">
            <div className="text-center">
              <FileText className="w-12 h-12 text-[#7B1E3A] mx-auto mb-2" />
              <p className="text-sm text-[#6B5B5E]">
                {verification.documentType === 'nid' ? 'National ID Card' : 'Passport'}
              </p>
              <Button
                variant="link"
                className="text-[#7B1E3A] hover:text-[#5C1229] mt-2"
              >
                View Full Document
              </Button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[#6B5B5E]">
            <Calendar className="w-3 h-3" />
            Uploaded: {formatDate(verification.submittedAt)}
          </div>
        </div>
      </div>

      {/* Notes & Actions */}
      <div className="p-6 bg-[#FFF8F0]/50 border-t border-[#F5E0E8]">
        <div className="mb-4">
          <label className="text-sm font-medium text-[#2D1318] mb-2 block">
            Review Notes (Optional)
          </label>
          <Textarea
            placeholder="Add notes about this verification (visible to admin only)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border-[#E3C4A8] focus:border-[#7B1E3A] focus:ring-[#7B1E3A]/20 resize-none"
            rows={2}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleApprove}
            disabled={isProcessing}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          <Button
            onClick={handleReject}
            disabled={isProcessing}
            variant="outline"
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs text-[#6B5B5E]">
          <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
          <p>
            Please verify that the name and photo on the document match the profile
            information before approving.
          </p>
        </div>
      </div>
    </div>
  );
}
