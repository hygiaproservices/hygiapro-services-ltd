"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(20),
})

type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(data: ContactFormData): Promise<{
  success: boolean
  message: string
}> {
  try {
    const validated = contactSchema.parse(data)

    // In production, this would send an email or save to database
    // For now, we'll simulate a successful submission
    console.log("Contact form submission:", validated)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Thank you for your message. We'll get back to you within 24 hours.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check your form inputs and try again.",
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
