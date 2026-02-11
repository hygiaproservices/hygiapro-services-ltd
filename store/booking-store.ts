import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Service } from "@/lib/services-data"

export interface CartPricingSelection {
  city: string
  size: string
  min: number
  max: number
  price: number
  unit: string
  note?: string
}

export interface CartItem {
  id: string
  service: Service
  quantity: number
  pricing?: CartPricingSelection
}

export interface CustomerDetails {
  fullName: string
  phone: string
  email: string
  address: string
  notes: string
}

export interface BookingSlot {
  date: string
  time: string
}

interface BookingState {
  cart: CartItem[]
  bookingSlot: BookingSlot | null
  customerDetails: CustomerDetails | null

  // Cart actions
  addToCart: (service: Service, pricing?: CartPricingSelection) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number

  // Booking actions
  setBookingSlot: (slot: BookingSlot) => void
  setCustomerDetails: (details: CustomerDetails) => void
  resetBooking: () => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      cart: [],
      bookingSlot: null,
      customerDetails: null,

      addToCart: (service, pricing) => {
        const { cart } = get()
        const optionKey = pricing ? `${pricing.city}-${pricing.size}` : "default"
        const itemId = `${service.id}-${optionKey}`
        const existingItem = cart.find((item) => item.id === itemId)

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + 1, pricing: pricing ?? item.pricing }
                : item,
            ),
          })
        } else {
          set({ cart: [...cart, { id: itemId, service, quantity: 1, pricing }] })
        }
      },

      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter((item) => item.id !== cartItemId) })
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId)
          return
        }
        set({
          cart: get().cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item,
          ),
        })
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () =>
        get().cart.reduce((total, item) => {
          const price = item.pricing?.price ?? item.service.startingPrice
          return total + price * item.quantity
        }, 0),

      getCartItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      },

      setBookingSlot: (slot) => set({ bookingSlot: slot }),

      setCustomerDetails: (details) => set({ customerDetails: details }),

      resetBooking: () =>
        set({
          cart: [],
          bookingSlot: null,
          customerDetails: null,
        }),
    }),
    {
      name: "hygiapro-booking",
    },
  ),
)
