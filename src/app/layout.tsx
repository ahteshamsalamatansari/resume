import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

import { SITE_URL, SITE_NAME, VERIFICATION, TWITTER_HANDLE } from '@/lib/site';
import { CONTACT, ALL_SKILLS } from '@/lib/data';
import { rootGraph } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const description =
  'Ahtesham Salamat Ansari is an AI Engineer building production GenAI, RAG systems and data intelligence at scale — 50M+ records processed, 180ms P95 retrieval.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Engineer`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    'Ahtesham Salamat Ansari',
    'Ahtesham Ansari',
    'AI Engineer',
    'GenAI Engineer',
    'RAG systems',
    'LLM engineering',
    'Machine Learning Engineer',
    'Data Engineering',
    'MLOps',
    ...ALL_SKILLS.slice(0, 10),
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI Engineer`,
    description,
    locale: 'en_US',
    firstName: 'Ahtesham',
    lastName: 'Ansari',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI Engineer`,
    description,
    creator: `@${TWITTER_HANDLE}`,
    site: `@${TWITTER_HANDLE}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  ...(VERIFICATION.google || VERIFICATION.bing
    ? {
        verification: {
          ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
          ...(VERIFICATION.bing ? { other: { 'msvalidate.01': VERIFICATION.bing } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <JsonLd data={rootGraph()} />
        <link rel="me" href={`mailto:${CONTACT.email}`} />
      </head>
      <body className="font-sans antialiased bg-dark text-paper grain">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
