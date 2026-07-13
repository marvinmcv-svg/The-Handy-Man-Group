import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Handy Man Group | Trusted Handyman Services in Australia",
  description:
    "The Handy Man Group delivers premium carpentry, renovations, painting and property maintenance across Australia. Reliable, licensed and insured tradespeople for your home and business.",
  keywords: [
    "handyman Australia",
    "carpentry services",
    "home renovations",
    "painting services",
    "property maintenance",
    "The Handy Man Group",
    "tradespeople",
    "handyman Sydney",
  ],
  authors: [{ name: "The Handy Man Group" }],
  openGraph: {
    title: "The Handy Man Group | Trusted Handyman Services in Australia",
    description:
      "Premium carpentry, renovations, painting and property maintenance by licensed, insured professionals.",
    url: "https://thehandymangroup.com.au",
    siteName: "The Handy Man Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Handy Man Group | Trusted Handyman Services in Australia",
    description:
      "Premium carpentry, renovations, painting and property maintenance by licensed, insured professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${publicSans.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-public-sans), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
