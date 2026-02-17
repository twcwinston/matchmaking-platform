"use client";

import { Heart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WhyYouMatchedProps {
  reasons: string[];
  compatibilityBreakdown?: {
    category: string;
    score: number;
    details: string;
  }[];
}

export function WhyYouMatched({ reasons, compatibilityBreakdown }: WhyYouMatchedProps) {
  return (
    <Card className="bg-gradient-to-br from-soft-rose to-white border-gold-light/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-burgundy">
          <Sparkles className="w-5 h-5" />
          Why You Matched
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Reasons */}
        <ul className="space-y-3">
          {reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
              <span className="text-sm text-dark">{reason}</span>
            </li>
          ))}
        </ul>

        {/* Compatibility Breakdown */}
        {compatibilityBreakdown && compatibilityBreakdown.length > 0 && (
          <div className="pt-4 border-t border-gold-light/50">
            <h4 className="text-sm font-medium text-dark mb-3">
              Compatibility Breakdown
            </h4>
            <div className="space-y-3">
              {compatibilityBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-warm-gray">
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-burgundy">
                      {item.score}%
                    </span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-burgundy to-gold rounded-full transition-all duration-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-warm-gray mt-1">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
