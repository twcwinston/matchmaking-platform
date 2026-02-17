import { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account | Matrimony",
  description: "Join Matrimony to find your perfect life partner through thoughtful, curated matches.",
};

export default function SignupPage() {
  return <SignupForm />;
}
