import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  metadataBase: new URL("https://promassage.ca"),
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
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
