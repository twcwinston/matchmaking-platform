'use client';

import { PaymentTable, PaymentStats } from '@/components/admin/payment-table';
import { mockPayments } from '@/lib/mock-admin-data';
import { CreditCard } from 'lucide-react';

export default function PaymentsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2D1318] flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-[#7B1E3A]" />
          Payments & Billing
        </h1>
        <p className="text-[#6B5B5E] mt-1">
          Track all transactions, manage billing, and view revenue reports.
        </p>
      </div>

      {/* Stats */}
      <PaymentStats payments={mockPayments} />

      {/* Payment Table */}
      <PaymentTable payments={mockPayments} />
    </div>
  );
}
