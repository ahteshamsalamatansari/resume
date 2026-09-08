import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { CASE_STUDIES } from '@/lib/data';
import { itemListSchema, allCaseStudyItems } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Deep dives into production AI and data engineering work by Ahtesham Salamat Ansari — problem, approach and measured result, at BizProspex and FunnelByte.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesIndex() {
  return (
    <PageShell
      crumbs={[{ name: 'Case studies', path: '/case-studies' }]}
      eyebrow="Deep dives"
      title="How the work moved the numbers."
      lede="Problem, approach, measured result — written out in full, including the decisions that did not work and why the ones that did were chosen."
      schema={[itemListSchema('Case studies', allCaseStudyItems)]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-2">
          {CASE_STUDIES.map((c, i) => (
            <article
              key={c.slug}
              className="group relative rounded-[2rem] border border-paper/10 bg-[#0E1412] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(111,207,151,0.08),transparent_55%)] pointer-events-none" />
              <div className="relative p-8 md:p-10 flex flex-col h-full">
                <span className="font-mono text-xs text-accent/90 tracking-[0.2em]">
                  CASE 0{i + 1} · {c.period}
                </span>

                <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-paper">
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="transition-colors duration-300 group-hover:text-accent"
                  >
                    {c.client}
                  </Link>
                </h2>
                <p className="mt-1.5 text-sm text-paper/70">{c.title}</p>

                <p className="mt-6 text-base text-paper/70 leading-relaxed">
                  {c.summary}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-paper/10">
                  {c.results.map((r) => (
                    <div key={r.label}>
                      <div className="text-xl md:text-2xl font-extrabold text-accent tabular-nums">
                        {r.value}
                      </div>
                      <div className="text-[11px] text-paper/65 mt-1 leading-tight">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-full bg-accent/[0.08] text-accent border border-accent/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${c.slug}`}
                  className="mt-8 inline-flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-paper transition-colors duration-300"
                >
                  Read the full case study
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
