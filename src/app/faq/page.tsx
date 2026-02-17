import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { mockFAQs } from "@/lib/mock-data";

const additionalFAQs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "Who can join the platform?",
        answer:
          "Our platform is open to adults (18+) who are seriously looking for marriage. You can join for yourself or a family member can create a profile on your behalf with your consent.",
      },
      {
        question: "How long does the profile verification take?",
        answer:
          "Profile verification typically takes 2-3 business days after document submission. We manually review every document to ensure authenticity.",
      },
      {
        question: "Can I save my profile as a draft?",
        answer:
          "Yes! You can save your progress at any step of the profile creation process and return later to complete it. Your information is securely saved.",
      },
    ],
  },
  {
    category: "Matching & Introductions",
    questions: mockFAQs.slice(0, 4),
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Who can see my profile?",
        answer:
          "Your profile is only visible to our matchmakers and to users we send your profile to as a match. Unlike open matrimony sites, your profile is not publicly browsable.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Absolutely. We use industry-standard encryption and never share your contact details with other members until you explicitly consent during the introduction process.",
      },
      {
        question: "Can I delete my profile?",
        answer:
          "Yes, you can delete your profile at any time from your account settings. All your data will be permanently removed within 30 days of the request.",
      },
    ],
  },
  {
    category: "Payment & Subscriptions",
    questions: mockFAQs.slice(5, 6).concat([
      {
        question: "Can I get a refund?",
        answer:
          "We offer a full refund within 7 days of payment if your profile hasn't been verified yet. After verification, partial refunds may be available depending on service usage. Contact our support team for details.",
      },
      {
        question: "Are there any recurring charges?",
        answer:
          "No. Our pricing is one-time payment only. There are no hidden subscriptions or recurring charges. What you see is what you pay.",
      },
    ]),
  },
];

export default function FAQPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cream via-soft-rose/30 to-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-dark mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Everything you need to know about our matchmaking platform.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {additionalFAQs.map((category, categoryIdx) => (
              <div key={categoryIdx}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-soft-rose rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-burgundy" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-dark">
                    {category.category}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${categoryIdx}-${idx}`}
                      className="bg-cream border border-gold-light/50 rounded-xl px-6 data-[state=open]:bg-soft-rose/30"
                    >
                      <AccordionTrigger className="text-left font-medium text-dark hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-warm-gray pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-dark mb-4">
              Still Have Questions?
            </h2>
            <p className="text-warm-gray text-lg mb-8">
              Our team is here to help. Reach out to us and we'll get back to
              you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="mailto:hello@sandhani.com">
                  Email Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact Form
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-burgundy to-burgundy-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of families who trust us to help them find meaningful
            connections.
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
