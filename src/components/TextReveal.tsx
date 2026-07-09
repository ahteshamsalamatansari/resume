'use client';

import { motion } from 'framer-motion';

/**
 * Masked line-by-line text reveal. Each line slides up from behind an
 * overflow mask — the signature "cinematic type" entrance.
 */
export function LineReveal({
  lines,
  className = '',
  delay = 0,
  as: Tag = 'h1',
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.06em] -my-[0.06em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '110%', rotate: 2 },
              visible: {
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.9,
                  delay: delay + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Word-stagger fade-up for body copy. */
export function WordsReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ staggerChildren: 0.015, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.p>
  );
}

/** Simple fade-up block used across sections. */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
