import { FAQS } from '@/lib/data';

/**
 * Answer-shaped content. Every answer is written to stand alone when quoted
 * out of context — that is what makes it citable by an answer engine.
 * Deliberately always visible rather than collapsed: hidden text is worth
 * less to crawlers and nothing to a passage extractor.
 */
export default function Faq({
  heading = 'Questions, answered.',
  index = '08',
}: {
  heading?: string;
  index?: string;
}) {
  return (
    <section id="faq" className="relative z-10 bg-dark border-t border-paper/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs text-accent/90 tracking-[0.25em] uppercase">
            {index}
          </span>
          <span className="h-px w-14 bg-gradient-to-r from-accent/60 to-transparent" />
          <span className="font-mono text-xs text-paper/55 tracking-[0.25em] uppercase">
            FAQ
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tightest text-paper leading-[1.02] mb-14 md:mb-20">
          {heading}
        </h2>

        <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q} className="border-t border-paper/[0.1] pt-6">
              <dt className="text-lg md:text-xl font-semibold tracking-tight text-paper leading-snug">
                {f.q}
              </dt>
              <dd className="mt-3 text-base text-paper/70 leading-relaxed">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
