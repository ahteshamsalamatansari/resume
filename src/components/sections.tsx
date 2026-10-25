import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, Bot, Briefcase, FileSearch, GraduationCap, MessagesSquare, Workflow } from "lucide-react";
import { PHOTO, UPWORK_PROFILE_URL } from "@/config/site";
import {
  agentBuilds,
  career,
  certifications,
  education,
  process,
  projects,
  services,
  skillGroups,
  type Project,
} from "@/content/profile";
import { homeFaqs, servicePages } from "@/content/services";
import { FaqList } from "./faq-list";
import { ProjectMockup } from "./project-mockups";
import { ServiceGrid } from "./service-grid";
import { Container, Eyebrow, SecondaryButton, SectionHeading, Signature, Tag, UpworkButton } from "./ui";

const highlights = [
  { value: "10,691", label: "contacts in an AI outreach platform with human approval" },
  { value: "1.5M", label: "questions and answers from a generative content pipeline" },
  { value: "78% → 94%", label: "dataset accuracy after validation and deduplication" },
  { value: "70%", label: "less manual processing time with automated ETL" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-28">
        <div>
          <Eyebrow>AI Engineer · LLM Applications, RAG, AI Agents & Python Automation</Eyebrow>
          <h1
            id="hero-title"
            className="relative isolate mt-6 max-w-[16ch] text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]"
          >
            Building AI systems that solve{" "}
            <span className="box-decoration-clone bg-[linear-gradient(transparent_64%,rgb(20_168_0/0.18)_64%,rgb(20_168_0/0.18)_90%,transparent_90%)]">
              real business
            </span>{" "}
            problems
          </h1>
          <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-muted">
            I build LLM applications, RAG systems, AI agents, and Python automation that take repetitive research,
            outreach, and data work off a team. My background is four years of data quality and data intelligence
            work, so I build systems that check their outputs and show when something goes wrong.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <SecondaryButton href="#projects">View My Work</SecondaryButton>
            <UpworkButton />
          </div>
        </div>

        <aside aria-label="Selected results" className="self-end">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
            <p className="text-sm font-semibold text-ink">Selected results</p>
            <p className="mt-1 text-xs text-muted">From client projects and my work at BizProspex</p>
            <dl className="mt-5 divide-y divide-line">
              {highlights.map((h) => (
                <div key={h.value} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-3.5">
                  <dt className="text-xl font-bold tracking-tight text-brand-ink">{h.value}</dt>
                  <dd className="text-sm leading-snug text-muted">{h.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </Container>
    </section>
  );
}

export function Overview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="border-y border-line bg-surface py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <figure className="mb-8 flex items-center gap-4">
            <Image
              src={PHOTO.src}
              width={PHOTO.width}
              height={PHOTO.height}
              alt="Ahtesham Salamat Ansari, AI Engineer"
              sizes="96px"
              className="size-24 rounded-full border-4 border-white object-cover shadow-[0_4px_16px_-6px_rgba(34,34,34,0.25)]"
            />
            <figcaption>
              <p className="font-semibold text-ink">Ahtesham Salamat Ansari</p>
              <p className="text-sm text-muted">AI Engineer · BizProspex</p>
            </figcaption>
          </figure>
          <SectionHeading
            id="overview-title"
            eyebrow="Overview"
            title="Data background, AI engineering focus"
          />
          <div className="mt-6 max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-ink/85">
            <p>
              I have worked at BizProspex since 2021: four years in data quality and data intelligence, including
              leading the QA team, and AI engineering since August 2025.
            </p>
            <p>
              Today I build AI automation, agents, and LLM data pipelines: outreach and research workflows, MCP
              connections between LLMs and business tools, web data collection, and large-scale content generation
              with quality checks.
            </p>
            <p>
              The data work shaped how I build. I handle bad inputs, validate what a model returns, and make failures
              visible. If a simple script or a tool a business already pays for solves the problem, I say so instead of
              building an AI system.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Briefcase aria-hidden className="size-4 text-brand-dark" /> Experience
            </h3>
            <ol className="mt-4 space-y-4 border-l border-line pl-5">
              {career.map((c, i) => (
                <li key={c.role} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[25px] top-1.5 size-2.5 rounded-full ring-4 ring-white ${i === 0 ? "bg-brand" : "bg-line"}`}
                  />
                  <p className="font-semibold text-ink">{c.role}</p>
                  <p className="text-sm text-muted">
                    {c.org} · {c.period}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Award aria-hidden className="size-4 text-brand-dark" /> Certifications
              </h3>
              <ul className="mt-4 space-y-3">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <p className="text-sm font-medium leading-snug text-ink">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.issuer} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <GraduationCap aria-hidden className="size-4 text-brand-dark" /> Education
              </h3>
              <p className="mt-4 text-sm font-medium text-ink">{education.degree}</p>
              <p className="text-xs text-muted">
                {education.school} · {education.period}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const serviceIcons = [MessagesSquare, FileSearch, Bot, Workflow];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="What I build"
          intro="Four areas of work, each starting from a specific problem rather than a tool."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <article key={s.title} className="group bg-white p-7 transition-colors hover:bg-surface/60 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-tint text-brand-dark">
                    <Icon aria-hidden className="size-[18px]" />
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.problem}</p>
                <ul className="mt-5 space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[15px] leading-snug text-ink/85">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-ink">Services you can order</h3>
            <p className="mt-2 max-w-[60ch] text-muted">
              Fixed-price offers from my Upwork Project Catalog, and custom-scoped work for larger builds.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-ink underline-offset-4 hover:underline"
          >
            All services and pricing
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ServiceGrid items={servicePages} />
      </Container>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Questions clients ask"
          intro="How I work, how to hire me, and how AI output is kept accurate."
        />
        <FaqList faqs={homeFaqs} />
      </Container>
    </section>
  );
}

export function ResultList({ results }: { results: Project["results"] }) {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3">
      {results.map((r) => (
        <div key={r.label} className="flex flex-col-reverse">
          <dt className="text-sm text-muted">{r.label}</dt>
          <dd className="text-2xl font-bold tracking-tight text-brand-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
    >
      Read the case study
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      <span className="sr-only">: {project.title}</span>
    </Link>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="grid items-center gap-10 border-t border-line py-14 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-16"
    >
      <div className={reversed ? "lg:order-2" : undefined}>
        <p className="text-sm font-medium text-muted">{project.context}</p>
        <h3 id={`${project.id}-title`} className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
          {project.title}
        </h3>

        <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink/70">Problem</h4>
        <p className="mt-1.5 leading-relaxed text-ink/85">{project.problem}</p>

        <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink/70">Approach</h4>
        <ul className="mt-1.5 space-y-1.5">
          {project.approach.map((a) => (
            <li key={a} className="flex gap-2.5 leading-relaxed text-ink/85">
              <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-brand" />
              {a}
            </li>
          ))}
        </ul>

        <ul aria-label="Tools and technologies" className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>

        <div className="mt-7 border-t border-line pt-5">
          <ResultList results={project.results} />
        </div>
        <div className="mt-6">
          <CaseStudyLink project={project} />
        </div>
      </div>

      {project.mockup && (
        <div className={reversed ? "lg:order-1" : undefined}>
          <ProjectMockup
            kind={project.mockup}
            caption="Recreated to show how the system is structured. Not a screenshot of the production system; sample rows are placeholders."
          />
        </div>
      )}
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="flex flex-col rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-14px_rgba(34,34,34,0.18)]"
    >
      <p className="text-xs font-medium text-muted">{project.context}</p>
      <h3 id={`${project.id}-title`} className="mt-1.5 text-lg font-bold tracking-tight text-ink">
        <Link href={`/projects/${project.slug}`} className="hover:text-brand-ink">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{project.problem}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.approach.join(" ")}</p>
      <ul aria-label="Tools and technologies" className="mb-6 mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </ul>
      <div className="mt-auto border-t border-line pt-4">
        <ResultList results={project.results} />
        <div className="mt-4">
          <CaseStudyLink project={project} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.mockup);
  const compact = projects.filter((p) => !p.mockup);

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="projects-title"
          eyebrow="Selected projects"
          title="Engineering work and outcomes"
          intro="Client projects and work from my roles at BizProspex. Figures come from my Upwork profile and my own engineering write-ups, and each project has a full case study."
        />

        <div className="mt-14 rounded-3xl border border-line bg-white p-6 sm:p-10 lg:p-12">
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {compact.map((p) => (
            <CompactProject key={p.id} project={p} />
          ))}
        </div>

        <p className="mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-ink underline-offset-4 hover:underline"
          >
            All case studies
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </p>

        <div className="mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-ink">Agent builds in my Upwork portfolio</h3>
              <p className="mt-1.5 max-w-[60ch] text-muted">
                Published portfolio items. Full descriptions and media are on my Upwork profile.
              </p>
            </div>
            <a
              href={UPWORK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-ink underline-offset-4 hover:underline"
            >
              See the portfolio on Upwork
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {agentBuilds.map((b) => (
              <li key={b.title} className="flex gap-3 rounded-xl border border-line bg-white p-5">
                <Bot aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-dark" />
                <div>
                  <p className="font-semibold text-ink">{b.title}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{b.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="skills-title"
          eyebrow="Technical skills"
          title="Tools I work with"
          intro="Grouped by the kind of problem they solve."
        />
        <dl className="mt-12 divide-y divide-line border-y border-line">
          {skillGroups.map((g) => (
            <div key={g.title} className="grid gap-3 py-6 md:grid-cols-[16rem_1fr] md:gap-10">
              <dt className="font-semibold text-ink">

                {g.title}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading id="approach-title" eyebrow="Working approach" title="How a project runs" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title} className="relative border-t-2 border-line pt-6">
              <span aria-hidden className="absolute -top-0.5 left-0 h-0.5 w-10 bg-brand" />
              <p className="text-sm font-semibold tabular-nums text-brand-ink">Step {i + 1}</p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-28">
      <Container>
        <div className="rounded-3xl border border-line bg-white px-6 py-14 text-center sm:px-12 sm:py-20">
          <Signature className="text-3xl text-brand-ink sm:text-4xl" />
          <h2 id="cta-title" className="mx-auto mt-6 max-w-[22ch] text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.15]">
            See my full profile and portfolio on Upwork
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">
            My Upwork profile has the complete overview, portfolio items, certifications, and work history.
          </p>
          <UpworkButton className="mt-8" />
        </div>
      </Container>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="py-12 text-sm text-muted">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Signature className="text-2xl text-ink" />
            <p className="mt-1.5">AI Engineer · LLM Applications, RAG, AI Agents & Python Automation</p>
          </div>
          <nav aria-label="Services">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/70">Services</h2>
            <ul className="mt-3 space-y-2">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="underline-offset-4 hover:text-brand-ink hover:underline">
                    {s.shortName.charAt(0).toUpperCase() + s.shortName.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Case studies">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/70">Case studies</h2>
            <ul className="mt-3 space-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="underline-offset-4 hover:text-brand-ink hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed">
          Project visuals are illustrative mockups, not screenshots of employer or client systems.
        </p>
      </Container>
    </footer>
  );
}
