"use client"

import { Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Homeowner, Lekki",
    content:
      "Hygiapro has redefined what I expect from a cleaning service. The attention to detail is remarkable—every corner, every surface is treated with care. It's not just cleaning; it's a transformation.",
    image: "/professional-african-woman-portrait-elegant.jpg",
  },
  {
    name: "Emeka Nwosu",
    role: "Managing Director, Tech Firm",
    content:
      "We switched to Hygiapro for our office and the difference is night and day. Our team comments on how fresh and inviting the workspace feels. It's become part of our company culture.",
    image: "/professional-african-man-portrait-business.jpg",
  },
  {
    name: "Funke Adeyemi",
    role: "Airbnb Superhost",
    content:
      "As a Superhost, presentation is everything. Hygiapro's quick turnaround and impeccable standards have directly contributed to my 5-star reviews. They understand hospitality.",
    image: "/professional-african-woman-portrait-friendly.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Testimonials</p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Words from our clients
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg lg:p-10"
            >
              <Quote className="mb-6 h-8 w-8 text-accent/30" />
              <p className="mb-8 text-base leading-relaxed text-muted-foreground">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
