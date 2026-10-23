import type { Metadata } from "next";
import { Container, SecondaryButton, Signature } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <Container className="flex min-h-screen flex-col items-start justify-center py-24">
        <Signature className="text-3xl text-brand-ink" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink">This page doesn&apos;t exist</h1>
        <p className="mt-3 max-w-[50ch] text-lg text-muted">
          The address may be from an older version of this site. Everything now lives on one page.
        </p>
        <SecondaryButton href="/" className="mt-8">
          Go to the home page
        </SecondaryButton>
      </Container>
    </main>
  );
}
