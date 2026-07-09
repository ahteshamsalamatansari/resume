'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { FadeUp } from '../TextReveal';
import { EXPERIENCE } from '@/lib/data';

/**
 * Trajectory: a timeline whose spine draws itself as you descend,
 * nodes igniting as each chapter enters the viewport.
 */
export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.6'],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative z-10 bg-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-40">
        <SectionHeading index="05" kicker="Trajectory" title={['Where I made', 'it count.']} />

        <div ref={ref} className="relative md:ml-4">
          {/* spine */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-paper/10" aria-hidden>
            <motion.div
              className="w-full h-full bg-gradient-to-b from-accent via-secondary to-primary origin-top"
              style={{ scaleY: spine }}
            />
          </div>

          <div className="space-y-2">
            {EXPERIENCE.map((job, i) => (
              <FadeUp key={job.role + job.company} delay={i * 0.05} y={32}>
                <div className="group relative grid md:grid-cols-12 gap-4 md:gap-10 pl-10 md:pl-14 py-10 border-b border-paper/[0.06] last:border-b-0">
                  {/* node */}
                  <motion.span
                    className="absolute left-0 top-[3.1rem] -translate-x-1/2 w-3 h-3 rounded-full border-2 border-dark"
                    initial={{ backgroundColor: '#1F6F5F', scale: 0.7 }}
                    whileInView={{ backgroundColor: '#6FCF97', scale: 1 }}
                    viewport={{ once: true, margin: '-30%' }}
                    transition={{ duration: 0.6 }}
                    aria-hidden
                  />

                  <div className="md:col-span-3">
                    <span className="font-mono text-sm text-accent/90 tabular-nums">
                      {job.period}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-paper group-hover:text-accent transition-colors duration-500">
                      {job.role}
                    </h3>
                    <p className="text-sm text-paper/45 mt-1">{job.company}</p>
                  </div>
                  <ul className="md:col-span-5 space-y-2.5">
                    {job.impact.map((line) => (
                      <li key={line} className="flex gap-3 text-sm md:text-[15px] text-paper/60 leading-relaxed">
                        <span className="text-accent/70 shrink-0 mt-0.5" aria-hidden>—</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
