"use server"

import { sql } from "@/lib/db"
import { z } from "zod"

// Get booked time slots for a specific date
export async function getBookedTimeSlots(date: string): Promise<{
  success: boolean
  message: string
  data?: string[]
}> {
  try {
    const result = await sql`
      SELECT booking_time 
      FROM bookings 
      WHERE booking_date = ${date}
      AND booking_status != 'cancelled'
    `

    const bookedTimes = result.map((row) => row.booking_time as string)

    return {
      success: true,
      message: "Fetched booked slots",
      data: bookedTimes,
    }
  } catch (error) {
    console.error("Error fetching booked slots:", error)
    return {
      success: false,
      message: "Failed to fetch availability",
      data: [],
    }
  }
}

// Check if a specific time slot is available
export async function checkTimeSlotAvailability(
  date: string,
  time: string,
): Promise<{
  success: boolean
  message: string
  data?: { available: boolean }
}> {
  try {
    const result = await sql`
      SELECT id 
      FROM bookings 
      WHERE booking_date = ${date} 
      AND booking_time = ${time}
      AND booking_status != 'cancelled'
      LIMIT 1
    `

    const isAvailable = result.length === 0

    return {
      success: true,
      message: isAvailable ? "Time slot is available" : "Time slot is already booked",
      data: { available: isAvailable },
    }
  } catch (error) {
    console.error("Error checking availability:", error)
    return {
      success: false,
      message: "Failed to check availability",
    }
  }
}

const createBookingSchema = z.object({
  reference: z.string(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  customerAddress: z.string().min(5),
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
  totalAmount: z.number(),
})

// Create a new booking
export async function createBooking(data: z.infer<typeof createBookingSchema>): Promise<{
  success: boolean
  message: string
  data?: { id: number; reference: string }
}> {
  try {
    const validated = createBookingSchema.parse(data)

    // Double-check availability before creating
    const availabilityCheck = await checkTimeSlotAvailability(validated.bookingDate, validated.bookingTime)

    if (!availabilityCheck.data?.available) {
      return {
        success: false,
        message: "This time slot has just been booked. Please select another time.",
      }
    }

    const result = await sql`
      INSERT INTO bookings (
        reference,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        notes,
        booking_date,
        booking_time,
        services,
        total_amount,
        payment_status,
        booking_status
      ) VALUES (
        ${validated.reference},
        ${validated.customerName},
        ${validated.customerEmail},
        ${validated.customerPhone},
        ${validated.customerAddress},
        ${validated.notes || null},
        ${validated.bookingDate},
        ${validated.bookingTime},
        ${JSON.stringify(validated.services)},
        ${validated.totalAmount},
        'pending',
        'confirmed'
      )
      RETURNING id, reference
    `

    return {
      success: true,
      message: "Booking created successfully",
      data: {
        id: result[0].id as number,
        reference: result[0].reference as string,
      },
    }
  } catch (error) {
    console.error("Error creating booking:", error)

    // Handle unique constraint violation (double booking attempt)
    if (error instanceof Error && error.message.includes("unique")) {
      return {
        success: false,
        message: "This booking reference already exists",
      }
    }

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid booking data",
      }
    }

    return {
      success: false,
      message: "Failed to create booking",
    }
  }
}

// Update booking payment status
export async function updateBookingPaymentStatus(
  reference: string,
  status: "pending" | "paid" | "failed",
): Promise<{
  success: boolean
  message: string
}> {
  try {
    await sql`
      UPDATE bookings 
      SET payment_status = ${status}, updated_at = NOW()
      WHERE reference = ${reference}
    `

    return {
      success: true,
      message: "Payment status updated",
    }
  } catch (error) {
    console.error("Error updating payment status:", error)
    return {
      success: false,
      message: "Failed to update payment status",
    }
  }
}

// Get booking by reference
export async function getBookingByReference(reference: string): Promise<{
  success: boolean
  message: string
  data?: {
    id: number
    reference: string
    customerName: string
    customerEmail: string
    bookingDate: string
    bookingTime: string
    services: { name: string; quantity: number; price: number }[]
    totalAmount: number
    paymentStatus: string
    bookingStatus: string
  }
}> {
  try {
    const result = await sql`
      SELECT 
        id,
        reference,
        customer_name,
        customer_email,
        booking_date,
        booking_time,
        services,
        total_amount,
        payment_status,
        booking_status
      FROM bookings 
      WHERE reference = ${reference}
      LIMIT 1
    `

    if (result.length === 0) {
      return {
        success: false,
        message: "Booking not found",
      }
    }

    const booking = result[0]

    return {
      success: true,
      message: "Booking found",
      data: {
        id: booking.id as number,
        reference: booking.reference as string,
        customerName: booking.customer_name as string,
        customerEmail: booking.customer_email as string,
        bookingDate: booking.booking_date as string,
        bookingTime: booking.booking_time as string,
        services: booking.services as { name: string; quantity: number; price: number }[],
        totalAmount: Number(booking.total_amount),
        paymentStatus: booking.payment_status as string,
        bookingStatus: booking.booking_status as string,
      },
    }
  } catch (error) {
    console.error("Error fetching booking:", error)
    return {
      success: false,
      message: "Failed to fetch booking",
    }
  }
}
