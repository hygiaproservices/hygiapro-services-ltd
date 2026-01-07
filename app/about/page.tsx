import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Hygiapro",
  description:
    "Learn about Hygiapro - our story, mission, values, and commitment to delivering exceptional cleaning services in Nigeria.",
};

const values = [
  {
    icon: Shield,
    title: "Reliability",
    description:
      "We show up on time, every time. You can count on us to deliver consistent, quality service.",
  },
  {
    icon: Heart,
    title: "Care",
    description:
      "We treat your space like our own. Every corner, every surface gets our full attention.",
  },
  {
    icon: Users,
    title: "Professionalism",
    description:
      "Our team is trained, uniformed, and equipped to handle any cleaning challenge.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We don't cut corners. Our standard is excellence in every job we undertake.",
  },
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Trained Staff" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-foreground py-24 text-primary-foreground lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
                  Our Story
                </p>
                <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                  Built on trust, driven by excellence
                </h1>
                <p className="text-lg leading-relaxed text-primary-foreground/70">
                  Founded with a simple mission: to provide professional,
                  reliable cleaning services that give people back their time
                  and peace of mind. What started as a small team serving local
                  homes has grown into a trusted cleaning company serving
                  hundreds of clients across Lagos.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/cleaning-team-group-photo--professional-uniformed.jpg"
                    alt="Hygiapro cleaning team"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-background py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-4xl font-medium text-foreground md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-px bg-border md:grid-cols-2">
              <div className="bg-background p-12 lg:p-16">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Our Mission
                </p>
                <h2 className="mb-6 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  Enhancing quality of life through exceptional service
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  To deliver exceptional cleaning services that enhance the
                  quality of life for our clients. We aim to create clean,
                  healthy, and inviting spaces while providing employment
                  opportunities and maintaining the highest standards of
                  professionalism and integrity.
                </p>
              </div>
              <div className="bg-background p-12 lg:p-16">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Our Vision
                </p>
                <h2 className="mb-6 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  The most trusted name in cleaning
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  To become the most trusted and preferred cleaning service
                  provider in Nigeria, known for our reliability, quality, and
                  customer-centric approach. We envision a future where every
                  space we touch reflects our commitment to excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Our Values
              </p>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                The principles that guide us
              </h2>
            </div>

            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="bg-secondary p-8 lg:p-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-background">
                    <value.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="mb-3 font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/eco-friendly-cleaning-products--green-bottles-and.jpg"
                    alt="Eco-friendly cleaning products"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Our Commitment
                </p>
                <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                  Quality without compromise
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    At Hygiapro, quality isn't just a buzzword — it's our
                    standard. Every member of our team undergoes rigorous
                    training to ensure they meet our high standards before they
                    ever step into your space.
                  </p>
                  <p>
                    We use only premium, eco-friendly cleaning products that are
                    tough on dirt but gentle on your surfaces and the
                    environment. Our equipment is regularly maintained and
                    updated to ensure optimal performance.
                  </p>
                  <p>
                    We are fully insured and bonded, giving you peace of mind
                    that your property is protected. Our satisfaction guarantee
                    means we don't consider a job done until you're completely
                    happy.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild className="gap-2 rounded-none px-8">
                    <Link href="/services">
                      Explore Our Services
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
