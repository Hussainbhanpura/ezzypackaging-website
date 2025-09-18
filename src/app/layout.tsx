import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SEO } from "@/components/SEO";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ezzy Packaging Solutions - India's Premier Glass Film Manufacturer",
  description: "Leading manufacturer of premium glass etching films and surface protection solutions. Trusted by major corporations across India. Mumbai-based since 2013.",
  metadataBase: new URL("https://www.ezzypackagingsolutions.com"),
  keywords: ["glass etching film", "surface protection film", "premium packaging", "Mumbai manufacturer", "corporate supplier"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://www.ezzypackagingsolutions.com/",
    type: "website",
    siteName: "Ezzy Packaging Solutions",
    title: "Ezzy Packaging Solutions - India's Premier Glass Film Manufacturer",
    description: "Leading manufacturer of premium glass etching films and surface protection solutions.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ezzypackaging",
    title: "Ezzy Packaging Solutions - India's Premier Glass Film Manufacturer",
    description: "Premium glass etching films and surface protection solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SEO />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
