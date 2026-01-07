"use client"

import { useState, useEffect, useCallback } from "react"
import { format, addDays, startOfDay } from "date-fns"
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useBookingStore } from "@/store/booking-store"
import { TIME_SLOTS, isDateAvailable } from "@/lib/booking-utils"
import { getBookedTimeSlots } from "@/app/actions/bookings"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface StepScheduleProps {
  onNext: () => void
  onBack: () => void
}

export function StepSchedule({ onNext, onBack }: StepScheduleProps) {
  const { bookingSlot, setBookingSlot } = useBookingStore()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    bookingSlot?.date ? new Date(bookingSlot.date) : undefined,
  )
  const [selectedTime, setSelectedTime] = useState<string | undefined>(bookingSlot?.time)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const minDate = addDays(startOfDay(new Date()), 1)
  const maxDate = addDays(startOfDay(new Date()), 60)

  const fetchBookedSlots = useCallback(
    async (date: Date) => {
      setIsLoadingSlots(true)
      try {
        const dateStr = format(date, "yyyy-MM-dd")
        const result = await getBookedTimeSlots(dateStr)
        if (result.success && result.data) {
          setBookedTimes(result.data)
          // If currently selected time is now booked, clear it
          if (selectedTime && result.data.includes(selectedTime)) {
            setSelectedTime(undefined)
            toast.error("Your previously selected time is no longer available")
          }
        }
      } catch (error) {
        console.error("Failed to fetch booked slots:", error)
        toast.error("Failed to check availability")
      } finally {
        setIsLoadingSlots(false)
      }
    },
    [selectedTime],
  )

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate)
    }
  }, [selectedDate, fetchBookedSlots])

  const handleContinue = () => {
    if (!selectedDate) {
      toast.error("Please select a date")
      return
    }
    if (!selectedTime) {
      toast.error("Please select a time slot")
      return
    }

    // Double-check the time isn't booked
    if (bookedTimes.includes(selectedTime)) {
      toast.error("This time slot has just been booked. Please select another time.")
      setSelectedTime(undefined)
      return
    }

    setBookingSlot({
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
    })
    onNext()
  }

  const isDisabledDate = (date: Date) => {
    return !isDateAvailable(date)
  }

  const isTimeSlotAvailable = (time: string) => {
    return !bookedTimes.includes(time)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Date Selection */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-3 border-b border-border p-6">
            <CalendarDays className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">Select Date</h3>
          </div>
          <div className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isDisabledDate}
              fromDate={minDate}
              toDate={maxDate}
              className="mx-auto"
            />
            {selectedDate && (
              <div className="mt-4 bg-accent/10 p-3 text-center">
                <p className="text-sm font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Time Selection */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-3 border-b border-border p-6">
            <Clock className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">Select Time</h3>
            {isLoadingSlots && <Loader2 className="ml-auto h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          <div className="p-6">
            {!selectedDate ? (
              <div className="flex h-48 items-center justify-center text-center text-muted-foreground">
                <p>Please select a date first to see available times</p>
              </div>
            ) : isLoadingSlots ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isAvailable = isTimeSlotAvailable(slot.time)
                  const isSelected = selectedTime === slot.time

                  return (
                    <button
                      key={slot.id}
                      onClick={() => isAvailable && setSelectedTime(slot.time)}
                      disabled={!isAvailable}
                      className={cn(
                        "border p-3 text-sm font-medium transition-all",
                        isSelected
                          ? "border-accent bg-accent text-accent-foreground"
                          : isAvailable
                            ? "border-border bg-background text-foreground hover:border-accent hover:bg-accent/5"
                            : "cursor-not-allowed border-border bg-muted text-muted-foreground line-through opacity-50",
                      )}
                    >
                      {slot.label}
                      {!isAvailable && <span className="ml-1 text-xs">(Booked)</span>}
                    </button>
                  )
                })}
              </div>
            )}
            {selectedTime && (
              <div className="mt-4 bg-accent/10 p-3 text-center">
                <p className="text-sm font-medium text-foreground">
                  {TIME_SLOTS.find((s) => s.time === selectedTime)?.label}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-accent bg-accent/5 p-4"
        >
          <div className="flex items-center justify-center gap-2 text-center">
            <CalendarDays className="h-5 w-5 text-accent" />
            <span className="font-medium text-foreground">
              Your appointment: {format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
              {TIME_SLOTS.find((s) => s.time === selectedTime)?.label}
            </span>
          </div>
        </motion.div>
      )}

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
          onClick={handleContinue}
          className="gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
