"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    number: "01",
    title: "Residential Cleaning",
    description: "Complete home cleaning for apartments and houses with meticulous attention to detail.",
    href: "/services/residential-cleaning",
  },
  {
    number: "02",
    title: "Office & Commercial",
    description: "Professional cleaning for offices and businesses that elevates your workspace.",
    href: "/services/office-commercial",
  },
  {
    number: "03",
    title: "Post-Construction",
    description: "Deep cleaning after renovation or construction to reveal the true beauty of your space.",
    href: "/services/post-construction",
  },
  {
    number: "04",
    title: "Airbnb & Short-let",
    description: "Quick turnaround cleaning for rental properties that impresses every guest.",
    href: "/services/airbnb-shortlet",
  },
  {
    number: "05",
    title: "Carpet & Upholstery",
    description: "Specialized deep cleaning for fabrics that restores and revitalizes.",
    href: "/services/carpet-upholstery",
  },
  {
    number: "06",
    title: "Event Venue Cleaning",
    description: "Pre and post-event cleaning services for flawless occasions.",
    href: "/services/event-venue",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ServicesOverview() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">What We Do</p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Our Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            View All Services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.number} variants={itemVariants}>
              <Link
                href={service.href}
                className="group relative block bg-background p-8 transition-colors hover:bg-secondary lg:p-10"
              >
                <span className="mb-6 block font-serif text-4xl font-light text-muted-foreground/30 transition-colors group-hover:text-accent/50">
                  {service.number}
                </span>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Learn More
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
