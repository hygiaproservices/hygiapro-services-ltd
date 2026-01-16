import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hygiaproservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/about", "/services", "/contact", "/booking"];

  const serviceRoutes = services.map((service) => `/services/${service.id}`);

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
