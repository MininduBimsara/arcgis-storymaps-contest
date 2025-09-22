import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Metadata for the entire application
export const metadata: Metadata = {
  title: {
    default: "Ceylon Stories - 2025 ArcGIS StoryMaps Competition",
    template: "%s | Ceylon Stories",
  },
  description:
    "Join the 2025 ArcGIS StoryMaps Competition and showcase the hidden treasures of Ceylon through interactive digital storytelling. Discover Sri Lanka through stories.",
  keywords: [
    "Sri Lanka",
    "Ceylon",
    "ArcGIS",
    "StoryMaps",
    "Competition",
    "Digital Storytelling",
    "Travel",
    "Culture",
    "Geography",
    "Mapping",
  ],
  authors: [{ name: "Ceylon Stories Team" }],
  creator: "Ceylon Stories",
  publisher: "Ceylon Stories",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ceylonstories.com"), // Replace with your actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ceylonstories.com", // Replace with your actual domain
    siteName: "Ceylon Stories",
    title: "Ceylon Stories - 2025 ArcGIS StoryMaps Competition",
    description: "Discover Sri Lanka through interactive digital storytelling",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Ceylon Stories - Discover Sri Lanka through Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Stories - 2025 ArcGIS StoryMaps Competition",
    description: "Discover Sri Lanka through interactive digital storytelling",
    images: ["/og-image.jpg"], // Same image as OpenGraph
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
    // Add your verification IDs here when you have them
    // google: 'your-google-verification-id',
    // yandex: 'your-yandex-verification-id',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest for PWA support */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#4A4A7C" />
        <meta name="msapplication-TileColor" content="#4A4A7C" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* ArcGIS API CSS - Load early for better performance */}
        <link
          rel="stylesheet"
          href="https://js.arcgis.com/4.28/esri/themes/light/main.css"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        {/* Global Navigation */}
        <Navigation />

        {/* Main content wrapper */}
        <div id="main-content">{children}</div>

        {/* ArcGIS JavaScript API - Load at the end for better performance */}
        <script src="https://js.arcgis.com/4.28/" async />

        {/* Analytics scripts can be added here */}
        {/* 
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        */}
      </body>
    </html>
  );
}
