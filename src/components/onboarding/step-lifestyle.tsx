"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Coffee, ChevronLeft, Sun, Moon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const lifestyleSchema = z.object({
  dailyRoutine: z.enum(["early-bird", "night-owl", "flexible"], {
    error: "Please select your daily routine preference",
  }),
  socialStyle: z.enum(["introvert", "extrovert", "ambivert"], {
    error: "Please select your social style",
  }),
  hobbies: z.array(z.string()).min(1, "Please select at least one hobby"),
  healthFitness: z.enum(["very-active", "moderate", "casual", "not-active"], {
    error: "Please select your health and fitness level",
  }),
  travelPreference: z.enum(["love", "enjoy", "occasional", "homebody"], {
    error: "Please select your travel preference",
  }),
  dietaryPreference: z.string().min(1, "Please select your dietary preference"),
});

export type LifestyleValues = z.infer<typeof lifestyleSchema>;

const hobbyOptions = [
  "Reading", "Traveling", "Cooking", "Sports", "Music", "Art",
  "Photography", "Gaming", "Fitness", "Movies", "Writing", "Dancing",
  "Gardening", "Hiking", "Swimming", "Cycling", "Yoga", "Meditation",
  "Shopping", "Volunteering", "Technology", "Fashion", "Food Exploring",
];

interface StepLifestyleProps {
  defaultValues?: Partial<LifestyleValues>;
  onNext: (data: LifestyleValues) => void;
  onBack: () => void;
}

export function StepLifestyle({ defaultValues, onNext, onBack }: StepLifestyleProps) {
  const form = useForm<LifestyleValues>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      dailyRoutine: defaultValues?.dailyRoutine,
      socialStyle: defaultValues?.socialStyle,
      hobbies: defaultValues?.hobbies || [],
      healthFitness: defaultValues?.healthFitness,
      travelPreference: defaultValues?.travelPreference,
      dietaryPreference: defaultValues?.dietaryPreference || "",
    },
  });

  const selectedHobbies = form.watch("hobbies");

  const toggleHobby = (hobby: string) => {
    const current = form.getValues("hobbies");
    if (current.includes(hobby)) {
      form.setValue("hobbies", current.filter((h) => h !== hobby), { shouldValidate: true });
    } else if (current.length < 10) {
      form.setValue("hobbies", [...current, hobby], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-rose mb-4">
          <Coffee className="w-8 h-8 text-burgundy" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark">
          Your Lifestyle
        </h2>
        <p className="text-warm-gray mt-2 max-w-md mx-auto">
          Share how you like to spend your time. Compatible lifestyles make for happier partnerships.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
          {/* Daily Routine */}
          <FormField
            control={form.control}
            name="dailyRoutine"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium text-base">
                  Are you an early bird or night owl?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-3"
                  >
                    {[
                      { value: "early-bird", label: "Early Bird", icon: Sun },
                      { value: "night-owl", label: "Night Owl", icon: Moon },
                      { value: "flexible", label: "Flexible", icon: Coffee },
                    ].map((option) => {
                      const Icon = option.icon;
                      return (
                        <label
                          key={option.value}
                          className={`flex flex-col items-center p-4 rounded-[12px] border-2 cursor-pointer transition-all text-center ${
                            field.value === option.value
                              ? "border-burgundy bg-soft-rose/50"
                              : "border-gold-light hover:border-burgundy/50"
                          }`}
                        >
                          <RadioGroupItem value={option.value} className="sr-only" />
                          <Icon className={`w-6 h-6 mb-2 ${field.value === option.value ? "text-burgundy" : "text-warm-gray"}`} />
                          <span className="font-medium text-dark">{option.label}</span>
                        </label>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Style */}
          <FormField
            control={form.control}
            name="socialStyle"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-dark font-medium text-base">
                  How would you describe your social style?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    {[
                      {
                        value: "introvert",
                        label: "Introvert",
                        desc: "I recharge with alone time and prefer smaller gatherings",
                      },
                      {
                        value: "ambivert",
                        label: "Ambivert",
                        desc: "I enjoy both socializing and quiet time equally",
                      },
                      {
                        value: "extrovert",
                        label: "Extrovert",
                        desc: "I thrive in social settings and love meeting new people",
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

          {/* Hobbies */}
          <FormField
            control={form.control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  What are your hobbies and interests?{" "}
                  <span className="text-warm-gray font-normal">
                    (Select up to 10)
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    {/* Selected hobbies */}
                    {selectedHobbies.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 bg-soft-rose/30 rounded-[12px]">
                        {selectedHobbies.map((hobby) => (
                          <Badge
                            key={hobby}
                            variant="secondary"
                            className="bg-burgundy text-white hover:bg-burgundy-dark cursor-pointer px-3 py-1.5"
                            onClick={() => toggleHobby(hobby)}
                          >
                            {hobby}
                            <X className="w-3 h-3 ml-1.5" />
                          </Badge>
                        ))}
                      </div>
                    )}
                    {/* All options */}
                    <div className="flex flex-wrap gap-2">
                      {hobbyOptions.map((hobby) => (
                        <Badge
                          key={hobby}
                          variant="outline"
                          className={`cursor-pointer px-3 py-1.5 transition-all ${
                            selectedHobbies.includes(hobby)
                              ? "bg-burgundy text-white border-burgundy"
                              : "border-gold-light text-warm-gray hover:border-burgundy hover:text-burgundy"
                          }`}
                          onClick={() => toggleHobby(hobby)}
                        >
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Health & Fitness */}
          <FormField
            control={form.control}
            name="healthFitness"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  How active are you with health and fitness?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="very-active">Very active — Exercise daily</SelectItem>
                    <SelectItem value="moderate">Moderate — Exercise a few times a week</SelectItem>
                    <SelectItem value="casual">Casual — Occasional walks or activities</SelectItem>
                    <SelectItem value="not-active">Not very active — Prefer relaxing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Travel Preference */}
          <FormField
            control={form.control}
            name="travelPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  How do you feel about traveling?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select your travel preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="love">Love it — Always planning the next trip</SelectItem>
                    <SelectItem value="enjoy">Enjoy it — Happy to travel when possible</SelectItem>
                    <SelectItem value="occasional">Occasional — Travel for special occasions</SelectItem>
                    <SelectItem value="homebody">Homebody — Prefer staying close to home</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dietary Preference */}
          <FormField
            control={form.control}
            name="dietaryPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-base">
                  Do you have any dietary preferences?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-gold-light">
                      <SelectValue placeholder="Select your dietary preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="no-restrictions">No restrictions</SelectItem>
                    <SelectItem value="halal">Halal only</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="other">Other dietary needs</SelectItem>
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
