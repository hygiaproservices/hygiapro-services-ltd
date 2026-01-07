"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { BookingSteps } from "@/components/booking/booking-steps"
import { StepReview } from "@/components/booking/step-review"
import { StepSchedule } from "@/components/booking/step-schedule"
import { StepDetails } from "@/components/booking/step-details"
import { StepPayment } from "@/components/booking/step-payment"

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary pt-20">
        {/* Header */}
        <section className="bg-foreground py-16 text-primary-foreground">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">Checkout</p>
            <h1 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">Complete Your Booking</h1>
          </div>
        </section>

        {/* Booking Flow */}
        <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
          <BookingSteps currentStep={currentStep} />

          {currentStep === 1 && <StepReview onNext={handleNext} />}
          {currentStep === 2 && <StepSchedule onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <StepDetails onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <StepPayment onBack={handleBack} />}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
