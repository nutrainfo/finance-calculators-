import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PWAInstallBanner from "@/components/pwa-install-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calculatefuture.in"),
  title: {
    default: "Calculate Future - India's #1 Financial Calculator Platform",
    template: "%s | Calculate Future",
  },
  description:
    "India's most advanced financial calculator platform. Calculate SIP returns, FD interest, loan EMI, income tax, and 30+ financial tools. Free, accurate & instant.",
  keywords: [
    "SIP calculator", "FD calculator", "EMI calculator", "income tax calculator",
    "mutual fund calculator", "retirement calculator", "India financial calculator",
    "investment calculator", "lumpsum calculator", "RD calculator",
  ],
  authors: [{ name: "Calculate Future" }],
  creator: "Calculate Future",
  publisher: "Calculate Future",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://calculatefuture.in",
    siteName: "Calculate Future",
    title: "Calculate Future - India's #1 Financial Calculator Platform",
    description: "Free, accurate financial calculators for SIP, FD, EMI, income tax and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Calculate Future" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculate Future - India's #1 Financial Calculator Platform",
    description: "Free, accurate financial calculators for SIP, FD, EMI, income tax and more.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "CalcFuture" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b0e11" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e11" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CalcFuture" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0e11] text-[#e2e8f0]`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <PWAInstallBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
