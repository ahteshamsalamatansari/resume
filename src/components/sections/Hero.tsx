'use client';

import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Magnetic from '../Magnetic';
import { LineReveal } from '../TextReveal';
import SocialLinks from '../SocialLinks';
import { METRICS, CONTACT } from '@/lib/data';
import { RESUME_PATH } from '@/lib/site';

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
        aria-hidden
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
          transition={{ delay: 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-paper/10 glass mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse-dot_2s_ease-in-out_infinite]" />
          <span className="text-xs text-paper/80 font-medium">
            Available for remote AI engineering roles
          </span>
        </motion.div>

        {/* The name, visible and crawlable, immediately above the H1 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-accent mb-5"
        >
          {CONTACT.name}
        </motion.p>

        <LineReveal
          as="h1"
          delay={0.15}
          lines={[
            <span key="1" className="text-paper">AI Engineer building</span>,
            <span
              key="2"
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
            >
              production GenAI that ships.
            </span>,
          ]}
          className="text-[clamp(2.4rem,6.6vw,6.2rem)] font-extrabold tracking-tightest leading-[0.99] mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-paper/70 max-w-2xl leading-relaxed mb-10"
        >
          3+ years turning LLMs, RAG, and data pipelines into measurable
          business outcomes — from 50M-record intelligence systems to
          sub-second conversational agents.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300 glow-accent"
            >
              Explore the work
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 border border-paper/25 text-paper rounded-full hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Get in touch
            </Link>
          </Magnetic>
          <a
            href={RESUME_PATH}
            download
            className="inline-flex items-center gap-2.5 px-6 py-4 text-paper/80 hover:text-accent transition-colors duration-300 font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Résumé
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.44, duration: 0.7 }}
          className="mt-9"
        >
          <SocialLinks />
        </motion.div>

        {/* Metrics rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/[0.07] border border-paper/[0.07] rounded-2xl overflow-hidden"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="bg-dark/80 backdrop-blur-sm px-6 py-5 group hover:bg-primary/10 transition-colors duration-500">
              <div className="text-2xl md:text-3xl font-bold text-accent tabular-nums">
                {m.value}
              </div>
              <div className="text-[11px] text-paper/60 mt-1 font-mono uppercase tracking-wider">
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
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/55">
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
