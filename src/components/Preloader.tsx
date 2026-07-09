'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Cinematic boot sequence: a counter climbs to 100 while system lines
 * type in, then the curtain lifts to reveal the hero.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = 'hidden';
    const start = performance.now();
    const duration = 1500;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out so the counter decelerates like a system settling
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = '';
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99] bg-dark flex items-end justify-between p-8 md:p-14"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden
        >
          <div className="font-mono text-xs text-paper/40 space-y-1.5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-accent">$</span> initializing neural interface
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <span className="text-accent">$</span> loading 50M+ records
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <span className="text-accent">$</span> systems online
            </motion.p>
          </div>
          <div className="text-right">
            <span className="block font-mono text-6xl md:text-8xl font-semibold text-paper tabular-nums tracking-tightest">
              {count}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              percent
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
