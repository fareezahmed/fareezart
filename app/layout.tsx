import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import LenisProvider from "./components/LenisProvider";
import SkipToContent from "./components/SkipToContent";
import StructuredData from "./components/StructuredData";
import Preloader from "./components/Preloader";
import Analytics from "./components/Analytics";
import PerformanceMonitor from "./components/PerformanceMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "FareezArt - Frontend Developer & Next.js Expert",
    template: "%s | FareezArt"
  },
  description: "Professional frontend developer specializing in Next.js, React, TypeScript, and modern web technologies. Creating accessible, performant, and SEO-optimized web applications.",
  keywords: [
    "Next.js", 
    "React", 
    "TypeScript", 
    "Tailwind CSS", 
    "Web Development", 
    "Frontend Developer",
    "Web Accessibility",
    "SEO",
    "Performance Optimization",
    "Modern Web Technologies"
  ],
  authors: [{ name: "FareezArt", url: "https://fareezart.vercel.app" }],
  creator: "FareezArt",
  publisher: "FareezArt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fareezart.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FareezArt - Frontend Developer & Next.js Expert",
    description: "Professional frontend developer specializing in Next.js, React, TypeScript, and modern web technologies. Creating accessible, performant, and SEO-optimized web applications.",
    url: "https://fareezart.vercel.app",
    siteName: "FareezArt",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "FareezArt - Frontend Developer & Next.js Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FareezArt - Frontend Developer & Next.js Expert",
    description: "Professional frontend developer specializing in Next.js, React, TypeScript, and modern web technologies.",
    images: ["/og-image.svg"],
    creator: "@fareezart",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Web Development",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <Preloader 
            heroImageSelector="img[data-hero]"
            minDisplayTime={500}
            preloadImages={['/next.svg', '/og-image.svg']}
          />
          <SkipToContent />
          <Header />
          <main id="content" role="main" tabIndex={-1}>
            {children}
          </main>
          <footer role="contentinfo" className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 FareezArt. All rights reserved.</p>
              <p className="mt-2 text-sm text-gray-400">
                Built with Next.js 15, TypeScript, and Tailwind CSS
              </p>
            </div>
          </footer>
        </LenisProvider>
        <Analytics />
        <PerformanceMonitor />
      </body>
    </html>
  );
}
