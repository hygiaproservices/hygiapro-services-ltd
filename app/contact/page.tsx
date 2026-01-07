import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Hygiapro",
  description:
    "Get in touch with Hygiapro. We're here to answer your questions and help you book your cleaning service.",
};

const WHATSAPP_NUMBER = "2348000000000";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello, I'd like to inquire about your cleaning services."
);

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@hygiapro.com",
    href: "mailto:hello@hygiapro.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Victoria Island, Lagos, Nigeria",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Sat: 7am - 7pm",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-foreground py-24 text-primary-foreground lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
                Contact Us
              </p>
              <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                Let's start a conversation
              </h1>
              <p className="text-lg leading-relaxed text-primary-foreground/70">
                Have questions about our services? Want to schedule a
                consultation? We're here to help. Reach out and we'll respond
                promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Contact Info */}
              <div>
                <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">
                  Get in Touch
                </h2>

                <div className="mb-12 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1 text-lg font-medium text-foreground transition-colors hover:text-muted-foreground">
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-lg font-medium text-foreground">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="border border-border bg-secondary p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#25D366]">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Prefer WhatsApp?
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Get instant responses and quick quotes through WhatsApp. Our
                    team is ready to assist you.
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
                    Start a Chat
                    <span className="text-xs">→</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="border-t border-border">
          <div className="h-[400px] w-full bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286354095847!2d3.4216356!3d6.4280556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53a7f5d4e8b%3A0x5b3b0db5d4c9a0b8!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hygiapro Location"
              className="grayscale"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
