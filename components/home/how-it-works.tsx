"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    title: "Choose Your Service",
    description:
      "Browse our curated selection of services and select what suits your needs. Combine multiple services for a comprehensive clean.",
  },
  {
    step: "02",
    title: "Select Date & Time",
    description:
      "Pick a date and time that aligns with your schedule. We offer flexible slots to accommodate your lifestyle.",
  },
  {
    step: "03",
    title: "Secure Payment",
    description: "Complete your booking with our secure Paystack integration. Instant confirmation, no hidden charges.",
  },
  {
    step: "04",
    title: "Relax & Enjoy",
    description:
      "Our professional team arrives punctually. Sit back while we transform your space into something extraordinary.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">The Process</p>
          <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
            How it works
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Booking a premium cleaning experience has never been simpler. Four effortless steps to a pristine space.
          </p>
        </motion.div>

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary p-8 lg:p-10"
            >
              <span className="mb-6 block font-serif text-5xl font-light text-accent/40">{item.step}</span>
              <h3 className="mb-3 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="gap-3 rounded-none bg-accent px-8 py-6 text-sm uppercase tracking-wider text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/services">
              Start Your Booking
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
