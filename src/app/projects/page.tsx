import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Container, Tag } from "@/components/ui";
import { UPWORK_PROFILE_URL } from "@/config/site";
import { agentBuilds, projects } from "@/content/profile";
import { buildProjectsIndexJsonLd } from "@/lib/schema";

const description =
  "Case studies in AI automation, LLM pipelines and data engineering: an n8n outreach system for 7,000 prospects, a 1.5M-question generation pipeline, and data quality work from 78% to 94% accuracy.";

export const metadata: Metadata = {
  title: "Case Studies: AI Automation, LLM Pipelines & Data Engineering",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: "Case Studies: AI Automation, LLM Pipelines & Data Engineering", description },
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <JsonLd data={buildProjectsIndexJsonLd()} />
      <section aria-labelledby="projects-index-title" className="py-14 sm:py-20">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case studies" }]} />
          <h1 id="projects-index-title" className="mt-10 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
            Engineering work from my roles at BizProspex, from AI outreach automation and LLM content pipelines to data
            validation and ETL. Each one covers the problem, the approach, the tools and the measured result.
          </p>

          <ol className="mt-12 divide-y divide-line border-y border-line">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid gap-4 py-8 transition-colors md:grid-cols-[3rem_minmax(0,1fr)_14rem] md:gap-8"
                >
                  <span className="text-sm font-semibold tabular-nums text-muted">0{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium text-muted">{p.context}</span>
                    <span className="mt-1.5 block text-xl font-bold tracking-tight text-ink group-hover:text-brand-ink sm:text-2xl">
                      {p.title}
                    </span>
                    <span className="mt-2 block max-w-[64ch] leading-relaxed text-muted">{p.summary}</span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span key={t} className="rounded-md border border-line bg-white px-2.5 py-1 text-[13px] font-medium text-ink/80">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="flex flex-col md:items-end md:text-right">
                    <span className="text-2xl font-bold tracking-tight text-brand-ink">{p.results[0].value}</span>
                    <span className="text-sm text-muted">{p.results[0].label}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                      Read the case study
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-bold tracking-tight text-ink">Agent builds in my Upwork portfolio</h2>
            <p className="mt-1.5 text-muted">These have full write-ups and media on Upwork rather than here.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {agentBuilds.map((b) => (
                <Tag key={b.title}>{b.title}</Tag>
              ))}
            </ul>
            <a
              href={UPWORK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
            >
              See the portfolio on Upwork
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
