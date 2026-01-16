import type React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const _dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hygiaproservices.com";
const siteName = "Hygiapro";
const siteDescription =
  "Experience the art of cleanliness. Professional cleaning services for discerning homes and businesses. Book online, pay securely.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteName} | Professional Cleaning Services`,
  description: siteDescription,
  keywords: [
    "premium cleaning",
    "luxury cleaning service",
    "professional cleaning",
    "home cleaning Jos / Abuja",
    "office cleaning Nigeria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteName} | Professional Cleaning Services`,
    description: siteDescription,
    siteName,
    images: [
      {
        url: "/icon-dark-32x32.png",
        width: 32,
        height: 32,
        alt: `${siteName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteName} | Professional Cleaning Services`,
    description: siteDescription,
    images: ["/icon-dark-32x32.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a2520",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <NextTopLoader
          color="#ff9911"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Header />

        {children}
        <Footer />

        <Toaster position="top-center" richColors />
        <WhatsAppButton />

        <Analytics />
      </body>
    </html>
  );
}
