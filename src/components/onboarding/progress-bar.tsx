"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Basic Info", short: "Basic" },
  { id: 2, name: "Education", short: "Career" },
  { id: 3, name: "Family", short: "Family" },
  { id: 4, name: "Values", short: "Values" },
  { id: 5, name: "Lifestyle", short: "Life" },
  { id: 6, name: "Personality", short: "You" },
  { id: 7, name: "Preferences", short: "Prefs" },
  { id: 8, name: "Photos", short: "Photos" },
  { id: 9, name: "Verify", short: "Verify" },
  { id: 10, name: "Review", short: "Review" },
];

interface ProgressBarProps {
  currentStep: number;
  completedSteps: number[];
}

export function ProgressBar({ currentStep, completedSteps }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Desktop Progress */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const isPast = step.id < currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                      isCompleted && "bg-gold text-white",
                      isCurrent && "bg-burgundy text-white ring-4 ring-burgundy/20",
                      !isCompleted && !isCurrent && "bg-soft-rose text-warm-gray"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium transition-colors",
                      isCurrent && "text-burgundy",
                      isCompleted && "text-gold-dark",
                      !isCompleted && !isCurrent && "text-warm-gray"
                    )}
                  >
                    {step.name}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 mt-[-1.5rem] transition-colors",
                      isPast || isCompleted ? "bg-gold" : "bg-rose-muted"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-dark">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-burgundy font-semibold">
            {steps[currentStep - 1].name}
          </span>
        </div>
        <div className="w-full bg-soft-rose rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-burgundy to-burgundy-light rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        {/* Step Indicators */}
        <div className="flex justify-between mt-2">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            return (
              <div
                key={step.id}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  isCompleted && "bg-gold",
                  isCurrent && "bg-burgundy",
                  !isCompleted && !isCurrent && "bg-rose-muted"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
