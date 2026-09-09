import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://rmnlove.com"),
  title: {
    default: "WordCounter - Fast Client-Side Word & Character Counter",
    template: "%s | WordCounter",
  },
  description:
    "Free, privacy-first real-time word counter, character calculator, and keyword density analyzer operating 100% in local browser memory.",
  keywords: [
    "word counter",
    "character count",
    "reading time calculator",
    "keyword density analyzer",
    "rmnlove wordcounter",
  ],
  authors: [{ name: "WordCounter Editorial Team", url: "https://rmnlove.com" }],
  creator: "rmnlove.com",
  openGraph: {
    title: "WordCounter - Instant Text Telemetry & Analysis",
    description:
      "Count words, characters, sentences, paragraphs, and keyword density in real-time with zero server uploads.",
    url: "https://rmnlove.com",
    siteName: "WordCounter",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-8492826711901338",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8492826711901338" />
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8492826711901338"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}