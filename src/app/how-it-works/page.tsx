import Link from "next/link";
import {
  Users,
  FileText,
  ShieldCheck,
  Sparkles,
  Heart,
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowRight,
  User,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicLayout } from "@/components/layouts/PublicLayout";

const seekerSteps = [
  {
    icon: FileText,
    title: "Create Your Profile",
    description:
      "Build a comprehensive profile that captures your personality, values, lifestyle, and what you're looking for in a partner. Take your time — the more detailed, the better your matches.",
    details: [
      "10-step guided wizard",
      "Personality and values assessment",
      "Partner preferences with priorities",
      "Photo upload with guidelines",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Get Verified",
    description:
      "Upload your ID for verification. This ensures everyone on the platform is genuine and serious. Your documents are reviewed by our team and never shared.",
    details: [
      "National ID or Passport",
      "Manual verification by our team",
      "Verified badge on your profile",
      "Documents kept confidential",
    ],
  },
  {
    icon: Sparkles,
    title: "Receive Curated Matches",
    description:
      "Our AI analyzes compatibility across multiple dimensions, and our matchmakers review suggestions to send you the most promising matches — typically 3-5 at a time.",
    details: [
      "AI-powered compatibility scoring",
      "Human review by matchmakers",
      "Quality over quantity",
      "Detailed compatibility breakdown",
    ],
  },
  {
    icon: Heart,
    title: "Express Interest",
    description:
      "Review your matches carefully. When someone catches your eye, express interest. If the feeling is mutual, our matchmaker facilitates a proper introduction.",
    details: [
      "Full profile access",
      "See why you matched",
      "Optional personal notes",
      "No pressure to respond",
    ],
  },
  {
    icon: MessageCircle,
    title: "Mediated Introduction",
    description:
      "When there's mutual interest, your matchmaker prepares a personalized introduction. This includes compatibility highlights and suggested conversation topics.",
    details: [
      "Personalized intro message",
      "Key compatibility points",
      "Conversation starters",
      "Both parties notified together",
    ],
  },
  {
    icon: Calendar,
    title: "Connect & Meet",
    description:
      "Once both parties confirm interest in the introduction, contact details are exchanged or a video call is arranged. Your matchmaker checks in to help things go smoothly.",
    details: [
      "Contact exchange or video call",
      "Matchmaker follow-up",
      "Ongoing support available",
      "Celebrate success!",
    ],
  },
];

const familyFeatures = [
  {
    icon: User,
    title: "Create on Behalf",
    description:
      "Parents or siblings can create a profile on behalf of their loved one. Perfect for when they're busy or abroad.",
  },
  {
    icon: Heart,
    title: "Review Matches Together",
    description:
      "Family members can be granted access to review matches and provide input while respecting privacy boundaries.",
  },
  {
    icon: MessageCircle,
    title: "Communicate with Matchmaker",
    description:
      "Family can directly communicate with the matchmaker to share insights and preferences.",
  },
  {
    icon: Home,
    title: "Family-Focused Matching",
    description:
      "We consider family compatibility alongside individual compatibility, understanding the importance of family in our culture.",
  },
];

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cream via-soft-rose/30 to-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-6">
            How It Works
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            A dignified, personal approach to finding your life partner. Here's
            how we make meaningful matches happen.
          </p>
        </div>
      </section>

      {/* For Seekers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-soft-rose px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4 text-burgundy" />
              <span className="text-sm font-medium text-burgundy">
                For Seekers
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
              Your Journey to Finding Love
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Whether you're searching for yourself or with family support,
              here's what to expect.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {seekerSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6 mb-12 last:mb-0">
                {/* Step Number & Line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-burgundy rounded-full flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {idx < seekerSteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gold-light mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="text-sm font-medium text-gold mb-2">
                    STEP {idx + 1}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-warm-gray mb-4">{step.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-dark"
                      >
                        <CheckCircle className="w-4 h-4 text-burgundy flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Families */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-soft-rose px-4 py-2 rounded-full mb-4">
              <Home className="w-4 h-4 text-burgundy" />
              <span className="text-sm font-medium text-burgundy">
                For Families
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
              Family Involvement Welcome
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              We understand the importance of family in the matchmaking process.
              Here's how families can participate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {familyFeatures.map((feature, idx) => (
              <Card key={idx} className="bg-white border-gold-light/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-soft-rose rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-burgundy" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-warm-gray text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
              What Makes Us Different
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-gold font-semibold text-lg">
                  Traditional Sites
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/70">
                    <span className="text-white/50">✗</span>
                    Open browsing, endless profiles
                  </li>
                  <li className="flex items-start gap-3 text-white/70">
                    <span className="text-white/50">✗</span>
                    Direct messaging (often ignored)
                  </li>
                  <li className="flex items-start gap-3 text-white/70">
                    <span className="text-white/50">✗</span>
                    Basic filters (age, height, religion)
                  </li>
                  <li className="flex items-start gap-3 text-white/70">
                    <span className="text-white/50">✗</span>
                    Anonymous until you choose
                  </li>
                  <li className="flex items-start gap-3 text-white/70">
                    <span className="text-white/50">✗</span>
                    Self-service, no guidance
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-gold font-semibold text-lg">Our Platform</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    Curated matches delivered to you
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    Mediated introductions with context
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    AI matching on values, lifestyle, personality
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    ID-verified from the start
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    White-glove matchmaker support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6">
            Ready to Begin?
          </h2>
          <p className="text-warm-gray text-lg mb-8 max-w-2xl mx-auto">
            Start creating your profile today. Our team is ready to help you
            find meaningful connections.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
