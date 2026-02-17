"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Sparkles, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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

const personalitySchema = z.object({
  threeWords: z.string().min(5, "Please describe yourself in 3 words"),
  communicationStyle: z.enum(["direct", "diplomatic", "reserved", "expressive"], {
    error: "Please select your communication style",
  }),
  conflictResolution: z.enum(["discuss-immediately", "cool-off-first", "avoid-conflict", "compromise"], {
    error: "Please select your conflict resolution approach",
  }),
  loveLanguage: z.enum(["words", "quality-time", "gifts", "acts", "touch"], {
    error: "Please select your love language",
  }),
  selfDescription: z.string().min(50, "Please write at least 50 characters about yourself").max(500, "Please keep it under 500 characters"),
});

export type PersonalityValues = z.infer<typeof personalitySchema>;

interface StepPersonalityProps {
  defaultValues?: Partial<PersonalityValues>;
  onNext: (data: PersonalityValues) => void;
  onBack: () => void;
}

export function StepPersonality({ defaultValues, onNext, onBack }: StepPersonalityProps) {
  const form = useForm<PersonalityValues>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      threeWords: defaultValues?.threeWords || "",
      communicationStyle: defaultValues?.communicationStyle,
      conflictResolution: defaultValues?.conflictResolution,
      loveLanguage: defaultValues?.loveLanguage,
      selfDescription: defaultValues?.selfDescription || "",
    },
  });

  const selfDescription = form.watch("selfDescription");

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-rose mb-4">
          <Sparkles className="w-8 h-8 text-burgundy" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark">
          Your Personality
        </h2>
        <p className="text-warm-gray mt-2 max-w-md mx-auto">
          Help potential matches understand who you really are beyond the basics.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
          {/* Three Words */}
          <FormField
            control={form.control}
            name="threeWords"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  How would your closest friend describe you in 3 words?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Kind, ambitious, funny"
                    className="h-12 border-gold-light focus:border-burgundy"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-warm-gray text-sm">
                  Be honest — these words say a lot about you!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Communication Style */}
          <FormField
            control={form.control}
            name="communicationStyle"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium text-base">
                  How do you prefer to communicate?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-3"
                  >
                    {[
                      { value: "direct", label: "Direct", desc: "I say what I mean clearly" },
                      { value: "diplomatic", label: "Diplomatic", desc: "I'm thoughtful and tactful" },
                      { value: "reserved", label: "Reserved", desc: "I take time to open up" },
                      { value: "expressive", label: "Expressive", desc: "I share feelings openly" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-col p-4 rounded-[12px] border-2 cursor-pointer transition-all ${
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

          {/* Conflict Resolution */}
          <FormField
            control={form.control}
            name="conflictResolution"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  When you disagree with someone you care about, you usually...
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select your approach" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="discuss-immediately">
                      Discuss it right away — I like to resolve things quickly
                    </SelectItem>
                    <SelectItem value="cool-off-first">
                      Take time to cool off — Then discuss when calm
                    </SelectItem>
                    <SelectItem value="avoid-conflict">
                      Tend to avoid conflict — Peace is important to me
                    </SelectItem>
                    <SelectItem value="compromise">
                      Look for compromise — Finding middle ground is key
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Love Language */}
          <FormField
            control={form.control}
            name="loveLanguage"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium text-base">
                  What&apos;s your primary love language?
                </FormLabel>
                <FormDescription className="text-warm-gray text-sm">
                  How do you most like to give and receive love?
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    {[
                      {
                        value: "words",
                        label: "Words of Affirmation",
                        desc: "Compliments, encouragement, and \"I love you\"s",
                      },
                      {
                        value: "quality-time",
                        label: "Quality Time",
                        desc: "Undivided attention and meaningful moments together",
                      },
                      {
                        value: "gifts",
                        label: "Receiving Gifts",
                        desc: "Thoughtful presents that show you were thinking of them",
                      },
                      {
                        value: "acts",
                        label: "Acts of Service",
                        desc: "Actions that make life easier — cooking, helping, doing",
                      },
                      {
                        value: "touch",
                        label: "Physical Touch",
                        desc: "Hugs, holding hands, and physical closeness",
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

          {/* Self Description */}
          <FormField
            control={form.control}
            name="selfDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  Tell us about yourself
                </FormLabel>
                <FormDescription className="text-warm-gray text-sm mb-2">
                  What makes you unique? What are you passionate about? What are you looking for in life?
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Share a bit about who you are, your values, what brings you joy, and what you're hoping to find in a life partner..."
                    className="min-h-[150px] border-gold-light focus:border-burgundy resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between text-sm">
                  <FormMessage />
                  <span className={`${selfDescription.length > 450 ? "text-warning" : "text-warm-gray"}`}>
                    {selfDescription.length}/500
                  </span>
                </div>
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
