'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CASE_STUDIES } from '@/lib/data';

/**
 * Pinned horizontal act: the page scrolls down, the story moves
 * sideways. Track shift is measured, so it stays correct at every
 * viewport size.
 */
export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setShift(Math.max(trackRef.current.scrollWidth - window.innerWidth, 0));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0.08, 0.95], [0, -shift]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="case-studies" ref={sectionRef} className="relative z-10 bg-dark h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* progress hairline */}
        <div className="absolute top-24 left-6 md:left-12 right-6 md:right-12 h-px bg-paper/10">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-accent origin-left"
            style={{ scaleX: lineScale }}
          />
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-6 md:gap-10 px-6 md:px-12 w-max will-change-transform">
          {/* Intro panel */}
          <div className="w-[82vw] md:w-[30vw] shrink-0 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-accent/90 tracking-[0.25em] uppercase">04</span>
              <span className="h-px w-14 bg-gradient-to-r from-accent/60 to-transparent" />
              <span className="font-mono text-xs text-paper/60 tracking-[0.25em] uppercase">Deep Dives</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tightest text-paper leading-[1.02] mb-6">
              How the work moved the numbers.
            </h2>
            <p className="text-paper/70 max-w-sm">
              Problem → approach → measured result. Scroll on — the story
              continues sideways.
            </p>
          </div>

          {CASE_STUDIES.map((study, i) => (
            <article
              key={study.slug}
              className="relative w-[86vw] md:w-[64vw] lg:w-[56vw] shrink-0 rounded-[2rem] border border-paper/10 bg-[#0E1412] overflow-hidden my-auto"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(111,207,151,0.08),transparent_55%)] pointer-events-none" />
              <div className="relative grid md:grid-cols-5 h-full">
                <div className="md:col-span-2 p-8 md:p-10 border-b md:border-b-0 md:border-r border-paper/10">
                  <span className="font-mono text-xs text-accent/90 tracking-[0.2em]">
                    CASE 0{i + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-4 mb-2 text-paper">
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="hover:text-accent transition-colors duration-300"
                    >
                      {study.client}
                    </Link>
                  </h3>
                  <p className="text-sm text-paper/70 mb-8">{study.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {study.stack.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1.5 rounded-full bg-accent/[0.08] text-accent border border-accent/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 p-8 md:p-10 flex flex-col">
                  <div className="mb-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-secondary mb-3">
                      Problem
                    </p>
                    <p className="text-sm md:text-base text-paper/70 leading-relaxed">
                      {study.problem}
                    </p>
                  </div>
                  <div className="mb-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-secondary mb-3">
                      Approach
                    </p>
                    <p className="text-sm md:text-base text-paper/70 leading-relaxed">
                      {study.approach}
                    </p>
                  </div>
                  <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-paper/10">
                    {study.results.map((r) => (
                      <div key={r.label}>
                        <div className="text-xl md:text-3xl font-extrabold text-accent tabular-nums">
                          {r.value}
                        </div>
                        <div className="text-[10px] md:text-[11px] text-paper/65 mt-1 leading-tight">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group/link mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-paper transition-colors duration-300"
                  >
                    Read the full case study
                    <svg
                      width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" aria-hidden
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    >
                      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* Outro cue */}
          <div className="w-[30vw] md:w-[16vw] shrink-0 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-paper/55 rotate-90 whitespace-nowrap">
              Keep scrolling ↓
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
