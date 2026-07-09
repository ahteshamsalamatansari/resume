import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ahtesham Salamat Ansari — AI Engineer',
  description:
    'AI Engineer building production GenAI, RAG systems, and data intelligence at scale. 50M+ records processed, sub-second retrieval, real business outcomes.',
  keywords: ['AI Engineer', 'GenAI', 'RAG', 'LLM', 'Data Engineering', 'MLOps'],
  openGraph: {
    title: 'Ahtesham Salamat Ansari — AI Engineer',
    description:
      'Production GenAI, RAG systems, and data intelligence at scale.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
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
      <body className="font-sans antialiased bg-dark text-paper grain">
        {children}
      </body>
    </html>
  );
}
