import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { OutreachPlatformBody, outreachToc } from "@/components/case-studies/outreach-platform";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { ProjectMockup } from "@/components/project-mockups";
import { ResultList } from "@/components/sections";
import { Container, Tag } from "@/components/ui";
import { getProject, projects } from "@/content/profile";
import { buildCaseStudyJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

/** Case studies with a full write-up instead of the problem / approach / outcome template. */
const longform: Record<string, { Body: ComponentType; toc: { id: string; label: string }[] }> = {
  "ai-outreach-automation-platform": { Body: OutreachPlatformBody, toc: outreachToc },
};

const defaultNote =
  "Work done at BizProspex. Details are limited to what is stated in my Upwork profile; internal data and client names are not shown.";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  const title = `${project.title}: Case Study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title, description: project.summary },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
      {children}
    </h2>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug);
  const full = longform[project.slug];

  return (
    <PageShell>
      <JsonLd data={buildCaseStudyJsonLd(project)} />
      <article aria-labelledby="case-title">
        <header className="py-14 sm:py-20">
          <Container>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Case studies", href: "/projects" },
                { label: project.title },
              ]}
            />
            <p className="mt-10 text-sm font-medium text-muted">{project.context}</p>
            <h1
              id="case-title"
              className="mt-3 max-w-[22ch] text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl"
            >
              {project.title}
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{project.summary}</p>
            {project.published && (
              <p className="mt-4 text-sm text-muted">
                Published <time dateTime={project.published}>{formatDate(project.published)}</time>
              </p>
            )}
            <div className="mt-10 rounded-2xl border border-line bg-white px-6 py-5 sm:inline-block sm:px-8">
              <ResultList results={project.results} />
            </div>
          </Container>
        </header>

        <div className="border-y border-line bg-surface py-14 sm:py-20">
          <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
            {full ? (
              <div className="min-w-0 max-w-[72ch]">
                <full.Body />
                <p className="mt-16 border-t border-line pt-6 text-sm leading-relaxed text-muted">
                  {project.note ?? defaultNote}
                </p>
              </div>
            ) : (
              <div className="max-w-[68ch] space-y-12">
                <section aria-labelledby="problem-title">
                  <SectionTitle id="problem-title">The problem</SectionTitle>
                  <p className="mt-3 text-[17px] leading-relaxed text-ink/85">{project.problem}</p>
                </section>

                <section aria-labelledby="approach-title">
                  <SectionTitle id="approach-title">Approach</SectionTitle>
                  <ol className="mt-4 space-y-4">
                    {project.approach.map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold tabular-nums text-brand-ink"
                        >
                          {i + 1}
                        </span>
                        <p className="text-[17px] leading-relaxed text-ink/85">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section aria-labelledby="outcome-title">
                  <SectionTitle id="outcome-title">Outcome</SectionTitle>
                  <p className="mt-3 text-[17px] leading-relaxed text-ink/85">{project.outcome}</p>
                </section>

                {project.mockup && (
                  <section aria-labelledby="structure-title">
                    <SectionTitle id="structure-title">How it fits together</SectionTitle>
                    <div className="mt-5">
                      <ProjectMockup
                        kind={project.mockup}
                        caption="Recreated to show how the system is structured. Not a screenshot of the production system; sample rows are placeholders."
                      />
                    </div>
                  </section>
                )}

                <p className="border-t border-line pt-6 text-sm leading-relaxed text-muted">
                  {project.note ?? defaultNote}
                </p>
              </div>
            )}

            <aside
              aria-label="Project details"
              className={`lg:sticky lg:top-24 lg:self-start ${full ? "order-first lg:order-none lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto" : ""}`}
            >
              {full && (
                <nav aria-label="On this page" className="mb-6 hidden rounded-2xl border border-line bg-white p-6 lg:block">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/60">On this page</h2>
                  <ol className="mt-3 space-y-1.5 text-[15px]">
                    {full.toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="text-ink/80 underline-offset-4 hover:text-brand-ink hover:underline">
                          {t.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="space-y-6 rounded-2xl border border-line bg-white p-6">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/60">Role</h2>
                  <p className="mt-1.5 text-[15px] text-ink">{project.context}</p>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/60">Tools</h2>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/60">Related services</h2>
                  <ul className="mt-2 space-y-1.5">
                    {project.services.map((s) => (
                      <li key={s}>
                        <Link href="/#services" className="text-[15px] text-brand-ink underline-offset-4 hover:underline">
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </Container>
        </div>
      </article>

      <section aria-labelledby="more-title" className="pt-20 sm:pt-24">
        <Container>
          <h2 id="more-title" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            More case studies
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-14px_rgba(34,34,34,0.18)]"
                >
                  <span className="text-xs font-medium text-muted">{p.context}</span>
                  <span className="mt-1.5 text-lg font-bold tracking-tight text-ink group-hover:text-brand-ink">
                    {p.title}
                  </span>
                  <span className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-ink">
                    {p.results[0].value} {p.results[0].label}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </PageShell>
  );
}
