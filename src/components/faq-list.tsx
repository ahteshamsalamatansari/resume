import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/services";

/** Question list. Answers stay in the HTML (inside <details>), so search engines read them. */
export function FaqList({ faqs, headingLevel = 3 }: { faqs: Faq[]; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 hover:bg-surface/60 sm:px-6 [&::-webkit-details-marker]:hidden">
            <Heading className="text-[17px] font-semibold leading-snug text-ink">{f.q}</Heading>
            <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-ink/85 sm:px-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
