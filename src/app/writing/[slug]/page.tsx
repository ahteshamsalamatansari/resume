import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import Prose from '@/components/Prose';
import SocialLinks from '@/components/SocialLinks';
import Portrait from '@/components/Portrait';
import { BLOG_POSTS, CONTACT } from '@/lib/data';
import { articleSchema } from '@/lib/schema';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = BLOG_POSTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/writing/${p.slug}` },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.excerpt,
      url: `/writing/${p.slug}`,
      publishedTime: p.iso,
      authors: [CONTACT.name],
    },
  };
}

export default function PostPage({ params }: Params) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const idx = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const next = BLOG_POSTS[(idx + 1) % BLOG_POSTS.length];

  return (
    <PageShell
      crumbs={[
        { name: 'Writing', path: '/writing' },
        { name: post.title, path: `/writing/${post.slug}` },
      ]}
      eyebrow={`${post.category} · ${post.readTime} read`}
      title={post.title}
      lede={post.excerpt}
      schema={[articleSchema(post)]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 pb-8 mb-12 border-b border-paper/[0.09] font-mono text-xs text-paper/60">
              <Portrait size="sm" />
              <span>By {CONTACT.name}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.iso}>{post.date}</time>
              <span aria-hidden>·</span>
              <span>{post.readTime} read</span>
            </div>

            <Prose blocks={post.body} />

            <div className="mt-16 pt-10 border-t border-paper/[0.09]">
              <div className="flex items-start gap-5">
                <Portrait size="sm" className="shrink-0" />
                <p className="text-lg text-paper/75 leading-relaxed max-w-2xl">
                  Written by {CONTACT.name}, {CONTACT.role} — building production
                  GenAI, RAG systems and data pipelines at scale.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <SocialLinks />
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-paper/20 text-paper hover:border-accent hover:text-accent transition-colors duration-300 text-sm font-medium"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="rounded-2xl border border-paper/[0.1] bg-paper/[0.02] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-3">
                  Read next
                </p>
                <Link
                  href={`/writing/${next.slug}`}
                  className="group block text-base font-semibold text-paper hover:text-accent transition-colors duration-300"
                >
                  {next.title}
                </Link>
                <p className="mt-2 text-sm text-paper/65 leading-relaxed">
                  {next.excerpt}
                </p>
              </div>

              <div className="border-t border-paper/[0.1] pt-6">
                <Link
                  href="/writing"
                  className="group inline-flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-paper transition-colors duration-300"
                >
                  All writing
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
