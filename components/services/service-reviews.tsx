"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface ServiceReview {
  id: string;
  serviceId: string;
  name: string;
  city: "Jos" | "Abuja";
  rating: number;
  message: string;
  createdAt: string;
}

interface ServiceReviewsProps {
  serviceId: string;
  serviceName: string;
}

const STORAGE_KEY = "hygiapro-reviews";

export function ServiceReviews({ serviceId, serviceName }: ServiceReviewsProps) {
  const [reviews, setReviews] = useState<ServiceReview[]>([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState<"Jos" | "Abuja">("Jos");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setReviews(JSON.parse(stored) as ServiceReview[]);
      } catch {
        setReviews([]);
      }
    }
  }, []);

  const serviceReviews = useMemo(
    () => reviews.filter((review) => review.serviceId === serviceId),
    [reviews, serviceId]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in your name and review.");
      return;
    }

    const newReview: ServiceReview = {
      id: `${serviceId}-${Date.now()}`,
      serviceId,
      name: name.trim(),
      city,
      rating,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setName("");
    setCity("Jos");
    setRating(5);
    setMessage("");
    toast.success("Thanks for sharing your review.");
  };

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Reviews
            </p>
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Share your experience with {serviceName}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Your feedback helps others choose the right service.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            {serviceReviews.length === 0 ? (
              <div className="border border-border bg-secondary p-6 text-sm text-muted-foreground">
                No reviews yet. Be the first to share your experience.
              </div>
            ) : (
              serviceReviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${review.id}-star-${index}`}
                          className={
                            index < review.rating
                              ? "h-4 w-4 fill-current"
                              : "h-4 w-4 text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {review.message}
                  </p>
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-border bg-card p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Name
                  <input
                    className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                  />
                </label>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  City
                  <select
                    className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
                    value={city}
                    onChange={(event) =>
                      setCity(event.target.value as "Jos" | "Abuja")
                    }>
                    <option value="Jos">Jos</option>
                    <option value="Abuja">Abuja</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Rating
                  <select
                    className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
                    value={rating}
                    onChange={(event) =>
                      setRating(Number(event.target.value))
                    }>
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value} star{value > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Review
                  <textarea
                    className="mt-2 min-h-[120px] w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Share your experience..."
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-none bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
