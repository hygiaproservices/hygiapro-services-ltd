import { z } from "zod"

export const customerDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(300, "Address must be less than 300 characters"),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
})

export type CustomerDetailsInput = z.infer<typeof customerDetailsSchema>
