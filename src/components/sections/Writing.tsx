'use client';

import SectionHeading from '../SectionHeading';
import { FadeUp } from '../TextReveal';
import { BLOG_POSTS } from '@/lib/data';

/**
 * Signals out: an editorial index. Rows glide on hover — the title
 * slides, the arrow surfaces, a wash of light follows.
 */
export default function Writing() {
  return (
    <section id="writing" className="relative z-10 bg-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-40">
        <SectionHeading index="06" kicker="Writing" title={['Notes from', 'the build.']} />

        <div className="border-t border-paper/[0.08]">
          {BLOG_POSTS.map((post, i) => (
            <FadeUp key={post.title} delay={i * 0.06} y={24}>
              <article
                className="group relative border-b border-paper/[0.08] py-9 md:py-11 cursor-pointer overflow-hidden"
                data-cursor
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative grid md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                  <div className="md:col-span-2 flex items-center gap-3 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-accent/10 text-accent uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="md:col-span-6 text-xl md:text-2xl font-semibold tracking-tight text-paper leading-snug transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="md:col-span-3 text-sm text-paper/50 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="md:col-span-1 flex md:justify-end items-center gap-4 font-mono text-xs text-paper/35">
                    <span className="whitespace-nowrap">{post.readTime}</span>
                    <span
                      className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                </div>
                <div className="relative mt-3 md:mt-2 md:pl-[calc(100%/6)] font-mono text-[11px] text-paper/30">
                  {post.date}
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
