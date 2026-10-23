import { Check, ChevronRight, CircleAlert, Database, FileSearch, Globe, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { Project } from "@/content/profile";

/**
 * Illustrative interface mockups. These are not screenshots of client or
 * employer systems. Only the headline figures come from the profile; row
 * labels and sample content are placeholders to show the shape of the work.
 */

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div aria-hidden className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(34,34,34,0.04),0_8px_24px_-12px_rgba(34,34,34,0.12)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        <span className="ml-2 truncate text-xs font-medium text-muted">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-lg border border-line p-3">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold text-ink">{value}</p>
      {note && <p className="mt-0.5 text-xs text-muted">{note}</p>}
    </div>
  );
}

function OutreachMockup() {
  const steps = [
    { name: "Load prospect record", tool: "Airtable via MCP", ok: true },
    { name: "Research and personalize", tool: "n8n workflow", ok: true },
    { name: "Draft email", tool: "LLM", ok: true },
    { name: "Enrichment lookup", tool: "API request", ok: false },
  ];
  return (
    <Frame title="Outreach workflow · control panel">
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Prospects" value="7,000" note="personalized drafts" />
        <Stat label="Generic replies" value="35 min" note="per day, was 4 h" />
      </div>
      <p className="mt-5 text-xs font-semibold text-ink">Latest run</p>
      <ul className="mt-2 divide-y divide-line rounded-lg border border-line">
        {steps.map((s) => (
          <li key={s.name} className="flex items-center gap-3 px-3 py-2.5">
            {s.ok ? (
              <Check className="size-4 shrink-0 text-brand-dark" />
            ) : (
              <CircleAlert className="size-4 shrink-0 text-amber-600" />
            )}
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{s.name}</span>
            <span className="hidden text-xs text-muted sm:inline">{s.tool}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                s.ok ? "bg-brand-tint text-brand-ink" : "bg-amber-50 text-amber-700"
              }`}
            >
              {s.ok ? "Done" : "Retry"}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function McqMockup() {
  const stages = [
    { icon: Globe, label: "Crawl", sub: "Selenium · Playwright" },
    { icon: FileSearch, label: "Extract", sub: "Source text" },
    { icon: Sparkles, label: "Generate", sub: "OpenAI" },
    { icon: ShieldCheck, label: "Check", sub: "Output quality" },
  ];
  return (
    <Frame title="MCQ generation pipeline">
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stages.map((s, i) => (
          <li key={s.label} className="relative rounded-lg border border-line p-3">
            <s.icon className="size-4 text-brand-dark" />
            <p className="mt-2 text-sm font-semibold text-ink">{s.label}</p>
            <p className="text-[11px] text-muted">{s.sub}</p>
            {i < stages.length - 1 && (
              <ChevronRight className="absolute -right-2.5 top-1/2 hidden size-4 -translate-y-1/2 rounded-full bg-white text-muted sm:block" />
            )}
          </li>
        ))}
      </ol>
      <div className="mt-4 rounded-lg border border-line bg-surface p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Sample output</p>
          <p className="text-[11px] font-semibold text-brand-ink">1.5M generated</p>
        </div>
        <p className="mt-2 text-sm font-medium text-ink">Which gas do plants absorb from the air during photosynthesis?</p>
        <ul className="mt-2 grid grid-cols-2 gap-1.5 text-[13px]">
          {["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"].map((o) => (
            <li
              key={o}
              className={`rounded-md border px-2.5 py-1.5 ${
                o === "Carbon dioxide" ? "border-brand bg-white font-semibold text-brand-ink" : "border-line bg-white text-ink/80"
              }`}
            >
              {o}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

function QualityMockup() {
  const bars = [
    { label: "Before", value: 78, tone: "bg-muted/40" },
    { label: "After", value: 94, tone: "bg-brand" },
  ];
  return (
    <Frame title="Dataset quality report">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Dataset accuracy</p>
      <div className="mt-3 space-y-3">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="w-12 text-xs font-medium text-muted">{b.label}</span>
            <div className="h-3 flex-1 rounded-full bg-surface">
              <div className={`h-3 rounded-full ${b.tone}`} style={{ width: `${b.value}%` }} />
            </div>
            <span className="w-10 text-right text-sm font-bold text-ink">{b.value}%</span>
          </div>
        ))}
      </div>
      <ul className="mt-5 grid gap-2 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, label: "SQL validation" },
          { icon: Database, label: "Deduplication" },
          { icon: Sparkles, label: "Enrichment" },
        ].map((c) => (
          <li key={c.label} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink">
            <c.icon className="size-4 text-brand-dark" />
            {c.label}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

const mockups = { outreach: OutreachMockup, mcq: McqMockup, quality: QualityMockup };

export function ProjectMockup({ kind, caption }: { kind: NonNullable<Project["mockup"]>; caption: string }) {
  const Mockup = mockups[kind];
  return (
    <figure>
      <Mockup />
      <figcaption className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted">
        <span className="shrink-0 rounded border border-line bg-white px-1.5 py-0.5 font-semibold uppercase tracking-wider text-[10px] text-ink/70">
          Illustrative mockup
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
