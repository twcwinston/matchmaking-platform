"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { GraduationCap, Briefcase, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const educationSchema = z.object({
  highestEducation: z.string().min(1, "Please select your highest education"),
  institution: z.string().min(2, "Please enter your institution name"),
  fieldOfStudy: z.string().min(2, "Please enter your field of study"),
  occupation: z.string().min(2, "Please enter your occupation"),
  company: z.string().optional(),
  yearsExperience: z.number().min(0).max(50),
  careerAspiration: z.enum(["ambitious", "stable", "flexible"], {
    error: "Please select your career aspiration",
  }),
  workLifeBalance: z.number().min(1).max(5),
});

export type EducationValues = z.infer<typeof educationSchema>;

const educationLevels = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Degree (MD, JD, etc.)",
  "Other",
];

interface StepEducationProps {
  defaultValues?: Partial<EducationValues>;
  onNext: (data: EducationValues) => void;
  onBack: () => void;
}

export function StepEducation({ defaultValues, onNext, onBack }: StepEducationProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      highestEducation: defaultValues?.highestEducation || "",
      institution: defaultValues?.institution || "",
      fieldOfStudy: defaultValues?.fieldOfStudy || "",
      occupation: defaultValues?.occupation || "",
      company: defaultValues?.company || "",
      yearsExperience: defaultValues?.yearsExperience || 0,
      careerAspiration: defaultValues?.careerAspiration,
      workLifeBalance: defaultValues?.workLifeBalance || 3,
    },
  });

  const workLifeValue = form.watch("workLifeBalance");

  const getWorkLifeLabel = (value: number) => {
    const labels = [
      "",
      "Career-focused",
      "Leaning career",
      "Balanced",
      "Leaning family",
      "Family-focused",
    ];
    return labels[value] || "Balanced";
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-rose mb-4">
          <GraduationCap className="w-8 h-8 text-burgundy" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark">
          Education & Career
        </h2>
        <p className="text-warm-gray mt-2 max-w-md mx-auto">
          Share your educational background and professional journey. This helps us find someone who complements your ambitions.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
          {/* Education Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-burgundy" />
              Education
            </h3>

            <FormField
              control={form.control}
              name="highestEducation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Highest Education Level
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-gold-light">
                        <SelectValue placeholder="Select your highest education" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase()}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Institution
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., University of Dhaka"
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
              name="fieldOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Field of Study
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Computer Science, Business Administration"
                      className="h-12 border-gold-light focus:border-burgundy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Career Section */}
          <div className="space-y-4 pt-4 border-t border-rose-muted">
            <h3 className="text-lg font-semibold text-dark flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-burgundy" />
              Career
            </h3>

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Current Occupation
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Software Engineer, Doctor, Teacher"
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Company/Organization{" "}
                    <span className="text-warm-gray font-normal">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Where do you work?"
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
              name="yearsExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Years of Experience: {field.value} {field.value === 1 ? "year" : "years"}
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={40}
                      step={1}
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                      className="py-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="careerAspiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Career Aspirations
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-gold-light">
                        <SelectValue placeholder="How would you describe your career goals?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ambitious">
                        Ambitious — I&apos;m driven to grow and achieve more
                      </SelectItem>
                      <SelectItem value="stable">
                        Stable — I value security and consistency
                      </SelectItem>
                      <SelectItem value="flexible">
                        Flexible — I adapt based on life circumstances
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workLifeBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark font-medium">
                    Work-Life Balance Preference
                  </FormLabel>
                  <div className="pt-2">
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        className="py-4"
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm">
                      <span className="text-warm-gray">Career-focused</span>
                      <span className="text-burgundy font-medium">
                        {getWorkLifeLabel(workLifeValue)}
                      </span>
                      <span className="text-warm-gray">Family-focused</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
