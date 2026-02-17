'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Smartphone,
  Building,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { Payment } from '@/lib/mock-admin-data';
import { cn } from '@/lib/utils';

interface PaymentTableProps {
  payments: Payment[];
}

interface PaymentStatsProps {
  payments: Payment[];
}

const statusStyles = {
  completed: 'bg-green-100 text-green-800 border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  refunded: 'bg-gray-100 text-gray-800 border-gray-200',
};

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  failed: XCircle,
  refunded: RotateCcw,
};

const methodIcons = {
  bkash: Smartphone,
  nagad: Smartphone,
  card: CreditCard,
  bank: Building,
};

const typeLabels = {
  signup: 'Signup Fee',
  premium: 'Premium Upgrade',
  success_fee: 'Success Fee',
};

export function PaymentStats({ payments }: PaymentStatsProps) {
  // Calculate stats
  const completedPayments = payments.filter((p) => p.status === 'completed');
  
  // Convert all to BDT for simplicity (rough conversion rates)
  const conversionRates: Record<string, number> = {
    BDT: 1,
    USD: 110,
    GBP: 140,
  };

  const totalRevenue = completedPayments.reduce((sum, p) => {
    const rate = conversionRates[p.currency] || 1;
    return sum + p.amount * rate;
  }, 0);

  const thisMonthPayments = completedPayments.filter((p) => {
    const paymentDate = new Date(p.date);
    const now = new Date();
    return (
      paymentDate.getMonth() === now.getMonth() &&
      paymentDate.getFullYear() === now.getFullYear()
    );
  });

  const thisMonthRevenue = thisMonthPayments.reduce((sum, p) => {
    const rate = conversionRates[p.currency] || 1;
    return sum + p.amount * rate;
  }, 0);

  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const pendingAmount = pendingPayments.reduce((sum, p) => {
    const rate = conversionRates[p.currency] || 1;
    return sum + p.amount * rate;
  }, 0);

  const signupFees = completedPayments.filter((p) => p.type === 'signup').length;
  const premiumUpgrades = completedPayments.filter((p) => p.type === 'premium').length;
  const successFees = completedPayments.filter((p) => p.type === 'success_fee').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[#6B5B5E]">Total Revenue</p>
            <p className="text-2xl font-bold text-[#2D1318] mt-1">
              {formatCurrency(totalRevenue)}
            </p>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              All time
            </p>
          </div>
          <div className="p-3 rounded-xl bg-green-100">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[#6B5B5E]">This Month</p>
            <p className="text-2xl font-bold text-[#2D1318] mt-1">
              {formatCurrency(thisMonthRevenue)}
            </p>
            <p className="text-xs text-[#6B5B5E] mt-1">
              {thisMonthPayments.length} transactions
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#F5E0E8]">
            <TrendingUp className="w-6 h-6 text-[#7B1E3A]" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[#6B5B5E]">Pending</p>
            <p className="text-2xl font-bold text-[#2D1318] mt-1">
              {formatCurrency(pendingAmount)}
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              <Clock className="w-3 h-3 inline mr-1" />
              {pendingPayments.length} awaiting
            </p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-100">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[#6B5B5E]">By Type</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm">
                <span className="text-[#6B5B5E]">Signups:</span>{' '}
                <span className="font-semibold text-[#2D1318]">{signupFees}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#6B5B5E]">Premium:</span>{' '}
                <span className="font-semibold text-[#2D1318]">{premiumUpgrades}</span>
              </p>
              <p className="text-sm">
                <span className="text-[#6B5B5E]">Success:</span>{' '}
                <span className="font-semibold text-[#C9956B]">{successFees}</span>
              </p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#C9956B]/20">
            <CreditCard className="w-6 h-6 text-[#C9956B]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentTable({ payments }: PaymentTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort by date descending
  const sortedPayments = [...filteredPayments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Paginate
  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
  const paginatedPayments = sortedPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      BDT: '৳',
      USD: '$',
      GBP: '£',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5B5E]" />
          <Input
            placeholder="Search by name or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#E3C4A8] focus:border-[#7B1E3A] focus:ring-[#7B1E3A]/20"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40 border-[#E3C4A8]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-40 border-[#E3C4A8]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="signup">Signup Fee</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="success_fee">Success Fee</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="border-[#E3C4A8] text-[#7B1E3A] hover:bg-[#F5E0E8]"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#F5E0E8]/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFF8F0] hover:bg-[#FFF8F0]">
              <TableHead className="text-[#2D1318] font-semibold">User</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Amount</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Type</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Method</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Date</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Reference</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayments.map((payment) => {
              const StatusIcon = statusIcons[payment.status];
              const MethodIcon = methodIcons[payment.method];

              return (
                <TableRow key={payment.id} className="hover:bg-[#FFF8F0]/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-semibold text-sm">
                        {payment.userName.charAt(0)}
                      </div>
                      <span className="font-medium text-[#2D1318]">{payment.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-[#2D1318]">
                    {formatAmount(payment.amount, payment.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-[#F5E0E8]/50 text-[#7B1E3A] border-[#F5E0E8]"
                    >
                      {typeLabels[payment.type]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[#6B5B5E]">
                      <MethodIcon className="w-4 h-4" />
                      <span className="capitalize">{payment.method}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#6B5B5E]">{formatDate(payment.date)}</TableCell>
                  <TableCell className="text-[#6B5B5E] font-mono text-xs">
                    {payment.reference}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn('capitalize', statusStyles[payment.status])}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6B5B5E]">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, sortedPayments.length)} of{' '}
          {sortedPayments.length} transactions
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-[#E3C4A8] hover:bg-[#F5E0E8]"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="icon"
              onClick={() => setCurrentPage(page)}
              className={cn(
                currentPage === page
                  ? 'bg-[#7B1E3A] hover:bg-[#5C1229]'
                  : 'border-[#E3C4A8] hover:bg-[#F5E0E8]'
              )}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-[#E3C4A8] hover:bg-[#F5E0E8]"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
