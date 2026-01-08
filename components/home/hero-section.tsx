"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Full-width hero image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/luxury-modern-minimalist-interior-living-room-brig.jpg"
          alt="Pristine modern interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-20 lg:px-8">
        <div className="max-w-2xl py-24 lg:py-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Professional Cleaning Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-7xl">
            The art of
            <br />
            <span className="italic">immaculate</span>
            <br />
            spaces
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Experience cleaning elevated to an art form. We bring meticulous
            attention and premium care to every home and business we touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="gap-3 rounded-none bg-accent px-8 py-6 text-sm uppercase tracking-wider text-accent-foreground hover:bg-accent/90">
              <Link href="/services">
                Book a Service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent">
              Learn Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 flex gap-12 border-t border-border pt-8">
            {[
              { value: "50+", label: "Happy Clients" },
              { value: "80%", label: "Satisfaction Rate" },
              { value: "2+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}>
                <p className="font-serif text-3xl font-medium text-accent md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          Scroll
        </span>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-px bg-accent"
        />
      </motion.div>
    </section>
  );
}
