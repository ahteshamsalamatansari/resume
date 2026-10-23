import type { Metadata, Viewport } from "next";
import { Dancing_Script, Google_Sans } from "next/font/google";
import { SITE_URL, VERIFICATION, site } from "@/config/site";
import "./globals.css";

const body = Google_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["Inter", "system-ui", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: false,
  display: "swap",
});

// Script face reserved for the name/signature only.
const signature = Dancing_Script({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Ahtesham Salamat Ansari",
    "AI Engineer",
    "LLM application development",
    "RAG developer",
    "Retrieval-Augmented Generation",
    "AI agent developer",
    "MCP integration",
    "n8n automation",
    "Python automation",
    "data pipelines",
    "LangChain",
    "OpenAI API",
    "Claude",
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
    firstName: "Ahtesham",
    lastName: "Salamat Ansari",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  verification: {
    ...(VERIFICATION.google && { google: VERIFICATION.google }),
    ...(VERIFICATION.bing && { other: { "msvalidate.01": VERIFICATION.bing } }),
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${signature.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
