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

export const metadata: Metadata = {
  title: "Hygiapro | Professional Cleaning Services",
  description:
    "Experience the art of cleanliness. Professional cleaning services for discerning homes and businesses. Book online, pay securely.",
  keywords: [
    "premium cleaning",
    "luxury cleaning service",
    "professional cleaning",
    "home cleaning Lagos",
    "office cleaning Nigeria",
  ],
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
