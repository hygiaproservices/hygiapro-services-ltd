import { ServicePricingSection } from "@/components/services/service-pricing-section";
import { ServiceReviews } from "@/components/services/service-reviews";
import { Button } from "@/components/ui/button";
import { formatPrice, getServiceById, services } from "@/lib/services-data";
import { ArrowLeft, ArrowRight, Check, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true; // Allow dynamic routes not in generateStaticParams

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) {
    return {
      title: "Service Not Found | Hygiapro",
    };
  }

  return {
    title: `${service.name} | Hygiapro`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) {
    notFound();
  }

  // Get related services (same category, excluding current)
  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-sm lg:px-8">
            <Link
              href="/services"
              className="text-muted-foreground hover:text-foreground">
              Services
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{service.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-square">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {service.category === "residential"
                    ? "Residential"
                    : service.category === "commercial"
                    ? "Commercial"
                    : "Specialized"}
                </p>
                <h1 className="mb-6 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  {service.name}
                </h1>
                <div className="mb-8">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <ServicePricingSection service={service} />

                {/* Quick Info */}
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Same-day booking available
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Jos / Abuja & surrounding areas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  What's Included
                </p>
                <h2 className="mb-6 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  Comprehensive service, exceptional results
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Every {service.name.toLowerCase()} service includes our
                  signature attention to detail and premium cleaning products.
                  Here's what you can expect.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {service.includes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-background p-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-foreground">
                      <Check className="h-4 w-4 text-background" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceReviews serviceId={service.id} serviceName={service.name} />

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="bg-background py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    You May Also Like
                  </p>
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                    Related Services
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="hidden items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:flex">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((relatedService) => (
                  <Link
                    key={relatedService.id}
                    href={`/services/${relatedService.id}`}
                    className="group border border-border bg-card transition-colors hover:border-foreground/20">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={relatedService.image || "/placeholder.svg"}
                        alt={relatedService.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {relatedService.name}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {relatedService.shortDescription}
                      </p>
                      <p className="font-semibold text-foreground">
                        From {formatPrice(relatedService.startingPrice)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-foreground py-16 text-primary-foreground lg:py-24">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <h2 className="mb-6 font-serif text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl">
              Ready to book your {service.name.toLowerCase()}?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/70">
              Experience the Hygiapro difference. Professional service, premium
              results, and complete peace of mind.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2 rounded-none px-8">
                <Link href="/services">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Services
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="gap-2 rounded-none bg-primary-foreground px-8 text-foreground hover:bg-primary-foreground/90">
                <Link href="/booking">
                  Proceed to Booking
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
