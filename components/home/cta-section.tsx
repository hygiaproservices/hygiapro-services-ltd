"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "2349064422579";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello, I'd like to book a cleaning service."
);

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/modern-clean-minimalist-interior-living-room-brigh.jpg"
          alt="Clean interior"
          className="h-full w-full object-cover opacity-20"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Ready to Begin?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-6 max-w-3xl font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Transform your space into something extraordinary
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Experience the Hygiapro difference. Book your first cleaning today and
          receive 10% off. Because you deserve spaces that inspire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="gap-3 rounded-none bg-accent px-8 py-6 text-sm uppercase tracking-wider text-accent-foreground hover:bg-accent/90">
            <Link href="/services">
              Book a Cleaning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-3 rounded-none border-primary bg-transparent px-8 py-6 text-sm uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
