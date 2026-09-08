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
  FAQS,
} from '@/lib/data';
import { RESUME_PATH } from '@/lib/site';
import { profilePageSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ahtesham Salamat Ansari is an AI Engineer in India with 3+ years building production GenAI, RAG systems and large-scale data pipelines at BizProspex and FunnelByte.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <PageShell
      crumbs={[{ name: 'About', path: '/about' }]}
      eyebrow="Profile"
      title="Engineer. Operator. Outcome-obsessed."
      lede={`${CONTACT.name} is an ${CONTACT.role} based in ${CONTACT.locality}, building production generative AI, retrieval systems and data infrastructure that hold up under real load.`}
      schema={[profilePageSchema(), faqSchema()]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Metrics */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/[0.07] border border-paper/[0.07] rounded-2xl overflow-hidden mb-20">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-dark px-6 py-6">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-2xl md:text-3xl font-bold text-accent tabular-nums">
                  {m.value}
                </span>
                <span className="block text-[11px] text-paper/60 mt-1 font-mono uppercase tracking-wider">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8 space-y-14">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-paper mb-5">
                What I do
              </h2>
              <p className="text-base md:text-lg text-paper/75 leading-relaxed mb-5">
                I build AI systems that go into production and stay there. Most
                of my work sits at the join between generative AI and data
                engineering: retrieval pipelines over corpora measured in tens
                of millions of records, LLM agents with deterministic guardrails
                around them, and the streaming and quality infrastructure that
                keeps the data underneath trustworthy.
              </p>
              <p className="text-base md:text-lg text-paper/75 leading-relaxed mb-5">
                The distinction I care about is between a demo and a system. A
                demo has to work once, in front of someone. A system has to work
                at three in the morning, on input nobody anticipated, and it has
                to be possible to find out why when it does not. Most of the
                engineering effort in my work goes into that second property —
                provenance, guardrails, validation, and making failures visible
                rather than silent.
              </p>
              <p className="text-base md:text-lg text-paper/75 leading-relaxed">
                I am currently an {CONTACT.role} at {EXPERIENCE[0].company},
                working from {CONTACT.location}, and open to remote roles in
                generative AI, data intelligence and production ML.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-paper mb-5">
                How I work
              </h2>
              <ul className="space-y-3 border-l border-accent/30 pl-6">
                {[
                  'Measure before optimising. Latency work that starts with a guess usually optimises the wrong stage.',
                  'Make uncertainty explicit. A system that says "I could not determine this" is worth more than one that quietly invents an answer.',
                  'Keep provenance. Every score, answer or prediction should be reproducible from the evidence that produced it.',
                  'Validate at the boundary, not after the fact. Personal data and bad records should be handled before they enter the system, not filtered on the way out.',
                  'Design the rollback first. A deployment you cannot reverse is a deployment you will be afraid to make.',
                ].map((line) => (
                  <li key={line} className="relative text-base text-paper/75 leading-relaxed">
                    <span
                      className="absolute -left-[27px] top-[0.6em] w-1.5 h-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-paper mb-7">
                Experience
              </h2>
              <ol className="space-y-10">
                {EXPERIENCE.map((e) => (
                  <li key={`${e.role}-${e.period}`} className="border-l border-paper/15 pl-6">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {e.period}
                    </p>
                    <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight text-paper">
                      {e.role}
                    </h3>
                    <p className="text-sm text-paper/70 mt-0.5">{e.company}</p>
                    <ul className="mt-4 space-y-2">
                      {e.impact.map((i) => (
                        <li key={i} className="text-base text-paper/70 leading-relaxed">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-paper mb-7">
                Skills
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {SKILL_GROUPS.map((g) => (
                  <div key={g.label} className="border-t border-paper/[0.1] pt-5">
                    <h3 className="text-lg font-semibold text-paper">{g.label}</h3>
                    <p className="mt-1 text-sm text-paper/65">{g.blurb}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((i) => (
                        <li
                          key={i}
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-paper/[0.05] border border-paper/10 text-paper/75"
                        >
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-paper mb-7">
                Common questions
              </h2>
              <dl className="space-y-8">
                {FAQS.map((f) => (
                  <div key={f.q} className="border-t border-paper/[0.1] pt-5">
                    <dt className="text-lg font-semibold text-paper leading-snug">
                      {f.q}
                    </dt>
                    <dd className="mt-2.5 text-base text-paper/70 leading-relaxed">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <Portrait priority />

              <div className="rounded-2xl border border-paper/[0.1] bg-paper/[0.02] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-4">
                  Details
                </p>
                <dl className="space-y-4 text-sm">
                  {[
                    ['Name', CONTACT.name],
                    ['Role', CONTACT.role],
                    ['Location', CONTACT.location],
                    ['Experience', '3+ years'],
                    ['Status', 'Open to remote roles'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-4 border-t border-paper/[0.08] pt-3 first:border-0 first:pt-0"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60 shrink-0">
                        {k}
                      </dt>
                      <dd className="text-paper/85 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <SocialLinks className="flex-wrap" showLabels />

              <div className="flex flex-col gap-3">
                <a
                  href={RESUME_PATH}
                  download
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300"
                >
                  Download résumé (PDF)
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-paper/20 text-paper hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
