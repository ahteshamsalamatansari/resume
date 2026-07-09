'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { FadeUp } from '../TextReveal';
import { SKILL_GROUPS } from '@/lib/data';

/**
 * The arsenal: full-width system rows that expand on hover/tap,
 * revealing capability chips — a console, not a card grid.
 */
export default function Skills() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="skills" className="relative z-10 bg-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-40">
        <SectionHeading index="02" kicker="Arsenal" title={['Systems I speak', 'fluently.']} />

        <div className="border-t border-paper/[0.08]">
          {SKILL_GROUPS.map((group, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={group.label} delay={i * 0.06} y={24}>
                <div
                  className="group relative border-b border-paper/[0.08] cursor-pointer"
                  onMouseEnter={() => setOpen(i)}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor
                >
                  {/* hover wash */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/[0.09] via-transparent to-transparent pointer-events-none"
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative flex items-center justify-between gap-6 py-8 md:py-10">
                    <div className="flex items-baseline gap-6 md:gap-10 min-w-0">
                      <span className="font-mono text-sm text-paper/30 tabular-nums shrink-0">
                        0{i + 1}
                      </span>
                      <h3
                        className={`text-2xl md:text-4xl font-bold tracking-tight transition-colors duration-500 ${
                          isOpen ? 'text-accent' : 'text-paper'
                        }`}
                      >
                        {group.label}
                      </h3>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`shrink-0 text-2xl font-light transition-colors duration-300 ${
                        isOpen ? 'text-accent' : 'text-paper/30'
                      }`}
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 md:pl-[4.5rem]">
                          <p className="text-paper/50 text-sm md:text-base mb-6 max-w-lg">
                            {group.blurb}
                          </p>
                          <div className="flex flex-wrap gap-2.5">
                            {group.items.map((item, j) => (
                              <motion.span
                                key={item}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + j * 0.04, duration: 0.4 }}
                                className="px-4 py-2 text-sm font-medium rounded-full border border-secondary/25 bg-secondary/[0.07] text-paper/85 hover:border-accent/60 hover:text-accent transition-colors duration-300"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
