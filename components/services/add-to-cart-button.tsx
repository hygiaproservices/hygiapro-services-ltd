"use client"

import { ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking-store"
import { toast } from "sonner"
import type { Service } from "@/lib/services-data"
import type { CartPricingSelection } from "@/store/booking-store"
import { useState, useEffect } from "react"

interface AddToCartButtonProps {
  service: Service
  pricingSelection?: CartPricingSelection
  disabled?: boolean
}

export function AddToCartButton({
  service,
  pricingSelection,
  disabled,
}: AddToCartButtonProps) {
  const { cart, addToCart } = useBookingStore()
  const [isInCart, setIsInCart] = useState(false)

  useEffect(() => {
    setIsInCart(
      cart.some((item) => {
        if (item.service.id !== service.id) {
          return false
        }
        if (!pricingSelection) {
          return !item.pricing
        }
        return (
          item.pricing?.city === pricingSelection.city &&
          item.pricing?.size === pricingSelection.size
        )
      }),
    )
  }, [cart, pricingSelection, service.id])

  const handleAddToCart = () => {
    if (disabled) {
      return
    }
    if (service.pricing.length > 0 && !pricingSelection) {
      toast.error("Please select a city and size to continue")
      return
    }
    addToCart(service, pricingSelection)
    toast.success(`${service.name} added to your booking`)
  }

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      disabled={disabled}
      className="gap-2 rounded-none px-8">
      {isInCart ? (
        <>
          <Check className="h-4 w-4" />
          Added to Booking
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          Add to Booking
        </>
      )}
    </Button>
  )
}
