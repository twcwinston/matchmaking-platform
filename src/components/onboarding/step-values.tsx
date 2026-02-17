"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Heart, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const valuesSchema = z.object({
  religiousObservance: z.enum(["practicing", "moderate", "cultural"], {
    error: "Please select your religious observance level",
  }),
  genderRoles: z.enum(["traditional", "moderate", "egalitarian"], {
    error: "Please select your view on gender roles",
  }),
  financialManagement: z.enum(["joint", "separate", "hybrid"], {
    error: "Please select your financial management preference",
  }),
  decisionMaking: z.enum(["independent", "collaborative", "family-involved"], {
    error: "Please select your decision-making style",
  }),
  livingWithInLaws: z.enum(["yes", "open", "no"], {
    error: "Please select your stance on living with in-laws",
  }),
  workingAfterMarriage: z.enum(["must-work", "prefer-work", "flexible", "prefer-not", "no"], {
    error: "Please select your view on working after marriage",
  }),
});

export type ValuesValues = z.infer<typeof valuesSchema>;

interface StepValuesProps {
  defaultValues?: Partial<ValuesValues>;
  onNext: (data: ValuesValues) => void;
  onBack: () => void;
}

export function StepValues({ defaultValues, onNext, onBack }: StepValuesProps) {
  const form = useForm<ValuesValues>({
    resolver: zodResolver(valuesSchema),
    defaultValues: {
      religiousObservance: defaultValues?.religiousObservance,
      genderRoles: defaultValues?.genderRoles,
      financialManagement: defaultValues?.financialManagement,
      decisionMaking: defaultValues?.decisionMaking,
      livingWithInLaws: defaultValues?.livingWithInLaws,
      workingAfterMarriage: defaultValues?.workingAfterMarriage,
    },
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-rose mb-4">
          <Heart className="w-8 h-8 text-burgundy" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark">
          Values & Beliefs
        </h2>
        <p className="text-warm-gray mt-2 max-w-md mx-auto">
          These questions help us understand what matters most to you in a life partner.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
          {/* Religious Observance */}
          <FormField
            control={form.control}
            name="religiousObservance"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium text-base">
                  What role does faith play in your daily life?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    {[
                      {
                        value: "practicing",
                        label: "Practicing",
                        desc: "Faith is central to my daily life and decisions",
                      },
                      {
                        value: "moderate",
                        label: "Moderate",
                        desc: "I observe important practices but am not strictly religious",
                      },
                      {
                        value: "cultural",
                        label: "Cultural",
                        desc: "I identify with my faith culturally but don't actively practice",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-[12px] border-2 cursor-pointer transition-all ${
                          field.value === option.value
                            ? "border-burgundy bg-soft-rose/50"
                            : "border-gold-light hover:border-burgundy/50"
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="mt-0.5" />
                        <div>
                          <span className="font-medium text-dark">{option.label}</span>
                          <p className="text-sm text-warm-gray mt-0.5">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Roles */}
          <FormField
            control={form.control}
            name="genderRoles"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium text-base">
                  How do you view gender roles in marriage?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    {[
                      {
                        value: "traditional",
                        label: "Traditional",
                        desc: "Clear roles — husband as provider, wife as homemaker",
                      },
                      {
                        value: "moderate",
                        label: "Moderate",
                        desc: "Some traditional expectations with room for flexibility",
                      },
                      {
                        value: "egalitarian",
                        label: "Egalitarian",
                        desc: "Equal partnership with shared responsibilities",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-[12px] border-2 cursor-pointer transition-all ${
                          field.value === option.value
                            ? "border-burgundy bg-soft-rose/50"
                            : "border-gold-light hover:border-burgundy/50"
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="mt-0.5" />
                        <div>
                          <span className="font-medium text-dark">{option.label}</span>
                          <p className="text-sm text-warm-gray mt-0.5">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Financial Management */}
          <FormField
            control={form.control}
            name="financialManagement"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  How should finances be managed in marriage?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select your preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="joint">Joint — All finances combined</SelectItem>
                    <SelectItem value="separate">Separate — Each manages their own</SelectItem>
                    <SelectItem value="hybrid">Hybrid — Joint for shared expenses, some independence</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Decision Making */}
          <FormField
            control={form.control}
            name="decisionMaking"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  How do you prefer to make major life decisions?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select your style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="independent">
                      Independently — I like to decide for myself
                    </SelectItem>
                    <SelectItem value="collaborative">
                      Collaboratively — With my spouse as a team
                    </SelectItem>
                    <SelectItem value="family-involved">
                      Family-involved — I value input from extended family
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Living with In-Laws */}
          <FormField
            control={form.control}
            name="livingWithInLaws"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium text-base">
                  Are you open to living with in-laws?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-3"
                  >
                    {[
                      { value: "yes", label: "Yes", desc: "Happy to live together" },
                      { value: "open", label: "Open", desc: "Depends on situation" },
                      { value: "no", label: "No", desc: "Prefer separate living" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-col items-center p-4 rounded-[12px] border-2 cursor-pointer transition-all text-center ${
                          field.value === option.value
                            ? "border-burgundy bg-soft-rose/50"
                            : "border-gold-light hover:border-burgundy/50"
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="sr-only" />
                        <span className="font-medium text-dark">{option.label}</span>
                        <span className="text-xs text-warm-gray mt-1">{option.desc}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Working After Marriage */}
          <FormField
            control={form.control}
            name="workingAfterMarriage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  What are your views on working after marriage?
                </FormLabel>
                <FormDescription className="text-warm-gray text-sm mb-2">
                  For yourself or your partner, depending on the situation.
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select your view" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="must-work">Must continue career</SelectItem>
                    <SelectItem value="prefer-work">Prefer to work but flexible</SelectItem>
                    <SelectItem value="flexible">Completely flexible</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to work</SelectItem>
                    <SelectItem value="no">Should not work after marriage</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 h-12 border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white font-semibold rounded-[8px] transition-all"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-burgundy hover:bg-burgundy-dark text-white font-semibold rounded-[8px] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
