import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { ServiceCard } from "@/components/services/service-card"
import { BookingSummary } from "@/components/services/booking-summary"
import { services } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Our Services | Hygiapro",
  description:
    "Browse our premium cleaning services including residential, commercial, post-construction, and specialized cleaning. Book online today.",
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-foreground py-24 text-primary-foreground lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
                Our Services
              </p>
              <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                Curated cleaning experiences
              </h1>
              <p className="text-lg leading-relaxed text-primary-foreground/70">
                Select from our range of premium cleaning services. Combine multiple services and book them together for
                a comprehensive clean.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <div className="grid gap-8 md:grid-cols-2">
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <BookingSummary />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
