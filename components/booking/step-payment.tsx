"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowLeft, CreditCard, MapPin, Calendar, User, Loader2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookingStore } from "@/store/booking-store"
import { formatPrice } from "@/lib/services-data"
import { TIME_SLOTS } from "@/lib/booking-utils"
import { toast } from "sonner"
import { initiatePaystackPayment } from "@/app/actions/paystack"
import { checkTimeSlotAvailability } from "@/app/actions/bookings"
import { motion } from "framer-motion"

interface StepPaymentProps {
  onBack: () => void
}

export function StepPayment({ onBack }: StepPaymentProps) {
  const { cart, bookingSlot, customerDetails, getCartTotal } = useBookingStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const total = getCartTotal()

  const selectedTimeSlot = TIME_SLOTS.find((s) => s.time === bookingSlot?.time)

  const handlePayment = async () => {
    if (!customerDetails) {
      toast.error("Customer details are missing")
      return
    }

    if (!bookingSlot) {
      toast.error("Please select a date and time")
      return
    }

    setIsProcessing(true)

    try {
      // Double-check availability before payment
      const availabilityCheck = await checkTimeSlotAvailability(bookingSlot.date, bookingSlot.time)

      if (!availabilityCheck.data?.available) {
        toast.error("This time slot has just been booked. Please go back and select another time.")
        setIsProcessing(false)
        return
      }

      const result = await initiatePaystackPayment({
        email: customerDetails.email,
        amount: total,
        metadata: {
          customerName: customerDetails.fullName,
          phone: customerDetails.phone,
          address: customerDetails.address,
          notes: customerDetails.notes,
          bookingDate: bookingSlot.date,
          bookingTime: bookingSlot.time,
          services: cart.map((item) => ({
            name: item.service.name,
            quantity: item.quantity,
            price: item.service.startingPrice,
          })),
        },
      })

      if (result.success && result.data?.authorization_url) {
        toast.success("Redirecting to payment...")
        window.location.href = result.data.authorization_url
      } else {
        toast.error(result.message || "Failed to initiate payment")
      }
    } catch {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Order Summary */}
        <div className="space-y-6">
          <div className="border border-border bg-card">
            <div className="border-b border-border p-6">
              <h3 className="font-semibold text-foreground">Order Summary</h3>
            </div>
            <div className="divide-y divide-border">
              {cart.map((item) => (
                <div key={item.service.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-foreground">{item.service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.service.startingPrice)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    {formatPrice(item.service.startingPrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-accent bg-accent/10 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wider text-muted-foreground">Total</span>
                <span className="font-serif text-2xl font-medium text-accent">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Appointment */}
          <div className="border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Appointment</h3>
            </div>
            {bookingSlot && (
              <p className="text-foreground">
                {format(new Date(bookingSlot.date), "EEEE, MMMM d, yyyy")} at {selectedTimeSlot?.label}
              </p>
            )}
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-6">
          <div className="border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <User className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Customer Details</h3>
            </div>
            {customerDetails && (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{customerDetails.fullName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{customerDetails.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{customerDetails.email}</p>
                </div>
              </div>
            )}
          </div>

          <div className="border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Service Location</h3>
            </div>
            {customerDetails && (
              <>
                <p className="font-medium text-foreground">{customerDetails.address}</p>
                {customerDetails.notes && (
                  <div className="mt-4 bg-secondary p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Special Instructions</p>
                    <p className="mt-1 text-sm text-foreground">{customerDetails.notes}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Secure Payment Banner */}
      <div className="border border-accent bg-accent/5 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent">
            <Shield className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Secure Payment with Paystack</h3>
            <p className="text-sm text-muted-foreground">
              Your payment is encrypted and secure. We accept Visa, Mastercard, Bank Transfer, and USSD.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 rounded-none border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          size="lg"
          className="gap-2 rounded-none bg-accent px-8 text-accent-foreground hover:bg-accent/90"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              Pay {formatPrice(total)}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
