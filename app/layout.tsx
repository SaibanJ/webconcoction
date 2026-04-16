import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "WebConcoction | Custom Websites, Domains & Hosting",
  description:
    "WebConcoction builds and hosts custom websites for businesses. We offer domain registration, managed cPanel hosting plans starting at $19.99/mo, and professional website design and development. Setup fees from $699.99.",
  keywords: [
    "custom website design",
    "web hosting",
    "domain registration",
    "cPanel hosting",
    "WordPress hosting",
    "website development",
    "managed hosting",
    "small business website",
  ],
  openGraph: {
    title: "WebConcoction | Custom Websites, Domains & Hosting",
    description:
      "We build and host custom websites for businesses. Hosting plans from $19.99/mo with cPanel access, domain registration, and professional website builds from $699.99.",
    url: "https://webconcoction.com",
    siteName: "WebConcoction",
    type: "website",
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
      </body>
    </html>
  );
}
