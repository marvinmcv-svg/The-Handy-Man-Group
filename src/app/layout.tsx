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
  title: "The Handyman & Carpentry Group | Brisbane Carpenters & Handymen",
  description:
    "Brisbane's trusted family-owned team for licensed carpentry, handyman services, renovations, commercial fit-outs and structural landscaping. QBCC licensed, Master Builders QLD members. No job is too small.",
  keywords: [
    "handyman Brisbane",
    "carpentry Brisbane",
    "home renovations Brisbane",
    "structural landscaping Queensland",
    "commercial fit-outs Brisbane",
    "QBCC licensed carpenter",
    "Master Builders Queensland",
    "Joe Lewis Handyman",
    "The Handyman Group",
  ],
  authors: [{ name: "Joe & Claudia — The Handyman & Carpentry Group" }],
  openGraph: {
    title: "The Handyman & Carpentry Group | Brisbane Carpenters & Handymen",
    description:
      "Family-owned by Joe & Claudia. Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane. No job is too small.",
    url: "https://thehandymangroup.com.au",
    siteName: "The Handyman & Carpentry Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Handyman & Carpentry Group | Brisbane",
    description:
      "Family-owned by Joe & Claudia. Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane.",
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
