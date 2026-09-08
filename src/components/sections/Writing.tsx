'use client';

import Link from 'next/link';
import SectionHeading from '../SectionHeading';
import { FadeUp } from '../TextReveal';
import { BLOG_POSTS } from '@/lib/data';

/**
 * Signals out: an editorial index. Each row is a real anchor now — it was
 * styled as clickable but had no href, which made it invisible to crawlers
 * and unreachable by keyboard.
 */
export default function Writing() {
  return (
    <section id="writing" className="relative z-10 bg-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-40">
        <SectionHeading index="06" kicker="Writing" title={['Notes from', 'the build.']} />

        <div className="border-t border-paper/[0.08]">
          {BLOG_POSTS.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.06} y={24}>
              <article className="group relative border-b border-paper/[0.08] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <Link
                  href={`/writing/${post.slug}`}
                  className="relative block py-9 md:py-11"
                  data-cursor
                >
                  <div className="grid md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                    <div className="md:col-span-2 flex items-center gap-3 font-mono text-xs">
                      <span className="px-2.5 py-1 rounded bg-accent/10 text-accent uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="md:col-span-6 text-xl md:text-2xl font-semibold tracking-tight text-paper leading-snug transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="md:col-span-3 text-sm text-paper/65 leading-relaxed">
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
                  <div className="mt-3 md:mt-2 md:pl-[calc(100%/6)] font-mono text-[11px] text-paper/55">
                    <time dateTime={post.iso}>{post.date}</time>
                  </div>
                </Link>
              </article>
            </FadeUp>
          ))}
        </div>

        <Link
          href="/writing"
          className="group mt-12 inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-paper/20 text-paper hover:border-accent hover:text-accent transition-colors duration-300"
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
    </section>
  );
}
