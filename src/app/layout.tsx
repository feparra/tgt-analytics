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
  title: "TGT Analytics — Real-World Business, AI-Powered Solutions",
  description:
    "TGT Analytics builds high-throughput software architectures, autonomous operational agents powered by SyncBiz, and predictive Business Intelligence tailored for real-world enterprise & SMB workflows.",
  keywords: [
    "AI Business Agents",
    "SyncBiz Agent",
    "TGT Analytics",
    "Predictive Business Intelligence",
    "Custom Software Engineering",
    "SMB Workflow Automation",
    "Enterprise AI Systems",
  ],
  authors: [{ name: "TGT Analytics" }],
  openGraph: {
    title: "TGT Analytics — Real-World Business, AI-Powered Solutions",
    description:
      "Translating complex real-world operational problems into autonomous AI agents, custom software architectures, and predictive Business Intelligence.",
    url: "https://syncbizagent.com",
    siteName: "TGT Analytics",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGT Analytics — Real-World Business, AI-Powered Solutions",
    description:
      "Enterprise software, autonomous SyncBiz business agents, and predictive BI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TGT Analytics",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud, Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Technical Workflow Consultation",
    },
    creator: {
      "@type": "Organization",
      name: "TGT Analytics LLC",
      url: "https://syncbizagent.com",
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
