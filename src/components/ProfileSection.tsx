"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
}

export function ProfileSection({
  title,
  icon,
  children,
  defaultOpen = true,
  collapsible = true,
}: ProfileSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="bg-white border-gold-light/50">
      <CardHeader
        className={`${collapsible ? "cursor-pointer" : ""} py-4`}
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-dark">
            {icon && <span className="text-burgundy">{icon}</span>}
            {title}
          </CardTitle>
          {collapsible && (
            <span className="text-warm-gray">
              {isOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </span>
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0 pb-6">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string | string[] | React.ReactNode;
}

export function ProfileField({ label, value }: ProfileFieldProps) {
  const renderValue = () => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((v, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-soft-rose text-dark text-sm rounded-full"
            >
              {v}
            </span>
          ))}
        </div>
      );
    }
    return <span className="text-dark">{value}</span>;
  };

  return (
    <div className="py-2 border-b border-gold-light/30 last:border-0">
      <dt className="text-sm text-warm-gray mb-1">{label}</dt>
      <dd className="font-medium">{renderValue()}</dd>
    </div>
  );
}
