import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { UPWORK_PROFILE_URL } from "@/config/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Signature({ className = "" }: { className?: string }) {
  return <span className={`font-script font-semibold leading-none ${className}`}>Ahtesham Salamat Ansari</span>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-sm font-medium tracking-wide text-brand-ink">
      <span aria-hidden className="mt-[0.5lh] h-px w-6 shrink-0 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id: string;
}) {
  return (
    <header className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </header>
  );
}

type ButtonProps = { children: ReactNode; className?: string; size?: "sm" | "md" };

const sizes = { sm: "h-10 px-4 text-sm", md: "h-12 px-6 text-base" };

/** The single hiring CTA. Always points at the configured Upwork profile. */
export function UpworkButton({ children = "View Upwork Profile", className = "", size = "md" }: Partial<ButtonProps>) {
  return (
    <a
      href={UPWORK_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-dark font-semibold text-white transition-colors hover:bg-brand-ink ${sizes[size]} ${className}`}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-4" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function SecondaryButton({ href, children, className = "" }: ButtonProps & { href: string }) {
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-white px-6 font-semibold text-ink transition-colors hover:border-brand-dark hover:text-brand-ink ${className}`}
    >
      {children}
    </a>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-line bg-white px-2.5 py-1 text-[13px] font-medium text-ink/80">{children}</li>
  );
}
