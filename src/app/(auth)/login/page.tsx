import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | Matrimony",
  description: "Sign in to your Matrimony account to continue your journey to finding the perfect match.",
};

export default function LoginPage() {
  return <LoginForm />;
}
