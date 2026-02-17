import { Metadata } from "next";
import { ProfileWizard } from "@/components/onboarding/profile-wizard";

export const metadata: Metadata = {
  title: "Create Your Profile | Matrimony",
  description: "Build your matrimony profile to find your perfect life partner through thoughtful, curated matches.",
};

export default function CreateProfilePage() {
  return (
    <div className="py-4">
      <ProfileWizard />
    </div>
  );
}
