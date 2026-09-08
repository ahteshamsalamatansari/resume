'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import Portrait from '../Portrait';
import { FadeUp } from '../TextReveal';

const MANIFESTO =
  'I bridge the gap between cutting-edge GenAI and real business impact. My work sits at the intersection of LLMs, retrieval systems, and scalable data infrastructure — productionizing RAG architectures, vector search, and cloud-first MLOps that hold up under real load.';

const HIGHLIGHTS = ['LLMs,', 'retrieval', 'RAG', 'vector', 'MLOps'];

const FACTS = [
  { k: 'Focus', v: 'GenAI · RAG · Data Intelligence' },
  { k: 'Models', v: 'GPT-4, Claude, Llama, fine-tuned variants' },
  { k: 'Location', v: 'India · GMT+5:30 · Remote-friendly' },
  { k: 'Stack', v: 'Python · LangChain · AWS · K8s' },
];

/** One word whose opacity is driven by section scroll progress. */
function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const highlighted = HIGHLIGHTS.includes(word);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.28em] ${highlighted ? 'text-accent' : ''}`}
    >
      {word}
    </motion.span>
  );
}

/**
 * Pinned act: the viewport holds still while scrolling pours light
 * through the manifesto, word by word.
 */
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = MANIFESTO.split(' ');

  return (
    <section id="about" className="relative z-10 bg-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-40">
        <SectionHeading index="01" kicker="Signal" title={['Engineer. Operator.', 'Outcome-obsessed.']} />

        <div ref={ref} className="relative grid lg:grid-cols-12 gap-12 lg:gap-16">
          <p className="lg:col-span-8 text-2xl md:text-4xl leading-snug font-medium tracking-tight text-paper">
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[i / words.length, Math.min((i + 6) / words.length, 1)]}
              />
            ))}
          </p>

          <div className="lg:col-span-4 lg:pt-2">
            <div className="lg:sticky lg:top-32">
              <FadeUp y={20}>
                <Portrait className="mb-8 max-w-[320px]" />
              </FadeUp>
              {FACTS.map((row, i) => (
                <FadeUp key={row.k} delay={i * 0.08} y={20}>
                  <div className="group flex items-baseline justify-between gap-6 py-4 border-b border-paper/[0.08] hover:border-accent/30 transition-colors duration-500">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60 shrink-0">
                      {row.k}
                    </span>
                    <span className="text-sm text-paper/80 text-right">{row.v}</span>
                  </div>
                </FadeUp>
              ))}
              <FadeUp delay={0.4} y={20}>
                <p className="pt-6 font-mono text-xs leading-relaxed text-paper/60">
                  <span className="text-accent">//</span> 3+ years shipping AI
                  that survives contact with production traffic.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
