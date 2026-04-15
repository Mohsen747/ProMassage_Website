import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteUrl } from "@/lib/siteUrl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ProMassage | Therapeutic Massage in Kirkland",
    template: "%s | ProMassage",
  },
  description:
    "Professional therapeutic massage in Kirkland focused on pain relief, tension reduction, recovery, and personalized care.",
  metadataBase: new URL(getSiteUrl()),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-50 text-stone-800 font-sans antialiased">
        <Navbar />
        <main className="pb-16 pt-[5.25rem] md:pb-0 md:pt-[6rem]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
