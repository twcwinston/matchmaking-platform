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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  UserX,
  ShieldCheck,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Profile } from '@/lib/mock-admin-data';
import { cn } from '@/lib/utils';

interface ProfileTableProps {
  profiles: Profile[];
}

const statusStyles = {
  active: 'bg-green-100 text-green-800 border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  suspended: 'bg-red-100 text-red-800 border-red-200',
};

const verificationStyles = {
  verified: 'bg-[#C9956B]/20 text-[#A67744] border-[#C9956B]',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  unsubmitted: 'bg-gray-100 text-gray-600 border-gray-200',
};

export function ProfileTable({ profiles }: ProfileTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Profile>('signupDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter profiles
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || profile.status === statusFilter;
    const matchesGender = genderFilter === 'all' || profile.gender === genderFilter;
    const matchesVerification =
      verificationFilter === 'all' || profile.verificationStatus === verificationFilter;

    return matchesSearch && matchesStatus && matchesGender && matchesVerification;
  });

  // Sort profiles
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Paginate
  const totalPages = Math.ceil(sortedProfiles.length / itemsPerPage);
  const paginatedProfiles = sortedProfiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof Profile) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5B5E]" />
          <Input
            placeholder="Search by name, email, or location..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger className="w-full md:w-40 border-[#E3C4A8]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Select value={verificationFilter} onValueChange={setVerificationFilter}>
          <SelectTrigger className="w-full md:w-44 border-[#E3C4A8]">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Verification</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="unsubmitted">Unsubmitted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#F5E0E8]/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFF8F0] hover:bg-[#FFF8F0]">
              <TableHead className="text-[#2D1318] font-semibold">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-[#7B1E3A]"
                >
                  Name
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-[#2D1318] font-semibold">
                <button
                  onClick={() => handleSort('age')}
                  className="flex items-center gap-1 hover:text-[#7B1E3A]"
                >
                  Age
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Gender</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Location</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Status</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">Verification</TableHead>
              <TableHead className="text-[#2D1318] font-semibold">
                <button
                  onClick={() => handleSort('signupDate')}
                  className="flex items-center gap-1 hover:text-[#7B1E3A]"
                >
                  Signup Date
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-[#2D1318] font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProfiles.map((profile) => (
              <TableRow key={profile.id} className="hover:bg-[#FFF8F0]/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5E0E8] flex items-center justify-center text-[#7B1E3A] font-semibold">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[#2D1318]">{profile.name}</p>
                      <p className="text-sm text-[#6B5B5E]">{profile.occupation}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[#2D1318]">{profile.age}</TableCell>
                <TableCell className="text-[#2D1318] capitalize">{profile.gender}</TableCell>
                <TableCell className="text-[#6B5B5E]">{profile.location}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn('capitalize', statusStyles[profile.status])}
                  >
                    {profile.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn('capitalize', verificationStyles[profile.verificationStatus])}
                  >
                    {profile.verificationStatus === 'verified' && (
                      <ShieldCheck className="w-3 h-3 mr-1" />
                    )}
                    {profile.verificationStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-[#6B5B5E]">
                  {formatDate(profile.signupDate)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4 text-[#6B5B5E]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Verify
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        <UserX className="w-4 h-4 mr-2" />
                        Suspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6B5B5E]">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, sortedProfiles.length)} of{' '}
          {sortedProfiles.length} profiles
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
