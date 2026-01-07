import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

export type Booking = {
  id: number
  reference: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  notes: string | null
  booking_date: string
  booking_time: string
  services: {
    name: string
    quantity: number
    price: number
  }[]
  total_amount: number
  payment_status: string
  booking_status: string
  created_at: string
  updated_at: string
}
