"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookingStepsProps {
  currentStep: number
}

const steps = [
  { number: 1, label: "Review" },
  { number: 2, label: "Schedule" },
  { number: 3, label: "Details" },
  { number: 4, label: "Payment" },
]

export function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center text-sm font-semibold transition-colors",
                  currentStep > step.number
                    ? "bg-foreground text-background"
                    : currentStep === step.number
                      ? "bg-foreground text-background"
                      : "border border-border bg-background text-muted-foreground",
                )}
              >
                {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <span
                className={cn(
                  "mt-3 text-xs font-medium uppercase tracking-wider",
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-px flex-1 transition-colors",
                  currentStep > step.number ? "bg-foreground" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
