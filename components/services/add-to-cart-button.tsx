"use client"

import { ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking-store"
import { toast } from "sonner"
import type { Service } from "@/lib/services-data"
import { useState, useEffect } from "react"

interface AddToCartButtonProps {
  service: Service
}

export function AddToCartButton({ service }: AddToCartButtonProps) {
  const { cart, addToCart } = useBookingStore()
  const [isInCart, setIsInCart] = useState(false)

  useEffect(() => {
    setIsInCart(cart.some((item) => item.service.id === service.id))
  }, [cart, service.id])

  const handleAddToCart = () => {
    addToCart(service)
    toast.success(`${service.name} added to your booking`)
  }

  return (
    <Button onClick={handleAddToCart} size="lg" className="gap-2 rounded-none px-8">
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
