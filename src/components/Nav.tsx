'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import Magnetic from './Magnetic';
import { NAV_ITEMS, CONTACT } from '@/lib/data';

export default function Nav() {
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 240 && !menuOpen);
  });

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="glass border-b border-paper/[0.06]">
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <motion.a
            href="#top"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            className="flex items-center gap-2.5 font-bold tracking-tight text-paper"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Ahtesham<span className="text-accent">.ai</span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-3.5 py-2 text-sm text-paper/55 hover:text-paper transition-colors duration-300"
              >
                {item.label}
                <span className="absolute left-3.5 right-3.5 bottom-1 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out-expo" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.7 }}
            className="hidden lg:flex items-center gap-5"
          >
            <span className="font-mono text-xs text-paper/35 tabular-nums">
              {time} IST
            </span>
            <Magnetic>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-block px-5 py-2.5 text-sm font-semibold rounded-full bg-accent text-dark hover:bg-paper transition-colors duration-300"
              >
                Let&apos;s talk
              </a>
            </Magnetic>
          </motion.div>

          <button
            className="lg:hidden p-2 text-paper/70"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>

        {/* Scroll progress hairline */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ scaleX: progress }}
        />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden glass border-b border-paper/[0.06]"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-2.5 text-lg font-medium text-paper/75 hover:text-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                onClick={() => setMenuOpen(false)}
                className="mt-3 py-2.5 text-lg font-medium text-accent"
              >
                Let&apos;s talk →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
