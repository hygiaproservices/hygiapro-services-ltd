import { addDays, format, isBefore, startOfDay } from "date-fns"

export interface TimeSlot {
  id: string
  time: string
  label: string
  available: boolean
}

export const TIME_SLOTS: TimeSlot[] = [
  { id: "morning-early", time: "08:00", label: "8:00 AM", available: true },
  { id: "morning-mid", time: "09:00", label: "9:00 AM", available: true },
  { id: "morning-late", time: "10:00", label: "10:00 AM", available: true },
  { id: "midday-early", time: "11:00", label: "11:00 AM", available: true },
  { id: "midday", time: "12:00", label: "12:00 PM", available: true },
  { id: "afternoon-early", time: "13:00", label: "1:00 PM", available: true },
  { id: "afternoon-mid", time: "14:00", label: "2:00 PM", available: true },
  { id: "afternoon-late", time: "15:00", label: "3:00 PM", available: true },
  { id: "evening-early", time: "16:00", label: "4:00 PM", available: true },
  { id: "evening-mid", time: "17:00", label: "5:00 PM", available: true },
]

export function getAvailableDates(daysAhead = 30): Date[] {
  const dates: Date[] = []
  const today = startOfDay(new Date())
  const startDate = addDays(today, 1) // Start from tomorrow

  for (let i = 0; i < daysAhead; i++) {
    const date = addDays(startDate, i)
    // Exclude Sundays (optional - can be adjusted)
    if (date.getDay() !== 0) {
      dates.push(date)
    }
  }

  return dates
}

export function isDateAvailable(date: Date): boolean {
  const today = startOfDay(new Date())
  // Must be at least tomorrow
  if (isBefore(date, addDays(today, 1))) {
    return false
  }
  // No Sundays
  if (date.getDay() === 0) {
    return false
  }
  return true
}

export function formatDateForDisplay(date: Date): string {
  return format(date, "EEEE, MMMM d, yyyy")
}

export function formatDateForStorage(date: Date): string {
  return format(date, "yyyy-MM-dd")
}
