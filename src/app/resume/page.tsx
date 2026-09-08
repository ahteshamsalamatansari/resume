import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import SocialLinks from '@/components/SocialLinks';
import Portrait from '@/components/Portrait';
import {
  CONTACT,
  EXPERIENCE,
  SKILL_GROUPS,
  METRICS,
  PROJECTS,
} from '@/lib/data';
import { RESUME_PATH } from '@/lib/site';
import { resumeSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Résumé',
  description:
    'Résumé of Ahtesham Salamat Ansari — AI Engineer with 3+ years in production GenAI, RAG, MLOps and data engineering. Readable in full here, or downloadable as PDF.',
  alternates: { canonical: '/resume' },
};

/**
 * The résumé as an HTML page, not only a PDF. A PDF is a dead end for a
 * crawler and for an answer engine; this page is the indexable version and
 * the download sits alongside it.
 */
export default function ResumePage() {
  return (
    <PageShell
      crumbs={[{ name: 'Résumé', path: '/resume' }]}
      eyebrow="Résumé"
      title={CONTACT.name}
      lede={`${CONTACT.role} · 3+ years building production GenAI, RAG systems and large-scale data infrastructure. ${CONTACT.location}.`}
      schema={[resumeSchema()]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Portrait size="sm" priority className="mr-1" />
          <a
            href={RESUME_PATH}
            download
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300 glow-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-paper/20 text-paper hover:border-accent hover:text-accent transition-colors duration-300"
          >
            {CONTACT.email}
          </a>
          <SocialLinks />
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
                Summary
              </h2>
              <p className="text-base md:text-lg text-paper/75 leading-relaxed">
                AI Engineer with over three years of experience turning large
                language models, retrieval systems and data pipelines into
                measurable business outcomes. Built and shipped a
                retrieval-augmented generation platform across a 50M+ record
                corpus that improved qualification accuracy by 35% and cut query
                latency from 3.2 seconds to 180 milliseconds. Experienced across
                the full path from data ingestion and quality through model
                deployment, monitoring and rollback, with GDPR/CCPA-aligned
                handling of personal data.
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-7">
                Experience
              </h2>
              <ol className="space-y-10">
                {EXPERIENCE.map((e) => (
                  <li key={`${e.role}-${e.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-paper">
                        {e.role}
                      </h3>
                      <span className="font-mono text-xs text-paper/65">
                        {e.period}
                      </span>
                    </div>
                    <p className="text-sm text-paper/70 mt-1">{e.company}</p>
                    <ul className="mt-4 space-y-2 border-l border-accent/30 pl-6">
                      {e.impact.map((i) => (
                        <li key={i} className="relative text-base text-paper/75 leading-relaxed">
                          <span
                            className="absolute -left-[27px] top-[0.6em] w-1.5 h-1.5 rounded-full bg-accent"
                            aria-hidden
                          />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-7">
                Selected projects
              </h2>
              <ul className="space-y-6">
                {PROJECTS.map((p) => (
                  <li key={p.slug} className="border-t border-paper/[0.1] pt-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-semibold text-paper">
                        <Link
                          href={`/work/${p.slug}`}
                          className="hover:text-accent transition-colors duration-300"
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <span className="font-mono text-xs text-paper/65">
                        {p.year} · {p.metric} {p.metricLabel.toLowerCase()}
                      </span>
                    </div>
                    <p className="mt-2 text-base text-paper/70 leading-relaxed">
                      {p.description}
                    </p>
                    <p className="mt-2 font-mono text-xs text-paper/60">
                      {p.stack.join(' · ')}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-7">
                Skills
              </h2>
              <dl className="space-y-6">
                {SKILL_GROUPS.map((g) => (
                  <div key={g.label} className="border-t border-paper/[0.1] pt-5">
                    <dt className="text-base font-semibold text-paper mb-2">
                      {g.label}
                    </dt>
                    <dd className="text-base text-paper/70 leading-relaxed">
                      {g.items.join(' · ')}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="rounded-2xl border border-paper/[0.1] bg-paper/[0.02] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-4">
                  At a glance
                </p>
                <dl className="space-y-4">
                  {METRICS.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-baseline justify-between gap-4 border-t border-paper/[0.08] pt-3 first:border-0 first:pt-0"
                    >
                      <dt className="text-sm text-paper/70">{m.label}</dt>
                      <dd className="text-lg font-bold text-accent tabular-nums">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-paper/[0.1] bg-paper/[0.02] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-4">
                  Contact
                </p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-paper/85 hover:text-accent transition-colors duration-300 break-all"
                    >
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={CONTACT.phoneHref}
                      className="text-paper/85 hover:text-accent transition-colors duration-300"
                    >
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li className="text-paper/70">{CONTACT.location}</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
