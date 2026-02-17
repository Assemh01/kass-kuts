import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://kassemkuts.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kass Kuts | Barbershop in Michigan",
    template: "%s | Kass Kuts",
  },
  description:
    "Modern barbershop offering fades, beard trims, and grooming services. Book appointments online.",
  applicationName: "Kass Kuts",
  keywords: [
    "Kass Kuts",
    "barbershop",
    "haircut",
    "fade",
    "beard trim",
    "Michigan",
    "Farmington Hills",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kass Kuts | Barbershop in Michigan",
    description:
      "Modern barbershop offering fades, beard trims, and grooming services. Book appointments online.",
    url: SITE_URL,
    siteName: "Kass Kuts",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kass Kuts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kass Kuts | Barbershop in Michigan",
    description:
      "Modern barbershop offering fades, beard trims, and grooming services. Book appointments online.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-QCRRG5PHB6";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showGA = typeof GA_ID === "string" && GA_ID.startsWith("G-");

  // Only Farmington Hills (since site footer/contact is now Farmington-only)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Kass Kuts",
        url: SITE_URL,
        telephone: "+13136754086",
      },
      {
        "@type": "Barbershop",
        "@id": `${SITE_URL}/#farmington-hills`,
        name: "Kass Kuts — Farmington Hills",
        url: SITE_URL,
        telephone: "+13136754086",
        address: {
          "@type": "PostalAddress",
          streetAddress: "32408 W 8 Mile Rd",
          addressLocality: "Farmington Hills",
          addressRegion: "MI",
          postalCode: "48336",
          addressCountry: "US",
        },
        hasMap: "https://maps.app.goo.gl/JrCkkJUvywyoKs2b7",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Tuesday",
            opens: "11:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Wednesday",
            opens: "11:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Thursday",
            opens: "11:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "11:00",
            closes: "19:00",
          },
        ],
        potentialAction: {
          "@type": "ReserveAction",
          target:
            "https://booksy.com/en-us/1584930_kass-kuts_barber-shop_23574_farmington?do=invite#ba_s=dl_1",
        },
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Local SEO structured data */}
        <Script
          id="kasskuts-local-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(localBusinessSchema)}
        </Script>

        {/* Google Analytics (GA4) */}
        {showGA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}
