import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import UpdateRibbon from "./components/UpdateRibbon";

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
      <body className="min-h-screen antialiased flex flex-col relative">
        <UpdateRibbon />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
