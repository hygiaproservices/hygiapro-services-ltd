"use client"

import { ArrowLeft, ArrowRight, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useBookingStore } from "@/store/booking-store"
import { customerDetailsSchema, type CustomerDetailsInput } from "@/lib/validations/booking"

interface StepDetailsProps {
  onNext: () => void
  onBack: () => void
}

export function StepDetails({ onNext, onBack }: StepDetailsProps) {
  const { customerDetails, setCustomerDetails } = useBookingStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerDetailsInput>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: customerDetails || {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
  })

  const onSubmit = (data: CustomerDetailsInput) => {
    setCustomerDetails({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      notes: data.notes || "",
    })
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="border border-border bg-card">
        <div className="flex items-center gap-3 border-b border-border p-6">
          <User className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Your Details</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Full Name *
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="rounded-none border-border bg-transparent px-4 py-6 focus:border-foreground"
                {...register("fullName")}
              />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g. 08012345678"
                className="rounded-none border-border bg-transparent px-4 py-6 focus:border-foreground"
                {...register("phone")}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="rounded-none border-border bg-transparent px-4 py-6 focus:border-foreground"
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Service Address *
              </Label>
              <Textarea
                id="address"
                placeholder="Enter the full address where the cleaning service will be provided"
                rows={3}
                className="resize-none rounded-none border-border bg-transparent px-4 py-4 focus:border-foreground"
                {...register("address")}
              />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Special Instructions (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special requests or areas to focus on?"
                rows={3}
                className="resize-none rounded-none border-border bg-transparent px-4 py-4 focus:border-foreground"
                {...register("notes")}
              />
              {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="gap-2 rounded-none bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting} className="gap-2 rounded-none">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
