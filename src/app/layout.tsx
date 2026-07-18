import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/site/language-provider";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://thehandymangroup.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "The Handyman & Carpentry Group | Brisbane Carpenters & Handymen",
    template: "%s | The Handyman & Carpentry Group",
  },
  description:
    "Brisbane's trusted family-owned team for licensed carpentry, handyman services, renovations, commercial fit-outs and structural landscaping. QBCC licensed, Master Builders QLD members. No job is too small.",
  applicationName: "The Handyman & Carpentry Group",
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
  creator: "The Handyman & Carpentry Group",
  publisher: "The Handyman & Carpentry Group",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Handyman & Carpentry Group | Brisbane Carpenters & Handymen",
    description:
      "Family-owned by Joe & Claudia. Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane. No job is too small.",
    url: SITE_URL,
    siteName: "The Handyman & Carpentry Group",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Handyman & Carpentry Group | Brisbane",
    description:
      "Family-owned by Joe & Claudia. Licensed carpentry, handyman services, renovations and structural landscaping across Brisbane.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
};

/**
 * JSON-LD structured data for LocalBusiness — improves SEO and rich results.
 * Inline-rendered as a <script type="application/ld+json"> tag.
 */
const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "The Handyman & Carpentry Group",
  alternateName: "Joe Lewis Handyman",
  description:
    "Family-owned Brisbane team for licensed carpentry, handyman services, renovations, commercial fit-outs and structural landscaping. QBCC licensed and Master Builders Queensland members.",
  url: SITE_URL,
  telephone: "+61730535274",
  email: "info@thehandymangroup.com.au",
  image: `${SITE_URL}/ai-media/hero-carpenter.png`,
  logo: `${SITE_URL}/logo.svg`,
  priceRange: "$$",
  foundingDate: "2017",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
  },
  areaServed: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brisbane",
    addressRegion: "QLD",
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/thehandymangroup/",
    "https://www.facebook.com/thehandymangroup/",
  ],
  slogan: "No Job Is Too Small",
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
        {/* Skip-to-content link — visible on focus, helps keyboard & screen-reader users bypass the header. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-[#121117] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
        <script
          type="application/ld+json"
          // JSON.stringify output is safe to inject into a script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
      </body>
    </html>
  );
}
