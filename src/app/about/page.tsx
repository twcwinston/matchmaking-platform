import Link from "next/link";
import { Heart, Users, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicLayout } from "@/components/layouts/PublicLayout";

const values = [
  {
    icon: Heart,
    title: "Human-Centered",
    description:
      "Technology should enhance human connection, not replace it. Every match is reviewed by real people who care about outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Verification",
    description:
      "We believe trust is the foundation of any relationship. That's why we verify every profile before they join.",
  },
  {
    icon: Users,
    title: "Family-Inclusive",
    description:
      "We honor the role of family in marriage decisions while respecting individual agency and privacy.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful Matching",
    description:
      "We look beyond surface-level criteria to match people on values, lifestyle, and personality compatibility.",
  },
];

const team = [
  {
    name: "Founder",
    role: "Lead Matchmaker",
    bio: "With over 15 years in the community and a passion for bringing people together, our founder built this platform to combine traditional matchmaking wisdom with modern technology.",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cream via-soft-rose/30 to-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-6">
              About Us
            </h1>
            <p className="text-lg text-warm-gray leading-relaxed">
              We're on a mission to transform how people find their life
              partners — combining the wisdom of traditional matchmaking with
              the power of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6">
                Our Vision
              </h2>
              <div className="space-y-4 text-warm-gray text-lg">
                <p>
                  In a world of endless swiping and superficial connections, we
                  believe there's a better way. Marriage is one of life's most
                  important decisions — it deserves more than a dating app
                  approach.
                </p>
                <p>
                  We envision a platform where every introduction is meaningful,
                  every profile is genuine, and every match is thoughtfully
                  curated. Where families are welcome, privacy is respected, and
                  human expertise guides the journey.
                </p>
                <p className="font-medium text-dark">
                  "Not a dating app. Not a database. A matchmaking service."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-soft-rose to-gold-light/30 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <p className="font-serif text-2xl text-dark font-semibold px-8">
                    "We do the searching so you can focus on connecting."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
              Our Values
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, idx) => (
              <Card key={idx} className="bg-white border-gold-light/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-soft-rose rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-burgundy" />
                  </div>
                  <h3 className="font-semibold text-dark mb-2">{value.title}</h3>
                  <p className="text-warm-gray text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-gold text-5xl font-serif font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-xl mb-2">Quality Over Quantity</h3>
                <p className="text-white/70">
                  We send you 3-5 curated matches at a time, not hundreds of
                  profiles to scroll through.
                </p>
              </div>
              <div>
                <div className="text-gold text-5xl font-serif font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-xl mb-2">Human + AI</h3>
                <p className="text-white/70">
                  Our AI suggests matches, but human matchmakers review every
                  one before sending.
                </p>
              </div>
              <div>
                <div className="text-gold text-5xl font-serif font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold text-xl mb-2">Mediated Introductions</h3>
                <p className="text-white/70">
                  No awkward first messages. We facilitate proper introductions
                  with context and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
              Meet the Team
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              The people behind your matchmaking journey.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {team.map((member, idx) => (
              <Card key={idx} className="bg-soft-rose/30 border-gold-light/50">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-burgundy rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-burgundy font-medium mb-4">{member.role}</p>
                  <p className="text-warm-gray">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a platform that values quality, trust, and meaningful
            connections.
          </p>
          <Button
            size="lg"
            className="bg-gold hover:bg-gold-dark text-dark text-lg px-8"
            asChild
          >
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
