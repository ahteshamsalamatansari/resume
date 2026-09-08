import type { Block } from '@/lib/data';

/**
 * Renders the long-form body of a case study, project or article.
 * Plain server-rendered markup — always visible, never opacity-gated, so
 * crawlers that do not execute JavaScript still read the full text.
 */
export default function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((block) => (
        <section key={block.heading} className="mb-14 last:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-paper mb-5">
            {block.heading}
          </h2>

          {block.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-paper/75 leading-relaxed mb-5 last:mb-0"
            >
              {p}
            </p>
          ))}

          {block.bullets && (
            <ul className="mt-7 space-y-3 border-l border-accent/30 pl-6">
              {block.bullets.map((b) => (
                <li
                  key={b}
                  className="text-base text-paper/70 leading-relaxed relative"
                >
                  <span
                    className="absolute -left-[27px] top-[0.6em] w-1.5 h-1.5 rounded-full bg-accent"
                    aria-hidden
                  />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
