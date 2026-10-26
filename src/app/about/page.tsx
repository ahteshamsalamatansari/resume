import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Container, Tag, UpworkButton } from "@/components/ui";
import { LOCATION, PHOTO, site } from "@/config/site";
import { career, certifications, education, projects, skillGroups } from "@/content/profile";
import { aboutFaqs, servicePages } from "@/content/services";
import { buildAboutJsonLd } from "@/lib/schema";

const title = `About Ahtesham Salamat Ansari: AI Engineer in ${LOCATION.city}, ${LOCATION.country}`;
const description =
  "Ahtesham Salamat Ansari is an AI engineer in Burhanpur, Madhya Pradesh, India, building LLM applications, RAG chatbots, AI agents with MCP and Python automation.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", url: "/about", title, description, firstName: "Ahtesham", lastName: "Salamat Ansari" },
};

const facts: [string, React.ReactNode][] = [
  ["Full name", "Ahtesham Salamat Ansari"],
  ["Role", "AI Engineer"],
  ["Based in", LOCATION.label],
  ["Works", "Remotely, with clients through Upwork"],
  ["Current position", `${career[0].role}, ${career[0].org} (${career[0].period})`],
  ["Focus", "LLM applications, RAG, AI agents and MCP, n8n automation, Python data pipelines"],
  ["Education", `${education.degree}, ${education.school} (${education.period})`],
];

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight text-ink">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={buildAboutJsonLd()} />
      <header className="py-14 sm:py-20">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
            <Image
              src={PHOTO.src}
              width={PHOTO.width}
              height={PHOTO.height}
              alt="Ahtesham Salamat Ansari, AI Engineer in Burhanpur, India"
              priority
              sizes="160px"
              className="size-36 shrink-0 rounded-full border-4 border-white object-cover shadow-[0_8px_24px_-10px_rgba(34,34,34,0.3)] sm:size-40"
            />
            <div>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                Ahtesham Salamat Ansari
              </h1>
              <p className="mt-3 text-lg font-medium text-brand-ink">
                AI Engineer in {LOCATION.city}, {LOCATION.region}, {LOCATION.country}
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-[66ch] text-lg leading-relaxed text-ink/85">{site.bio}</p>
          <p className="mt-4 max-w-[66ch] text-lg leading-relaxed text-muted">
            He has worked at BizProspex since 2021, first in data quality and data intelligence, where he led a team of
            8+ analysts, and as an AI engineer since August 2025. That background shapes how he builds AI systems: inputs
            are validated, model outputs are checked in code, and failures are made visible instead of silent.
          </p>
          <UpworkButton className="mt-8" />
        </Container>
      </header>

      <div className="border-y border-line bg-surface py-14 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="facts-title">
            <H2 id="facts-title">At a glance</H2>
            <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-ink/70">{k}</dt>
                  <dd className="text-[15px] leading-relaxed text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="career-title">
            <H2 id="career-title">Experience</H2>
            <ol className="mt-5 space-y-5 border-l border-line pl-6">
              {career.map((c, i) => (
                <li key={c.role} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[29px] top-1.5 size-2.5 rounded-full ring-4 ring-surface ${i === 0 ? "bg-brand" : "bg-line"}`}
                  />
                  <h3 className="font-semibold text-ink">{c.role}</h3>
                  <p className="text-sm text-muted">
                    {c.org} · {c.period}
                  </p>
                </li>
              ))}
            </ol>
            <h3 className="mt-10 text-lg font-bold tracking-tight text-ink">Certifications</h3>
            <ul className="mt-3 space-y-2">
              {certifications.map((c) => (
                <li key={c.name} className="text-[15px] text-ink/85">
                  {c.name} <span className="text-muted">· {c.issuer}, {c.year}</span>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </div>

      <section aria-labelledby="work-title" className="py-14 sm:py-20">
        <Container>
          <H2 id="work-title">Selected work</H2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_16rem] sm:items-center sm:gap-8"
                >
                  <span>
                    <span className="block text-lg font-bold tracking-tight text-ink group-hover:text-brand-ink">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-muted">{p.summary}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink sm:justify-end">
                    {p.results[0].value} {p.results[0].label}
                    <ArrowRight aria-hidden className="size-4 shrink-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
            <section aria-labelledby="services-about-title">
              <H2 id="services-about-title">Services</H2>
              <ul className="mt-5 space-y-2">
                {servicePages.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[17px] text-brand-ink underline-offset-4 hover:underline"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="skills-about-title">
              <H2 id="skills-about-title">Skills</H2>
              <div className="mt-5 space-y-4">
                {skillGroups.map((g) => (
                  <div key={g.title}>
                    <h3 className="text-sm font-semibold text-ink">{g.title}</h3>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {g.skills.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </section>

      <section aria-labelledby="answers-title" className="border-t border-line bg-surface py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <H2 id="answers-title">Quick answers</H2>
            <p className="mt-3 text-muted">Common questions about Ahtesham Salamat Ansari.</p>
          </div>
          <FaqList faqs={aboutFaqs} />
        </Container>
      </section>
    </PageShell>
  );
}
