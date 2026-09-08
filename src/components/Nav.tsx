'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import Magnetic from './Magnetic';
import { NAV_ITEMS } from '@/lib/data';

export default function Nav() {
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="glass border-b border-paper/[0.06]">
        <nav
          aria-label="Primary"
          className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 py-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-paper"
          >
            <span className="relative flex w-2 h-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Ahtesham<span className="text-accent">.ai</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`group relative px-3.5 py-2 text-sm transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-accent'
                    : 'text-paper/70 hover:text-paper'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-3.5 right-3.5 bottom-1 h-px bg-accent origin-left transition-transform duration-300 ease-out-expo ${
                    isActive(item.href)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <span className="font-mono text-xs text-paper/60 tabular-nums">
              {time} IST
            </span>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 text-sm font-semibold rounded-full bg-accent text-dark hover:bg-paper transition-colors duration-300"
              >
                Let&apos;s talk
              </Link>
            </Magnetic>
          </div>

          <button
            className="lg:hidden p-2 text-paper/80"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
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
          aria-hidden
        />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden glass border-b border-paper/[0.06]"
          >
            <nav aria-label="Mobile" className="flex flex-col px-6 py-6 gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`py-2.5 text-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-accent'
                      : 'text-paper/85 hover:text-accent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 py-2.5 text-lg font-medium text-accent"
              >
                Let&apos;s talk →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
