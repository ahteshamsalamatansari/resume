import Image from 'next/image';
import { CONTACT } from '@/lib/data';

/**
 * The portrait, in one place so every placement shares the same alt text,
 * dimensions and treatment. next/image serves AVIF/WebP at the requested
 * size (see next.config.js), so the 1254px source is never shipped as-is.
 */
export default function Portrait({
  size = 'lg',
  priority = false,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
  className?: string;
}) {
  const px = size === 'sm' ? 56 : size === 'md' ? 160 : 480;

  if (size === 'sm') {
    return (
      <Image
        src="/profile.png"
        alt={`${CONTACT.name}, ${CONTACT.role}`}
        width={px}
        height={px}
        priority={priority}
        className={`rounded-full border border-paper/15 object-cover ${className}`}
      />
    );
  }

  return (
    <figure className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-2xl border border-paper/[0.12]">
        <Image
          src="/profile.png"
          alt={`${CONTACT.name}, ${CONTACT.role}`}
          width={px}
          height={px}
          priority={priority}
          sizes={size === 'md' ? '160px' : '(max-width: 1024px) 60vw, 420px'}
          className="w-full h-auto object-cover"
        />
        {/* ties the photo's green backdrop into the page ground */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark/70 via-transparent to-transparent"
          aria-hidden
        />
      </div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
        {CONTACT.name} · {CONTACT.role}
      </figcaption>
    </figure>
  );
}
