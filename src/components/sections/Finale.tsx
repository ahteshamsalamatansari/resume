'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
} from 'framer-motion';
import Magnetic from '../Magnetic';
import SocialLinks from '../SocialLinks';
import { CONTACT } from '@/lib/data';
import { RESUME_PATH } from '@/lib/site';

const GlobeScene = dynamic(() => import('../three/GlobeScene'), {
  ssr: false,
  loading: () => null,
});

/**
 * The finale: a 260vh pinned act. As the user descends, scattered
 * particles assemble into a dotted Earth, connection arcs ignite
 * across continents, and the contact invitation lands on top of it.
 */
export default function Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '400px' });
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  // feed scroll into the WebGL assembly without re-rendering React
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
  });

  // Act I headline: fades through mid-assembly
  const actOneOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 1, 0]);
  const actOneY = useTransform(scrollYProgress, [0.15, 0.55], [40, -40]);
  // Act II: contact lands once the globe is connected
  const actTwoOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);
  const actTwoY = useTransform(scrollYProgress, [0.62, 0.85], [60, 0]);
  const globeOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 bg-dark h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Globe */}
        <motion.div className="absolute inset-0" style={{ opacity: globeOpacity }}>
          {inView && <GlobeScene progressRef={progressRef} active={inView} />}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.75)_100%)] pointer-events-none" />
        </motion.div>

        {/* Act I — the thesis */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
          style={{ opacity: actOneOpacity, y: actOneY }}
          aria-hidden
        >
          <div className="text-center max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
              07 · Connect
            </p>
            <div className="text-4xl md:text-6xl font-extrabold tracking-tightest text-paper leading-[1.05]">
              AI systems connecting
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                the world.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Act II — the invitation */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: actTwoOpacity, y: actTwoY }}
        >
          <div className="text-center max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-8">
              One engineer · Global reach
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest text-paper leading-[0.98] mb-8">
              Let&apos;s build something
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                that actually ships.
              </span>
            </h2>
            <p className="text-lg text-paper/70 max-w-xl mx-auto mb-12">
              Open to remote AI engineering roles in GenAI, data intelligence,
              and production ML — from anywhere, to anywhere. Replies usually
              within a day.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
              <Magnetic>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-block px-9 py-4 md:px-10 md:py-5 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300 glow-accent text-base md:text-lg"
                >
                  {CONTACT.email}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-block px-9 py-4 md:px-10 md:py-5 border border-paper/25 text-paper rounded-full hover:border-accent hover:text-accent transition-colors duration-300 text-base md:text-lg"
                >
                  {CONTACT.phone}
                </a>
              </Magnetic>
            </div>

            <div className="flex flex-col items-center gap-6 mb-12">
              <SocialLinks className="justify-center flex-wrap" />
              <a
                href={RESUME_PATH}
                download
                className="inline-flex items-center gap-2.5 text-sm font-medium text-paper/80 hover:text-accent transition-colors duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download résumé (PDF)
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-xs text-paper/65">
              <span>{CONTACT.location}</span>
              <span aria-hidden>·</span>
              <span>Remote-friendly</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse-dot_2s_ease-in-out_infinite]" />
                Currently available
              </span>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
