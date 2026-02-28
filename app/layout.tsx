import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Connect",
  description: "Blood donor registry - Every Drop Counts, Every Donor Matters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee+Spice&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f1f1f1] antialiased">{children}</body>
    </html>
  );
}
