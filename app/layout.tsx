import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "Builder by HotCode AI — Build Websites in Seconds",
    template: "%s | Builder by HotCode AI",
  },
  description:
    "Describe what you need and our AI generates a complete, production-ready website in under 60 seconds. No code, no templates, no waiting.",
  keywords: [
    "AI website builder",
    "website generator",
    "no-code",
    "Next.js",
    "HotCode AI",
  ],
  openGraph: {
    title: "Builder by HotCode AI — Build Websites in Seconds",
    description:
      "Describe what you need and our AI generates a complete, production-ready website in under 60 seconds.",
    type: "website",
    url: "https://builder.hotcode.ai",
    siteName: "Builder by HotCode AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Builder by HotCode AI",
    description:
      "Build production-ready websites in under 60 seconds with AI.",
    creator: "@hotcodeai",
  },
  metadataBase: new URL("https://builder.hotcode.ai"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}