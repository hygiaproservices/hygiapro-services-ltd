import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Service } from "@/lib/services-data"

export interface CartItem {
  service: Service
  quantity: number
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
  addToCart: (service: Service) => void
  removeFromCart: (serviceId: string) => void
  updateQuantity: (serviceId: string, quantity: number) => void
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

      addToCart: (service) => {
        const { cart } = get()
        const existingItem = cart.find((item) => item.service.id === service.id)

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.service.id === service.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({ cart: [...cart, { service, quantity: 1 }] })
        }
      },

      removeFromCart: (serviceId) => {
        set({ cart: get().cart.filter((item) => item.service.id !== serviceId) })
      },

      updateQuantity: (serviceId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(serviceId)
          return
        }
        set({
          cart: get().cart.map((item) => (item.service.id === serviceId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.service.startingPrice * item.quantity, 0)
      },

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
