import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webconcoction.com"),
  title: {
    default: "WebConcoction | Custom Websites, Domains & Hosting",
    template: "%s | WebConcoction",
  },
  description:
    "WebConcoction builds and hosts custom websites for businesses. Managed cPanel hosting from $19.99/mo, domain registration, and professional website design from $699.99.",
  keywords: [
    "custom website design",
    "web hosting",
    "domain registration",
    "cPanel hosting",
    "website development",
    "managed hosting",
    "small business website",
    "professional web design",
    "affordable web hosting",
    "website builder for small business",
  ],
  authors: [{ name: "WebConcoction", url: "https://webconcoction.com" }],
  creator: "WebConcoction",
  publisher: "WebConcoction LLC",
  category: "Web Design & Hosting",
  alternates: {
    canonical: "https://webconcoction.com",
  },
  openGraph: {
    title: "WebConcoction | Custom Websites, Domains & Hosting",
    description:
      "We build and host custom websites for businesses. Hosting from $19.99/mo, domain registration, and professional website builds from $699.99.",
    url: "https://webconcoction.com",
    siteName: "WebConcoction",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WebConcoction — Custom Websites, Domains & Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebConcoction | Custom Websites, Domains & Hosting",
    description:
      "Custom websites, managed hosting from $19.99/mo, and domain registration. We build it, you run your business.",
    images: ["/opengraph-image"],
    creator: "@webconcoction",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",   // ← paste your Google Search Console verification token here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
