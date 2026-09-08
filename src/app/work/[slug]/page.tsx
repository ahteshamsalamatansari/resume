import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Prose from '@/components/Prose';
import { PROJECTS } from '@/lib/data';
import { projectSchema } from '@/lib/schema';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.summary,
      url: `/work/${p.slug}`,
    },
  };
}

export default function ProjectPage({ params }: Params) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <PageShell
      crumbs={[
        { name: 'Work', path: '/work' },
        { name: project.title, path: `/work/${project.slug}` },
      ]}
      eyebrow={`${project.category} · ${project.year}`}
      title={project.title}
      lede={project.summary}
      schema={[projectSchema(project)]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8">
            <Prose blocks={project.body} />
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="rounded-2xl border border-paper/[0.1] bg-paper/[0.02] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                  Headline result
                </p>
                <div className="mt-3 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary tabular-nums">
                  {project.metric}
                </div>
                <div className="mt-1 text-sm text-paper/70">
                  {project.metricLabel}
                </div>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-4">
                  Stack
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <li
                      key={t}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-paper/[0.05] border border-paper/10 text-paper/75"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-paper/[0.1] pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-3">
                  Next project
                </p>
                <Link
                  href={`/work/${next.slug}`}
                  className="group inline-flex items-center gap-2.5 text-base font-semibold text-paper hover:text-accent transition-colors duration-300"
                >
                  {next.title}
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div className="border-t border-paper/[0.1] pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300"
                >
                  Discuss a project like this
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
