import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { BLOG_POSTS } from '@/lib/data';
import { itemListSchema, allPostItems } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Engineering notes by Ahtesham Salamat Ansari on RAG latency, guardrails for production LLM agents, and data quality at scale.',
  alternates: { canonical: '/writing' },
};

export default function WritingIndex() {
  return (
    <PageShell
      crumbs={[{ name: 'Writing', path: '/writing' }]}
      eyebrow="Writing"
      title="Notes from the build."
      lede="What actually worked, what did not, and the reasoning in between — written from systems that shipped rather than from tutorials."
      schema={[itemListSchema('Articles', allPostItems)]}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <ul className="border-t border-paper/[0.09]">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <article className="group relative border-b border-paper/[0.09]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <Link
                  href={`/writing/${post.slug}`}
                  className="relative block py-9 md:py-11"
                >
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                    <div className="md:col-span-2">
                      <span className="px-2.5 py-1 rounded bg-accent/10 text-accent font-mono text-[11px] uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="md:col-span-6 text-xl md:text-2xl font-semibold tracking-tight text-paper leading-snug transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="md:col-span-3 text-sm text-paper/70 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="md:col-span-1 flex md:justify-end items-center gap-4 font-mono text-xs text-paper/60">
                      <span className="whitespace-nowrap">{post.readTime}</span>
                      <span
                        className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 md:pl-[calc(100%/6)] font-mono text-[11px] text-paper/60">
                    <time dateTime={post.iso}>{post.date}</time>
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
