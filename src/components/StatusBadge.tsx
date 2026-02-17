"use client";

import { ShieldCheck, Clock, Crown, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type StatusType = 
  | "verified" 
  | "pending" 
  | "premium" 
  | "flagged" 
  | "paid" 
  | "unpaid"
  | "confirmed"
  | "declined";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
}

const statusConfig: Record<StatusType, {
  label: string;
  icon: React.ElementType;
  className: string;
}> = {
  verified: {
    label: "Verified",
    icon: ShieldCheck,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  premium: {
    label: "Premium",
    icon: Crown,
    className: "bg-gradient-to-r from-gold to-gold-light text-dark border-gold",
  },
  flagged: {
    label: "Flagged",
    icon: AlertTriangle,
    className: "bg-red-100 text-red-800 border-red-200",
  },
  paid: {
    label: "Paid",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  unpaid: {
    label: "Unpaid",
    icon: XCircle,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  declined: {
    label: "Declined",
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const sizeClasses = size === "sm" ? "text-xs py-0.5 px-2" : "text-sm py-1 px-3";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${sizeClasses} font-medium`}
    >
      <Icon className={`${iconSize} mr-1`} />
      {config.label}
    </Badge>
  );
}
