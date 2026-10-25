import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServicePage } from "@/content/services";

/** Cards linking to service pages; used on /services, service pages and the home page. */
export function ServiceGrid({ items }: { items: ServicePage[] }) {
  return (
    <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-14px_rgba(34,34,34,0.18)]"
          >
            <span className="text-xs font-medium text-muted">
              {s.packages ? `${s.packages.length} packages on Upwork` : "Custom scope"}
            </span>
            <span className="mt-1.5 text-lg font-bold tracking-tight text-ink group-hover:text-brand-ink">{s.shortName}</span>
            <span className="mt-2 text-[15px] leading-relaxed text-muted">{s.metaDescription}</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-ink">
              View service
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
