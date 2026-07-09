'use client';

import { SKILL_GROUPS } from '@/lib/data';

/**
 * Dual-direction skill ticker acting as a seam between the hero and
 * the first act — content duplicated for a seamless CSS loop.
 */
export default function Marquee() {
  const row = SKILL_GROUPS.flatMap((g) => g.items);

  return (
    <div className="relative z-10 py-6 border-y border-paper/[0.07] bg-dark/70 backdrop-blur-sm overflow-hidden mask-fade-x select-none" aria-hidden>
      <div className="flex gap-6 whitespace-nowrap w-max animate-[marquee_44s_linear_infinite]">
        {[...row, ...row].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 font-mono text-sm text-paper/40">
            {item}
            <span className="text-accent/50 text-[8px]">◆</span>
          </span>
        ))}
      </div>
      <div className="flex gap-6 whitespace-nowrap w-max mt-4 animate-[marquee-reverse_52s_linear_infinite]">
        {[...row, ...row].reverse().map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 font-mono text-sm text-paper/25">
            {item}
            <span className="text-primary/60 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
