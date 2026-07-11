import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Instrument_Serif, Syne, Caveat } from "next/font/google";
import LenisProvider from "@/components/layout/LenisProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Albin Jojo — AI Engineer & Systems Builder",
  description:
    "Building intelligent interfaces, AI systems, and full-stack digital products. AI engineer, systems architect, and experimental frontend developer.",
  keywords: [
    "AI engineer",
    "systems builder",
    "LLM",
    "machine learning",
    "full-stack",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Albin Jojo" }],
  openGraph: {
    title: "Albin Jojo — AI Engineer & Systems Builder",
    description:
      "Building intelligent interfaces, AI systems, and full-stack digital products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} ${instrumentSerif.variable} ${syne.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="grain-layer" aria-hidden="true" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
