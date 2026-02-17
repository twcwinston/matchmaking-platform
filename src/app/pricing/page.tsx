import Link from "next/link";
import { Check, Crown, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicLayout } from "@/components/layouts/PublicLayout";

const plans = [
  {
    name: "Standard",
    price: "5,000",
    period: "one-time",
    description: "Everything you need to find your life partner",
    features: [
      "Complete profile creation",
      "ID verification",
      "3-5 curated matches per batch",
      "Mediated introductions",
      "Matchmaker support",
      "3 months active matching",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "10,000",
    period: "one-time",
    description: "Priority service for serious seekers",
    features: [
      "Everything in Standard",
      "Priority matching queue",
      "5-7 curated matches per batch",
      "Dedicated matchmaker",
      "Detailed compatibility reports",
      "6 months active matching",
      "Video introduction option",
      "Family consultation session",
    ],
    popular: true,
  },
];

const faqs = [
  {
    question: "What does the signup fee cover?",
    answer:
      "The fee covers your profile verification, access to our matching system, matchmaker support, and active matching for the duration specified in your plan. There are no hidden fees.",
  },
  {
    question: "Can I upgrade from Standard to Premium?",
    answer:
      "Yes! You can upgrade at any time by paying the difference. Your matching period will be extended accordingly.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, and all major credit/debit cards. Bank transfer is also available for larger amounts.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a full refund within 7 days if your profile hasn't been verified yet. After verification, partial refunds may be available depending on service usage.",
  },
];

export default function PricingPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cream via-soft-rose/30 to-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            One-time payment. No subscriptions. No hidden fees. Just
            quality matchmaking.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative overflow-hidden ${
                  plan.popular
                    ? "border-burgundy border-2 shadow-lg"
                    : "border-gold-light/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-burgundy text-white px-4 py-1 text-sm font-medium">
                    <Crown className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-2xl text-dark">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-burgundy">
                      ৳{plan.price}
                    </span>
                    <span className="text-warm-gray ml-2">BDT</span>
                    <span className="text-warm-gray text-sm block mt-1">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-warm-gray mt-3">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
                        <span className="text-dark">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-burgundy hover:bg-burgundy-dark"
                        : "bg-dark hover:bg-dark/90"
                    }`}
                    size="lg"
                    asChild
                  >
                    <Link href="/signup">
                      Choose {plan.name}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-dark mb-8 text-center">
              What's Included in Every Plan
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "Complete profile review",
                "ID verification",
                "AI-powered matching",
                "Human matchmaker review",
                "Curated match delivery",
                "Mediated introductions",
                "Compatibility breakdowns",
                "Matchmaker messaging",
                "Privacy protection",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gold-light/50"
                >
                  <Check className="w-5 h-5 text-burgundy flex-shrink-0" />
                  <span className="text-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-dark mb-8 text-center">
              Pricing FAQs
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-soft-rose/30 p-6 rounded-2xl border border-gold-light/50"
                >
                  <div className="flex gap-3">
                    <HelpCircle className="w-6 h-6 text-burgundy flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-dark mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-warm-gray">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Life Partner?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join today and let us help you find meaningful connections.
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
