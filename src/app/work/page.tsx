import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { PROJECTS } from '@/lib/data';
import { itemListSchema, allProjectItems } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Production AI and data engineering projects by Ahtesham Salamat Ansari — RAG systems over 50M+ records, real-time Kafka pipelines, LLM agents, data quality frameworks and MLOps platforms.',
  alternates: { canonical: '/work' },
};

export default function WorkIndex() {
  return (
    <PageShell
      crumbs={[{ name: 'Work', path: '/work' }]}
      eyebrow="Selected work"
      title="Things I’ve shipped."
      lede="Five production systems, each with the problem it solved and the number it moved. Every one of them ran against real data at real scale."
      schema={[itemListSchema('Projects', allProjectItems)]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <ul className="border-t border-paper/[0.09]">
          {PROJECTS.map((p, i) => (
            <li key={p.slug}>
              <article className="group relative border-b border-paper/[0.09]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <Link href={`/work/${p.slug}`} className="relative block py-10 md:py-12">
                  <div className="grid gap-6 md:grid-cols-12 md:gap-10 items-start">
                    <div className="md:col-span-1 font-mono text-sm text-paper/60 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="md:col-span-7">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-2.5 py-1 rounded bg-accent/10 text-accent font-mono text-[11px] uppercase tracking-wider">
                          {p.category}
                        </span>
                        <span className="font-mono text-[11px] text-paper/60">
                          {p.year}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-4xl font-extrabold tracking-tightest text-paper leading-tight transition-colors duration-300 group-hover:text-accent">
                        {p.title}
                      </h2>
                      <p className="mt-4 text-base text-paper/70 leading-relaxed max-w-2xl">
                        {p.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-paper/[0.05] border border-paper/10 text-paper/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-4 md:text-right md:border-l border-paper/10 md:pl-8">
                      <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary tabular-nums">
                        {p.metric}
                      </div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mt-2">
                        {p.metricLabel}
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                        Read the build
                        <svg
                          width="15" height="15" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
