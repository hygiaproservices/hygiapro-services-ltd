"use server"

import { z } from "zod"
import axios from "axios"
import { createBooking, updateBookingPaymentStatus } from "./bookings"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

const paymentSchema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
  metadata: z.object({
    customerName: z.string(),
    phone: z.string(),
    address: z.string(),
    notes: z.string().optional(),
    bookingDate: z.string(),
    bookingTime: z.string(),
    services: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
      }),
    ),
  }),
})

type PaymentData = z.infer<typeof paymentSchema>

interface PaystackResponse {
  success: boolean
  message: string
  data?: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export async function initiatePaystackPayment(data: PaymentData): Promise<PaystackResponse> {
  try {
    const validated = paymentSchema.parse(data)
    const reference = `hygiapro_${Date.now()}_${Math.random().toString(36).substring(7)}`

    const bookingResult = await createBooking({
      reference,
      customerName: validated.metadata.customerName,
      customerEmail: validated.email,
      customerPhone: validated.metadata.phone,
      customerAddress: validated.metadata.address,
      notes: validated.metadata.notes,
      bookingDate: validated.metadata.bookingDate,
      bookingTime: validated.metadata.bookingTime,
      services: validated.metadata.services,
      totalAmount: validated.amount,
    })

    if (!bookingResult.success) {
      return {
        success: false,
        message: bookingResult.message,
      }
    }

    if (!PAYSTACK_SECRET_KEY) {
      console.log("Paystack payment initiated (demo mode):", validated)
      // Demo mode - return a simulated response
      return {
        success: true,
        message: "Payment initiated successfully",
        data: {
          authorization_url: `/booking/success?reference=${reference}`,
          access_code: `demo_${Date.now()}`,
          reference,
        },
      }
    }

    // Convert amount to kobo (Paystack expects amount in smallest currency unit)
    const amountInKobo = validated.amount * 100

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: validated.email,
        amount: amountInKobo,
        currency: "NGN",
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/booking/success`,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: validated.metadata.customerName,
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: validated.metadata.phone,
            },
            {
              display_name: "Booking Date",
              variable_name: "booking_date",
              value: validated.metadata.bookingDate,
            },
            {
              display_name: "Booking Time",
              variable_name: "booking_time",
              value: validated.metadata.bookingTime,
            },
          ],
          ...validated.metadata,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (response.data.status) {
      return {
        success: true,
        message: "Payment initiated successfully",
        data: response.data.data,
      }
    }

    return {
      success: false,
      message: response.data.message || "Failed to initialize payment",
    }
  } catch (error) {
    console.error("Paystack error:", error)

    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Payment initialization failed",
      }
    }

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid payment data",
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

export async function verifyPaystackPayment(reference: string): Promise<{
  success: boolean
  message: string
  data?: {
    status: string
    amount: number
    reference: string
    metadata: Record<string, unknown>
  }
}> {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      // Demo mode - mark as paid
      await updateBookingPaymentStatus(reference, "paid")
      return {
        success: true,
        message: "Payment verified successfully",
        data: {
          status: "success",
          amount: 0,
          reference,
          metadata: {},
        },
      }
    }

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    })

    if (response.data.status && response.data.data.status === "success") {
      await updateBookingPaymentStatus(reference, "paid")

      return {
        success: true,
        message: "Payment verified successfully",
        data: {
          status: response.data.data.status,
          amount: response.data.data.amount / 100, // Convert back from kobo
          reference: response.data.data.reference,
          metadata: response.data.data.metadata,
        },
      }
    }

    await updateBookingPaymentStatus(reference, "failed")

    return {
      success: false,
      message: "Payment verification failed",
    }
  } catch (error) {
    console.error("Paystack verification error:", error)
    return {
      success: false,
      message: "Failed to verify payment",
    }
  }
}
