import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puzzle.salimi.my"),
  title: {
    default: "Programming Language Puzzle Solver | Logic & Inference Engine",
    template: "%s | Programming Language Puzzle Solver",
  },
  description:
    "Interactive logic puzzle solver demonstrating formal Rules of Inference from discrete mathematics. Solve the programming language challenge using constraint satisfaction and step-by-step logical deduction with Python, Java, C++, Ruby, and Swift.",
  keywords: [
    "logic puzzle",
    "discrete structures",
    "rules of inference",
    "constraint satisfaction problem",
    "CSP solver",
    "formal logic",
    "modus ponens",
    "disjunctive syllogism",
    "programming languages",
    "educational tool",
    "interactive solver",
    "proof visualization",
    "logical deduction",
    "discrete mathematics",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Swift",
  ],
  authors: [
    { name: "Azmeer" },
    { name: "Ikram" },
    { name: "Syah" },
    { name: "Hafiy" },
    { name: "Salimi" },
  ],
  creator: "Discrete Structures Group 1 (NBCS2554A)",
  publisher: "Universiti Teknologi MARA",
  category: "Education",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Programming Language Puzzle Solver | Logic & Inference Engine",
    description:
      "Interactive logic puzzle solver with formal Rules of Inference. Watch step-by-step logical deduction or solve manually using constraint satisfaction.",
    siteName: "Programming Language Puzzle Solver",
    images: [
      {
        url: "/meta-image.jpg",
        width: 1200,
        height: 630,
        alt: "Programming Language Puzzle Solver - Interactive Logic and Inference Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programming Language Puzzle Solver | Logic & Inference Engine",
    description:
      "Interactive logic puzzle solver demonstrating formal Rules of Inference. Solve the programming language challenge step-by-step.",
    images: ["/meta-image.jpg"],
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
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#6d28d9" },
  ],
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
