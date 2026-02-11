"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { AddToCartButton } from "@/components/services/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { formatPrice, type Service } from "@/lib/services-data";
import type { CartPricingSelection } from "@/store/booking-store";

interface ServicePricingSectionProps {
  service: Service;
}

export function ServicePricingSection({
  service,
}: ServicePricingSectionProps) {
  const cities = service.pricing;
  const defaultCity = cities[0]?.city ?? "Jos";

  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const selectedCityPricing =
    cities.find((pricing) => pricing.city === selectedCity) ?? cities[0];

  const [selectedSize, setSelectedSize] = useState(
    selectedCityPricing?.tiers[0]?.label ?? ""
  );

  const selectedTier = useMemo(
    () =>
      selectedCityPricing?.tiers.find((tier) => tier.label === selectedSize) ??
      selectedCityPricing?.tiers[0],
    [selectedCityPricing, selectedSize]
  );

  const [selectedPrice, setSelectedPrice] = useState(selectedTier?.min ?? 0);

  useEffect(() => {
    if (selectedCityPricing?.tiers[0]?.label) {
      setSelectedSize(selectedCityPricing.tiers[0].label);
    }
  }, [selectedCityPricing?.tiers]);

  useEffect(() => {
    if (selectedTier) {
      setSelectedPrice(selectedTier.min);
    }
  }, [selectedTier]);

  const isInspectionOnly = Boolean(
    selectedCityPricing &&
      selectedCityPricing.tiers.every((tier) => tier.min === 0 && tier.max === 0)
  );
  const isFixedPrice = Boolean(
    selectedTier && selectedTier.min === selectedTier.max && selectedTier.max > 0
  );

  const pricingSelection: CartPricingSelection | undefined =
    selectedTier && selectedCityPricing
      ? {
          city: selectedCityPricing.city,
          size: selectedTier.label,
          min: selectedTier.min,
          max: selectedTier.max,
          price: selectedPrice,
          unit: selectedCityPricing.unit,
          note: selectedCityPricing.note,
        }
      : undefined;

  return (
    <div className="mt-6 space-y-8">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Pricing Guide
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {service.pricing.map((pricing) => (
            <div
              key={pricing.city}
              className="border border-border bg-card">
              <div className="border-b border-border p-4">
                <p className="text-sm font-semibold text-foreground">
                  {pricing.city}
                </p>
                <p className="text-xs text-muted-foreground">{pricing.unit}</p>
              </div>
              <div className="grid gap-3 p-4">
                {pricing.tiers.map((tier) => (
                  <div
                    key={`${pricing.city}-${tier.label}`}
                    className="flex items-start gap-3 bg-background p-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-foreground">
                      <Check className="h-4 w-4 text-background" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {tier.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tier.min === 0 && tier.max === 0
                          ? "Inspection required"
                          : `${formatPrice(tier.min)} - ${formatPrice(tier.max)}`}
                      </p>
                    </div>
                  </div>
                ))}
                {pricing.note && (
                  <p className="text-xs text-muted-foreground">
                    {pricing.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border bg-secondary p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Select City & Size
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-muted-foreground">
            City
            <select
              className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}>
              {cities.map((pricing) => (
                <option key={pricing.city} value={pricing.city}>
                  {pricing.city}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted-foreground">
            Size
            <select
              className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground"
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}>
              {selectedCityPricing?.tiers.map((tier) => (
                <option key={tier.label} value={tier.label}>
                  {tier.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedTier && !isInspectionOnly && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated range</span>
              <span className="font-medium text-foreground">
                {formatPrice(selectedTier.min)} - {formatPrice(selectedTier.max)}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <input
                type="range"
                min={selectedTier.min}
                max={selectedTier.max}
                step={1000}
                value={selectedPrice}
                onChange={(event) =>
                  setSelectedPrice(Number(event.target.value))
                }
                disabled={isFixedPrice}
                className="w-full accent-foreground"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={selectedTier.min}
                  max={selectedTier.max}
                  step={1000}
                  value={selectedPrice}
                  onChange={(event) =>
                    setSelectedPrice(Number(event.target.value))
                  }
                  className="w-36 border border-border bg-background px-3 py-2 text-sm text-foreground"
                  disabled={isFixedPrice}
                />
                <span className="text-xs text-muted-foreground">NGN</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isFixedPrice
                ? "This service has a fixed price for the selected size."
                : "Choose any amount within the range. Final pricing is confirmed before service delivery."}
            </p>
          </div>
        )}
        {selectedTier && isInspectionOnly && (
          <div className="mt-6 rounded-none border border-border bg-background p-4 text-sm text-muted-foreground">
            Pricing is determined after inspection. Please request a quote to
            proceed.
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <AddToCartButton
            service={service}
            pricingSelection={pricingSelection}
            disabled={!pricingSelection || isInspectionOnly}
          />
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 rounded-none bg-transparent px-8">
            <Link href="/contact">Get Custom Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
