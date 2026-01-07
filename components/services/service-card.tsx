"use client"

import Link from "next/link"
import { Check, Plus, Minus, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking-store"
import { formatPrice, type Service } from "@/lib/services-data"
import { toast } from "sonner"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { cart, addToCart, updateQuantity } = useBookingStore()
  const cartItem = cart.find((item) => item.service.id === service.id)
  const isInCart = !!cartItem

  const handleAddToCart = () => {
    addToCart(service)
    toast.success(`${service.name} added to booking`)
  }

  return (
    <div className="group flex flex-col border border-border bg-card transition-colors hover:border-foreground/20">
      {/* Image */}
      <Link href={`/services/${service.id}`} className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 bg-background/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
          {service.category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <Link href={`/services/${service.id}`}>
            <h3 className="text-lg font-semibold text-foreground transition-colors hover:text-muted-foreground">
              {service.name}
            </h3>
          </Link>
          <Link
            href={`/services/${service.id}`}
            className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{service.shortDescription}</p>

        {/* Includes preview */}
        <div className="mb-6 flex-1">
          <ul className="space-y-2">
            {service.includes.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                <span>{item}</span>
              </li>
            ))}
            {service.includes.length > 3 && (
              <li className="text-sm text-muted-foreground">+{service.includes.length - 3} more</li>
            )}
          </ul>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="font-serif text-2xl font-medium text-foreground">{formatPrice(service.startingPrice)}</p>
            <p className="text-xs text-muted-foreground">{service.priceUnit}</p>
          </div>

          {isInCart ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-none bg-transparent"
                onClick={() => updateQuantity(service.id, cartItem.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-none bg-transparent"
                onClick={() => updateQuantity(service.id, cartItem.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={handleAddToCart} className="gap-2 rounded-none">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
