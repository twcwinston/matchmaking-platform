import Link from "next/link";
import {
  Heart,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { mockTestimonials } from "@/lib/mock-data";

const howItWorksSteps = [
  {
    icon: Users,
    title: "Create Your Story",
    description:
      "Build a complete profile that captures who you really are — your values, lifestyle, and what you're looking for.",
  },
  {
    icon: Sparkles,
    title: "Receive Curated Matches",
    description:
      "Our matchmakers review AI suggestions and send you the best fits. No endless browsing — just quality matches.",
  },
  {
    icon: Heart,
    title: "Connect with Confidence",
    description:
      "Every introduction is facilitated with care. Meet verified, compatible people through thoughtful introductions.",
  },
];

const whyDifferent = [
  {
    title: "Curated, Not Overwhelming",
    description:
      "You receive handpicked matches, not endless profiles to scroll through.",
  },
  {
    title: "Mediated, Not Transactional",
    description:
      "Introductions are facilitated by real people who understand the nuances.",
  },
  {
    title: "Holistic, Not Superficial",
    description:
      "We match on values, lifestyle, personality — not just age and education.",
  },
  {
    title: "Verified, Not Anonymous",
    description:
      "Every profile is ID-verified from the start, ensuring genuine participants.",
  },
];

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-soft-rose/30 to-cream py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
              Thoughtful Matches.{" "}
              <span className="text-burgundy">Meaningful Beginnings.</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-gray mb-8 leading-relaxed">
              Finding your life partner should feel personal — because it is. We
              combine human intuition with intelligent matching to bring you
              introductions that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                asChild
              >
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-8 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl" />
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
              How It Works
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              A simple, dignified process designed to respect your time and
              find meaningful matches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-soft-rose rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-burgundy" />
                </div>
                <div className="text-gold font-bold text-sm mb-2">
                  STEP {idx + 1}
                </div>
                <h3 className="font-serif text-xl font-semibold text-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-warm-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6">
                Not a dating app.
                <br />
                <span className="text-burgundy">A matchmaking service.</span>
              </h2>
              <p className="text-warm-gray text-lg mb-8">
                Unlike open matrimony sites where you're one of thousands, here
                you're personally matched by experts who've reviewed every
                profile. No endless browsing. No awkward first messages. Just
                thoughtful introductions between compatible, verified families.
              </p>
              <Button asChild>
                <Link href="/about">
                  Learn About Our Approach
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {whyDifferent.map((item, idx) => (
                <Card
                  key={idx}
                  className="bg-white border-gold-light/50 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <CheckCircle className="w-8 h-8 text-burgundy mb-4" />
                    <h3 className="font-semibold text-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-warm-gray text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">
                1,200+
              </div>
              <div className="text-white/70">Verified Profiles</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">
                340+
              </div>
              <div className="text-white/70">Successful Matches</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">
                34%
              </div>
              <div className="text-white/70">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-gold mb-2">
                100%
              </div>
              <div className="text-white/70">ID Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
              Success Stories
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Real couples who found each other through our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mockTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="bg-soft-rose/30 border-gold-light/50"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <p className="text-dark mb-6 italic">"{testimonial.story}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-burgundy rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-dark">
                        {testimonial.names}
                      </div>
                      <div className="text-sm text-warm-gray">
                        Married {testimonial.marriedDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Life Partner?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of families who trust us to help them find meaningful
            connections. Start your journey today.
          </p>
          <Button
            size="lg"
            className="bg-gold hover:bg-gold-dark text-dark text-lg px-8"
            asChild
          >
            <Link href="/signup">
              Create Your Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
