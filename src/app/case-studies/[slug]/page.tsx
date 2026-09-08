import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Prose from '@/components/Prose';
import { CASE_STUDIES } from '@/lib/data';
import { caseStudySchema } from '@/lib/schema';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const c = CASE_STUDIES.find((x) => x.slug === params.slug);
  if (!c) return {};
  return {
    title: `${c.title} — ${c.client}`,
    description: c.summary,
    alternates: { canonical: `/case-studies/${c.slug}` },
    openGraph: {
      type: 'article',
      title: `${c.title} — ${c.client}`,
      description: c.summary,
      url: `/case-studies/${c.slug}`,
    },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const study = CASE_STUDIES.find((c) => c.slug === params.slug);
  if (!study) notFound();

  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);

  return (
    <PageShell
      crumbs={[
        { name: 'Case studies', path: '/case-studies' },
        { name: study.client, path: `/case-studies/${study.slug}` },
      ]}
      eyebrow={`${study.client} · ${study.period}`}
      title={study.title}
      lede={study.summary}
      schema={[caseStudySchema(study)]}
    >
      {/* Results rail — the numbers, stated in the open */}
      <div className="border-b border-paper/[0.08] bg-paper/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {study.results.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="block text-3xl md:text-4xl font-extrabold text-accent tabular-nums">
                    {r.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-paper/70">
                    {r.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8">
            <Prose blocks={study.body} />
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-4">
                  Client
                </p>
                <p className="text-xl font-bold text-paper">{study.client}</p>
                <p className="mt-1 text-sm text-paper/70">{study.period}</p>
              </div>

              <div className="border-t border-paper/[0.1] pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-4">
                  Stack
                </p>
                <ul className="flex flex-wrap gap-2">
                  {study.stack.map((s) => (
                    <li
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-full bg-accent/[0.08] text-accent border border-accent/20"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {others.length > 0 && (
                <div className="border-t border-paper/[0.1] pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-3">
                    Other case studies
                  </p>
                  <ul className="space-y-3">
                    {others.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/case-studies/${o.slug}`}
                          className="group inline-flex items-center gap-2.5 text-base font-semibold text-paper hover:text-accent transition-colors duration-300"
                        >
                          {o.client}
                          <svg
                            width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-paper/[0.1] pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300"
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
