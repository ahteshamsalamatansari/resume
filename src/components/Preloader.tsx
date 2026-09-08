'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const DURATION = 600;
const SESSION_KEY = 'preloader-shown';

/**
 * Boot sequence, kept short on purpose.
 *
 * The original ran for 1.75s and the hero then delayed its H1 by a further
 * 2.0s, which put Largest Contentful Paint at ~2.9s on every visit — a
 * guaranteed Core Web Vitals failure regardless of device or connection.
 * Now: 600ms, once per session, skipped entirely for reduced-motion users,
 * and the hero paints underneath immediately rather than waiting for it.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      // Storage blocked (private mode, blocked site data) — treat as unseen.
    }

    if (reduced || seen) {
      setDone(true);
      return;
    }

    setDone(false);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* non-fatal */
    }

    document.documentElement.style.overflow = 'hidden';
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99] bg-dark flex items-end justify-between p-8 md:p-14"
          exit={{ y: '-100%', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden
        >
          <div className="font-mono text-xs text-paper/55 space-y-1.5">
            <p>
              <span className="text-accent">$</span> initializing neural interface
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-accent">$</span> loading 50M+ records
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
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
