import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  Clock,
  MapPin,
  XCircle,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { verifyPaystackPayment } from "@/actions/paystack";
import { getBookingByReference } from "@/actions/bookings";
import { TIME_SLOTS } from "@/lib/booking-utils";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Booking Confirmed | Hygiapro",
  description: "Your cleaning service has been booked successfully.",
};

interface SuccessPageProps {
  searchParams: Promise<{ reference?: string }>;
}

export default async function BookingSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { reference } = await searchParams;

  let bookingData = null;
  let verificationSuccess = false;

  if (reference) {
    // Verify payment
    const verificationResult = await verifyPaystackPayment(reference);
    verificationSuccess = verificationResult.success;

    // Get booking details
    const bookingResult = await getBookingByReference(reference);
    if (bookingResult.success && bookingResult.data) {
      bookingData = bookingResult.data;
    }
  }

  const formatTimeLabel = (time: string) => {
    return TIME_SLOTS.find((slot) => slot.time === time)?.label || time;
  };

  if (!reference || !bookingData) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center px-6 pt-20">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center bg-destructive">
              <XCircle className="h-10 w-10 text-destructive-foreground" />
            </div>
            <h1 className="mb-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Booking Not Found
            </h1>
            <p className="mb-8 text-muted-foreground">
              We couldn't find your booking. Please check your reference number
              or contact support.
            </p>
            <Button
              asChild
              className="gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/">
                Return Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-6 py-32">
        <div className="mx-auto max-w-lg text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center bg-accent">
            <CheckCircle className="h-10 w-10 text-accent-foreground" />
          </div>

          <h1 className="mb-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Booking Confirmed
          </h1>

          <p className="mb-8 text-muted-foreground">
            Thank you for choosing Hygiapro,{" "}
            {bookingData.customerName.split(" ")[0]}! Your cleaning service has
            been booked successfully. We've sent a confirmation to{" "}
            {bookingData.customerEmail}.
          </p>

          {/* Reference */}
          <div className="mb-6 border border-accent bg-accent/10 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Reference Number
            </p>
            <p className="mt-1 font-mono text-lg font-medium text-foreground">
              {reference}
            </p>
          </div>

          {/* Booking Summary */}
          <div className="mb-8 border border-border bg-card p-6 text-left">
            <h2 className="mb-4 font-semibold text-foreground">
              Booking Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <span className="text-muted-foreground">Date: </span>
                  <span className="font-medium text-foreground">
                    {format(
                      new Date(bookingData.bookingDate),
                      "EEEE, MMMM d, yyyy"
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <span className="text-muted-foreground">Time: </span>
                  <span className="font-medium text-foreground">
                    {formatTimeLabel(bookingData.bookingTime)}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <span className="text-muted-foreground">Services: </span>
                  <span className="font-medium text-foreground">
                    {bookingData.services.map((s) => s.name).join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">
                  Total Paid
                </span>
                <span className="font-semibold text-accent">
                  ₦{bookingData.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-8 border border-border bg-secondary p-6 text-left">
            <h2 className="mb-4 font-semibold text-foreground">
              What happens next?
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  Our team will arrive at your scheduled date and time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>We'll call you 30 minutes before arrival to confirm</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Check your email for booking details and receipt</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/">
                Return Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
