"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Trash2, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking-store"
import { formatPrice } from "@/lib/services-data"

interface StepReviewProps {
  onNext: () => void
}

export function StepReview({ onNext }: StepReviewProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useBookingStore()
  const total = getCartTotal()

  if (cart.length === 0) {
    return (
      <div className="border border-border bg-card p-12 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-border bg-secondary">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 font-serif text-2xl font-medium text-foreground">No services selected</h3>
        <p className="mb-8 text-muted-foreground">
          You haven't added any services to your booking yet. Browse our services and add them to continue.
        </p>
        <Button asChild className="gap-2 rounded-none">
          <Link href="/services">
            <Plus className="h-4 w-4" />
            Browse Services
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Services List */}
      <div className="border border-border bg-card">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold text-foreground">Selected Services</h3>
        </div>
        <div className="divide-y divide-border">
          {cart.map((item) => (
            <div key={item.service.id} className="flex items-center gap-4 p-4 md:p-6">
              <div className="h-16 w-16 shrink-0 overflow-hidden bg-muted md:h-20 md:w-20">
                <img
                  src={item.service.image || "/placeholder.svg"}
                  alt={item.service.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.service.name}</h4>
                <p className="hidden text-sm text-muted-foreground md:block">{item.service.shortDescription}</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {formatPrice(item.service.startingPrice)} {item.service.priceUnit}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border">
                  <button
                    className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="hidden w-24 text-right font-semibold text-foreground md:block">
                  {formatPrice(item.service.startingPrice * item.quantity)}
                </p>
                <button
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  onClick={() => removeFromCart(item.service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Total Amount</span>
          <span className="font-serif text-2xl font-medium text-foreground">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild className="gap-2 rounded-none bg-transparent">
          <Link href="/services">
            <ArrowLeft className="h-4 w-4" />
            Add More
          </Link>
        </Button>
        <Button onClick={onNext} className="gap-2 rounded-none">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
