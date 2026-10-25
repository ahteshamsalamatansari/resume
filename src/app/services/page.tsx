import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { ServiceGrid } from "@/components/service-grid";
import { Container } from "@/components/ui";
import { servicePages } from "@/content/services";
import { buildServicesIndexJsonLd } from "@/lib/schema";

const title = "AI Engineering Services: Automation, RAG Chatbots, AI Agents & Scraping";
const description =
  "AI engineering services on Upwork: AI automation audits, n8n AI outreach automation, Python web scraping, RAG chatbots, AI agents with MCP, and LLM integration.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title, description },
};

export default function ServicesPage() {
  const fixed = servicePages.filter((s) => s.packages);
  const custom = servicePages.filter((s) => !s.packages);
  return (
    <PageShell>
      <JsonLd data={buildServicesIndexJsonLd()} />
      <section aria-labelledby="services-index-title" className="py-14 sm:py-20">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <h1 id="services-index-title" className="mt-10 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Services
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
            AI automation, LLM applications, RAG chatbots, AI agents and Python data work. Packaged services are
            ordered from my Upwork Project Catalog; the rest are scoped per project on Upwork.
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-ink">Packaged services</h2>
          <ServiceGrid items={fixed} />

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-ink">Custom-scoped services</h2>
          <ServiceGrid items={custom} />
        </Container>
      </section>
    </PageShell>
  );
}
