import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import UpdateRibbon from "./components/UpdateRibbon";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bloodconnect.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Blood Connect – Find Blood Donors & Register as a Donor | Blood Donation",
    template: "%s | Blood Connect",
  },
  description:
    "Find blood donors by blood type and city. Register as a voluntary blood donor. Blood donation saves lives – connect with donors, request blood, and help others. Every drop counts.",
  keywords: [
    "blood donation",
    "blood donors",
    "find blood donor",
    "blood bank",
    "voluntary blood donation",
    "blood type",
    "donate blood",
    "blood donor registry",
    "blood request",
    "emergency blood",
    "blood group",
    "blood donor near me",
    "blood donation camp",
    "save lives",
    "blood connect",
  ],
  authors: [{ name: "Blood Connect", url: siteUrl }],
  creator: "Blood Connect",
  publisher: "Blood Connect",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Blood Connect",
    title: "Blood Connect – Find Blood Donors & Register as a Donor",
    description:
      "Find blood donors by blood type and city. Register as a voluntary blood donor. Every drop counts, every donor matters.",
    images: [{ url: "/blood.png", width: 512, height: 512, alt: "Blood Connect" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Connect – Find Blood Donors & Register as a Donor",
    description: "Find blood donors by blood type and city. Register as a donor. Every drop counts.",
    images: ["/blood.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: { icon: "/blood.png", apple: "/blood.png" },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Blood Connect",
        description:
          "Find blood donors by blood type and city. Register as a voluntary blood donor. Every drop counts, every donor matters.",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Blood Connect",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/blood.png` },
        slogan: "Every Drop Counts, Every Donor Matters",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee+Spice&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col relative">
        {process.env.NEXT_PUBLIC_SHOW_UPDATE_RIBBON === "true" && <UpdateRibbon />}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
