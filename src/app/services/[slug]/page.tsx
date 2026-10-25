import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { ServiceGrid } from "@/components/service-grid";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { Container, Eyebrow, SecondaryButton, Tag, UpworkButton } from "@/components/ui";
import { getProject } from "@/content/profile";
import { getServicePage, servicePages } from "@/content/services";
import { buildServiceJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServicePage((await params).slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: path },
    openGraph: { url: path, title: service.metaTitle, description: service.metaDescription },
    twitter: { card: "summary_large_image", title: service.metaTitle, description: service.metaDescription },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ServicePage({ params }: Props) {
  const service = getServicePage((await params).slug);
  if (!service) notFound();

  const proof = service.proof.map(getProject).filter((p) => p !== undefined);
  const others = servicePages.filter((s) => s.slug !== service.slug);

  return (
    <PageShell>
      <JsonLd data={buildServiceJsonLd(service)} />
      <header className="py-14 sm:py-20">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.shortName },
            ]}
          />
          <div className="mt-10">
            <Eyebrow>{service.packages ? "Packaged service on Upwork" : "Custom-scoped service on Upwork"}</Eyebrow>
          </div>
          <h1 className="mt-4 max-w-[24ch] text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-6 max-w-[64ch] text-lg leading-relaxed text-muted">{service.intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <UpworkButton>{service.packages ? "Order on Upwork" : "Discuss it on Upwork"}</UpworkButton>
            <SecondaryButton href={service.packages ? "#packages-title" : "#faq-title"}>
              {service.packages ? "See packages" : "Read the FAQ"}
            </SecondaryButton>
          </div>
        </Container>
      </header>

      <div className="border-y border-line bg-surface py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div className="min-w-0 max-w-[70ch] space-y-14">
            <Block id="for-title" title="When this fits">
              <ul className="space-y-3">
                {service.forWho.map((f) => (
                  <li key={f} className="flex gap-3 text-[17px] leading-relaxed text-ink/85">
                    <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="get-title" title="What you get">
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 rounded-xl border border-line bg-white p-4 leading-snug text-ink/85">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-dark" />
                    {d}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="how-title" title="How it works">
              <ol className="space-y-4">
                {service.process.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold tabular-nums text-brand-ink"
                    >
                      {i + 1}
                    </span>
                    <p className="text-[17px] leading-relaxed text-ink/85">
                      <strong className="font-semibold text-ink">{step.title}.</strong> {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Block>

            {service.packages ? (
              <Block id="packages-title" title="Packages">
                {service.catalogTitle && (
                  <p className="mb-5 text-muted">
                    Listed in my Upwork Project Catalog as &ldquo;{service.catalogTitle}&rdquo;.
                  </p>
                )}
                <ul className="grid gap-4 md:grid-cols-3">
                  {service.packages.map((p, i) => (
                    <li
                      key={p.name}
                      className={`flex flex-col rounded-2xl border bg-white p-5 ${i === 1 ? "border-brand" : "border-line"}`}
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-ink/70">{p.name}</h3>
                      <p className="mt-2 text-2xl font-bold tracking-tight text-ink">{p.delivery}</p>
                      <p className="text-sm text-muted">delivery</p>
                      <p className="mt-4 flex-1 leading-snug text-ink/85">{p.includes}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  See current pricing and order on Upwork, which also handles payment.
                </p>
                <UpworkButton className="mt-5">Order on Upwork</UpworkButton>
              </Block>
            ) : (
              <Block id="pricing-title" title="Scope and quote">
                <p className="text-[17px] leading-relaxed text-ink/85">
                  This service is scoped per project, because cost depends on your data, the tools involved and where it
                  needs to run. Send the details through Upwork and I will reply with a scope and a fixed quote there.
                </p>
                <UpworkButton className="mt-5">Discuss it on Upwork</UpworkButton>
              </Block>
            )}

            {proof.length > 0 && (
              <Block id="proof-title" title="Related work">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {proof.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-[0_8px_24px_-14px_rgba(34,34,34,0.18)]"
                      >
                        <span className="text-xs font-medium text-muted">Case study</span>
                        <span className="mt-1 text-lg font-bold tracking-tight text-ink group-hover:text-brand-ink">
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
              </Block>
            )}

            <Block id="faq-title" title="Frequently asked questions">
              <FaqList faqs={service.faqs} />
            </Block>
          </div>

          <aside aria-label="Service details" className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6 rounded-2xl border border-line bg-white p-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/70">How to order</h2>
                <p className="mt-1.5 text-[15px] text-ink">
                  {service.packages ? `${service.packages.length} packages on Upwork` : "Scoped per project on Upwork"}
                </p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-ink/70">Tools</h2>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {service.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </div>
              <UpworkButton size="sm" className="w-full">
                {service.packages ? "Order on Upwork" : "Discuss it on Upwork"}
              </UpworkButton>
            </div>
          </aside>
        </Container>
      </div>

      <section aria-labelledby="other-services-title" className="pt-20 sm:pt-24">
        <Container>
          <h2 id="other-services-title" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Other services
          </h2>
          <ServiceGrid items={others} />
        </Container>
      </section>
    </PageShell>
  );
}
