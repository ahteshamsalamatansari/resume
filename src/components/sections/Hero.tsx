'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Magnetic from '../Magnetic';
import { LineReveal } from '../TextReveal';
import { METRICS } from '@/lib/data';

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '200px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // content recedes into depth as the next act arrives
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* 3D neural field */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: sceneScale, opacity: sceneOpacity }}
      >
        <HeroScene active={inView} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(31,111,95,0.16),transparent_55%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-32 pb-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-paper/10 glass mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse-dot_2s_ease-in-out_infinite]" />
          <span className="text-xs text-paper/70 font-medium">
            Available for remote AI engineering roles
          </span>
        </motion.div>

        <LineReveal
          as="h1"
          delay={2.0}
          lines={[
            <span key="1" className="text-paper">I build production AI</span>,
            <span key="2" className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              that actually ships.
            </span>,
          ]}
          className="text-[clamp(2.8rem,8vw,7.5rem)] font-extrabold tracking-tightest leading-[0.98] mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-paper/55 max-w-2xl leading-relaxed mb-12"
        >
          AI Engineer with 3+ years turning LLMs, RAG, and data pipelines into
          measurable business outcomes — from 50M-record intelligence systems
          to sub-second conversational agents.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-5"
        >
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300 glow-accent"
            >
              Explore the work
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M12 5v14m0 0l6-6m-6 6l-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-block px-8 py-4 border border-paper/20 text-paper rounded-full hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        {/* Metrics rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/[0.07] border border-paper/[0.07] rounded-2xl overflow-hidden"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="bg-dark/80 backdrop-blur-sm px-6 py-5 group hover:bg-primary/10 transition-colors duration-500">
              <div className="text-2xl md:text-3xl font-bold text-accent tabular-nums">
                {m.value}
              </div>
              <div className="text-[11px] text-paper/45 mt-1 font-mono uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/35">
          Scroll
        </span>
        <motion.span
          className="block w-px h-10 bg-gradient-to-b from-accent/70 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
