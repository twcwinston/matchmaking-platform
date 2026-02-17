'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel = 'vs last month',
  className,
}: StatsCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-6 shadow-sm border border-[#F5E0E8]/50 hover:shadow-md transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#6B5B5E]">{title}</p>
          <p className="text-3xl font-bold text-[#2D1318] mt-2">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive && 'text-green-600',
                  isNegative && 'text-red-600',
                  !isPositive && !isNegative && 'text-[#6B5B5E]'
                )}
              >
                {isPositive && '+'}
                {trend}%
              </span>
              <span className="text-xs text-[#6B5B5E]">{trendLabel}</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-[#F5E0E8]">
          <Icon className="w-6 h-6 text-[#7B1E3A]" />
        </div>
      </div>
    </div>
  );
}
