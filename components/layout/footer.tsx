import Link from "next/link"
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"

const footerLinks = {
  services: [
    { href: "/services/residential-cleaning", label: "Residential Cleaning" },
    { href: "/services/office-commercial", label: "Office Cleaning" },
    { href: "/services/post-construction", label: "Post-Construction" },
    { href: "/services/airbnb-shortlet", label: "Airbnb & Short-let" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "All Services" },
    { href: "/contact", label: "Contact" },
    { href: "/booking", label: "Book Online" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-semibold tracking-tight">Hygiapro</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Experience the art of cleanliness. We bring premium cleaning services to discerning homes and businesses
              across Nigeria.
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">Services</h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">Company</h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">Get in Touch</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="tel:+2348000000000"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  +234 800 000 0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@hygiapro.com"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  hello@hygiapro.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Victoria Island, Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Hygiapro Services Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-xs text-primary-foreground/50 transition-colors hover:text-primary-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-primary-foreground/50 transition-colors hover:text-primary-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
