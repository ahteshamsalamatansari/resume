'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { PROJECTS, Project } from '@/lib/data';

/**
 * The deck: each project is a full card pinned to the viewport;
 * as the next slides up, the previous recedes into depth —
 * scale, blur-less darkening, perspective. Cards tilt toward the pointer.
 */
function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();

  // recede as later cards arrive
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, (index + 1) / total], [0, 0.45]);

  // pointer tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 5);
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      className="sticky flex items-center justify-center"
      style={{ top: `calc(14vh + ${index * 1.6}rem)`, height: '76vh' }}
    >
      <motion.article
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          scale,
          rotateX: srx,
          rotateY: sry,
          transformPerspective: 1200,
        }}
        className="relative w-full h-full max-h-[620px] rounded-[2rem] border border-paper/10 bg-[#0E1412] overflow-hidden origin-top will-change-transform"
        data-cursor
      >
        {/* ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(47,160,132,0.14),transparent_55%)] pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-primary/15 blur-[110px] pointer-events-none" />

        {/* dimmer as card recedes */}
        <motion.div className="absolute inset-0 bg-dark pointer-events-none z-20" style={{ opacity: dim }} />

        <div className="relative z-10 h-full p-8 md:p-14 flex flex-col">
          <div className="flex items-start justify-between gap-6 mb-auto">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent/90">
              {project.category}
            </span>
            <span className="font-mono text-xs text-paper/60">{project.year}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <span className="block font-mono text-sm text-paper/60 mb-4 tabular-nums">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tightest text-paper mb-5 leading-[1.02]">
                <Link
                  href={`/work/${project.slug}`}
                  className="hover:text-accent transition-colors duration-300"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="text-paper/70 leading-relaxed max-w-xl mb-7">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-paper/[0.05] border border-paper/10 text-paper/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={`/work/${project.slug}`}
                className="group/link inline-flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-paper transition-colors duration-300"
              >
                Read the build
                <svg
                  width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="md:col-span-4 md:text-right md:border-l border-paper/10 md:pl-8">
              <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary tabular-nums">
                {project.metric}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mt-2">
                {project.metricLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="work" className="relative z-10 bg-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-40">
        <SectionHeading index="03" kicker="Selected Work" title={['Things I’ve', 'shipped.']} />
      </div>

      <div ref={deckRef} className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        {PROJECTS.map((project, i) => (
          <StackCard
            key={project.slug}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <Link
          href="/work"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-paper/20 text-paper hover:border-accent hover:text-accent transition-colors duration-300"
        >
          All {PROJECTS.length} projects
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
