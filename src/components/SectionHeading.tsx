'use client';

import { FadeUp, LineReveal } from './TextReveal';

export default function SectionHeading({
  index,
  kicker,
  title,
  className = '',
}: {
  index: string;
  kicker: string;
  title: string | string[];
  className?: string;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div className={`mb-16 md:mb-20 ${className}`}>
      <FadeUp className="flex items-center gap-4 mb-6" y={16}>
        <span className="font-mono text-xs text-accent/90 tracking-[0.25em] uppercase">
          {index}
        </span>
        <span className="h-px w-14 bg-gradient-to-r from-accent/60 to-transparent" />
        <span className="font-mono text-xs text-paper/40 tracking-[0.25em] uppercase">
          {kicker}
        </span>
      </FadeUp>
      <LineReveal
        as="h2"
        lines={lines}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest text-paper leading-[1.02]"
      />
    </div>
  );
}
