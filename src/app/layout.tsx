import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tgtanalytics.com"),
  title: "TGT Analytics — Real-World Business, AI-Powered Solutions",
  description:
    "TGT Analytics builds high-throughput software architectures, autonomous operational agents, and predictive Business Intelligence tailored for real-world enterprise & SMB workflows.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI Business Automation",
    "TGT Analytics",
    "Predictive Business Intelligence",
    "Custom Software Engineering",
    "Enterprise Workflow Optimization",
  ],
  authors: [{ name: "TGT Analytics LLC", url: "https://tgtanalytics.com" }],
  openGraph: {
    title: "TGT Analytics — Real-World Business, AI-Powered Solutions",
    description:
      "Translating complex real-world operational problems into custom software architectures, autonomous workflow agents, and predictive Business Intelligence.",
    url: "https://tgtanalytics.com",
    siteName: "TGT Analytics",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGT Analytics — Real-World Business, AI-Powered Solutions",
    description:
      "Enterprise software, autonomous workflow agents, and predictive BI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TGT Analytics LLC",
    url: "https://tgtanalytics.com",
    logo: "https://tgtanalytics.com/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/tgtanalytics",
      "https://github.com/tgtanalytics",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contact@tgtanalytics.com",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#101010] text-[#eeeeee] font-sans antialiased selection:bg-[#ee6018]/30 selection:text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
