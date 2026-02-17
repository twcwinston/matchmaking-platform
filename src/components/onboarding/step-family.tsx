"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Users, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
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

const familySchema = z.object({
  familyType: z.enum(["nuclear", "joint", "extended"], {
    error: "Please select your family type",
  }),
  fatherOccupation: z.string().min(2, "Please enter your father's occupation"),
  motherOccupation: z.string().min(2, "Please enter your mother's occupation"),
  siblingsCount: z.string().min(1, "Please select number of siblings"),
  siblingsMarried: z.string().optional(),
  religiousPractice: z.enum(["practicing", "moderate", "cultural"], {
    error: "Please select your family's religious practice level",
  }),
  socioeconomic: z.string().optional(),
});

export type FamilyValues = z.infer<typeof familySchema>;

interface StepFamilyProps {
  defaultValues?: Partial<FamilyValues>;
  onNext: (data: FamilyValues) => void;
  onBack: () => void;
}

export function StepFamily({ defaultValues, onNext, onBack }: StepFamilyProps) {
  const form = useForm<FamilyValues>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      familyType: defaultValues?.familyType,
      fatherOccupation: defaultValues?.fatherOccupation || "",
      motherOccupation: defaultValues?.motherOccupation || "",
      siblingsCount: defaultValues?.siblingsCount || "",
      siblingsMarried: defaultValues?.siblingsMarried || "",
      religiousPractice: defaultValues?.religiousPractice,
      socioeconomic: defaultValues?.socioeconomic || "",
    },
  });

  const siblingsCount = form.watch("siblingsCount");

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-rose mb-4">
          <Users className="w-8 h-8 text-burgundy" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark">
          Family Background
        </h2>
        <p className="text-warm-gray mt-2 max-w-md mx-auto">
          Family plays an important role in marriage. Help us understand your family context.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
          {/* Family Type */}
          <FormField
            control={form.control}
            name="familyType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium">
                  Family Type
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-3"
                  >
                    {[
                      { value: "nuclear", label: "Nuclear", desc: "Parents & children" },
                      { value: "joint", label: "Joint", desc: "Extended family together" },
                      { value: "extended", label: "Extended", desc: "Multiple generations" },
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

          {/* Parents' Occupations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fatherOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Father&apos;s Occupation
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Business, Government Service"
                      className="h-12 border-gold-light focus:border-burgundy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motherOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Mother&apos;s Occupation
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Homemaker, Teacher"
                      className="h-12 border-gold-light focus:border-burgundy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Siblings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="siblingsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Number of Siblings
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-gold-light">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">No siblings</SelectItem>
                      <SelectItem value="1">1 sibling</SelectItem>
                      <SelectItem value="2">2 siblings</SelectItem>
                      <SelectItem value="3">3 siblings</SelectItem>
                      <SelectItem value="4">4 siblings</SelectItem>
                      <SelectItem value="5+">5 or more</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {siblingsCount && siblingsCount !== "0" && (
              <FormField
                control={form.control}
                name="siblingsMarried"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark font-medium">
                      How many are married?
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-gold-light">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="some">Some</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Religious Practice */}
          <FormField
            control={form.control}
            name="religiousPractice"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium">
                  Family&apos;s Religious Practice Level
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
                        desc: "Actively observe religious practices and rituals",
                      },
                      {
                        value: "moderate",
                        label: "Moderate",
                        desc: "Observe major religious occasions and some practices",
                      },
                      {
                        value: "cultural",
                        label: "Cultural",
                        desc: "Identify with religion culturally, minimal observance",
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

          {/* Socioeconomic (Optional) */}
          <FormField
            control={form.control}
            name="socioeconomic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium">
                  Family Background{" "}
                  <span className="text-warm-gray font-normal">(optional)</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select if you'd like to share" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="upper">Upper class</SelectItem>
                    <SelectItem value="upper-middle">Upper-middle class</SelectItem>
                    <SelectItem value="middle">Middle class</SelectItem>
                    <SelectItem value="lower-middle">Lower-middle class</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-warm-gray text-sm">
                  This helps in finding compatible matches but is completely optional.
                </FormDescription>
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
