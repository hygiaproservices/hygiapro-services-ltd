"use client"

import Link from "next/link"
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking-store"
import { formatPrice } from "@/lib/services-data"

export function BookingSummary() {
  const { cart, removeFromCart, getCartTotal, getCartItemCount } = useBookingStore()
  const itemCount = getCartItemCount()
  const total = getCartTotal()

  if (cart.length === 0) {
    return (
      <div className="border border-border bg-secondary p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-border bg-background">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="mb-2 font-semibold text-foreground">Your booking is empty</h3>
        <p className="text-sm text-muted-foreground">Select services from the list to start your booking</p>
      </div>
    )
  }

  return (
    <div className="border border-border bg-card">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Booking Summary</h3>
          <span className="bg-foreground px-2 py-1 text-xs font-medium text-background">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-border">
        {cart.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 p-4">
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.service.name}</p>
              {item.pricing && (
                <p className="text-xs text-muted-foreground">
                  {item.pricing.city} · {item.pricing.size}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.pricing?.price ?? item.service.startingPrice)} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-foreground">
                {formatPrice((item.pricing?.price ?? item.service.startingPrice) * item.quantity)}
              </p>
              <button
                className="text-muted-foreground transition-colors hover:text-destructive"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-border bg-secondary p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
          <span className="font-serif text-2xl font-medium text-foreground">{formatPrice(total)}</span>
        </div>

        <Button asChild className="w-full gap-2 rounded-none">
          <Link href="/booking">
            Continue to Schedule
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
