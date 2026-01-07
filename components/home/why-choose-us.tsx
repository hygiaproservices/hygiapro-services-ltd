"use client"

import { Shield, Leaf, Clock, CreditCard } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Trained & Vetted Staff",
    description:
      "All our cleaners are professionally trained, background-checked, and fully insured for your complete peace of mind.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    description:
      "We use premium, environmentally conscious cleaning products that are effective yet gentle on your space and the planet.",
  },
  {
    icon: Clock,
    title: "Punctual Service",
    description:
      "We value your time deeply. Our team arrives precisely on schedule and completes work within the agreed timeframe.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Pay seamlessly online through Paystack. Transparent pricing, no hidden fees, instant booking confirmation.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-primary py-24 text-primary-foreground lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/professional-cleaner-in-modern-uniform-organized-c.jpg"
                alt="Professional cleaner"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating stat card - updated with accent color */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-accent p-8 text-accent-foreground lg:-right-12"
            >
              <p className="font-serif text-5xl font-medium">500+</p>
              <p className="mt-2 text-sm uppercase tracking-wider">Satisfied Clients</p>
            </motion.div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Why Hygiapro
            </p>
            <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              Excellence in every detail
            </h2>
            <p className="mb-12 text-base leading-relaxed text-primary-foreground/70">
              We don't just clean spaces—we transform them. Our commitment to excellence, combined with premium products
              and trained professionals, ensures an experience that exceeds expectations.
            </p>

            <div className="grid gap-8 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-accent bg-accent/10">
                    <feature.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
