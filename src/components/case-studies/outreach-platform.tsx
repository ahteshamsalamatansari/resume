import { ArrowDown, ArrowRight, CornerDownLeft, UserCheck } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Long-form body of the AI Outreach Automation Platform case study.
 * Text follows Ahtesham's own engineering write-up (24 Oct 2026). The client,
 * people, domains and infrastructure identifiers are removed there and must
 * stay out here. No campaign performance figures exist, so none are added.
 */

export const outreachToc = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "brief", label: "The brief" },
  { id: "architecture", label: "System architecture" },
  { id: "research", label: "Data model and research" },
  { id: "drafting", label: "The AI drafting pipeline" },
  { id: "grounding", label: "Keeping the AI honest" },
  { id: "approval", label: "The human approval gate" },
  { id: "deliverability", label: "Deliverability engineering" },
  { id: "replies", label: "Replies, bounces and opt-outs" },
  { id: "control-panel", label: "The operator control panel" },
  { id: "practice", label: "Engineering practice" },
  { id: "problems", label: "Five problems worth describing" },
  { id: "shipped", label: "What shipped" },
  { id: "stack", label: "Stack and skills" },
];

function Section({ id, title, lead, children }: { id: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      {lead && <p className="mt-3 text-lg leading-relaxed text-ink">{lead}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="pt-3 text-lg font-bold tracking-tight text-ink">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[17px] leading-relaxed text-ink/85">{children}</p>;
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.88em] text-ink">{children}</code>;
}

function Bullets({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <List className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[17px] leading-relaxed text-ink/85">
          {ordered ? (
            <span
              aria-hidden
              className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-xs font-semibold tabular-nums text-brand-ink"
            >
              {i + 1}
            </span>
          ) : (
            <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-brand" />
          )}
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </List>
  );
}

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full border-collapse text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-surface">
            {head.map((h, i) => (
              <th key={i} scope="col" className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink/60">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="w-[38%] px-4 py-3 align-top font-semibold text-ink">
                    {cell}
                  </th>
                ) : (
                  <td key={c} className="px-4 py-3 align-top leading-relaxed text-ink/85">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-brand bg-brand-tint px-5 py-4 text-[17px] leading-relaxed text-ink">
      {children}
    </div>
  );
}

function Problem({ n, title, rows }: { n: number; title: string; rows: { label: string; body: ReactNode }[] }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <h3 className="flex gap-3 text-lg font-bold tracking-tight text-ink">
        <span className="tabular-nums text-brand-ink">{n}.</span>
        {title}
      </h3>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink/60">{r.label}</dt>
            <dd className="mt-1 leading-relaxed text-ink/85">{r.body}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/* ---------- Diagrams ---------- */

const stages = [
  { name: "Import", sub: "Idempotent, re-runnable list import" },
  { name: "Research", sub: "Crawl the organisation's own website" },
  { name: "Draft", sub: "Strategy call, then writing call" },
  { name: "Validate", sub: "Code validators and self-check" },
  { name: "Approve", sub: "A person approves each row", gate: true },
  { name: "Send", sub: "Allocated across the mailbox pool" },
  { name: "Route replies", sub: "Replies, bounces and opt-outs" },
  { name: "Follow up", sub: "Back through approval, never around it" },
];

function ArchitectureDiagram() {
  return (
    <figure>
      <div className="rounded-2xl border border-line bg-white p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">Per campaign · built 3 times</p>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li
              key={s.name}
              className={`rounded-lg border p-3 ${s.gate ? "border-brand bg-brand-tint" : "border-line bg-white"}`}
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="tabular-nums text-muted">{i + 1}</span>
                {s.name}
                {s.gate && <UserCheck aria-hidden className="ml-auto size-4 text-brand-ink" />}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{s.sub}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 flex items-center gap-2 text-[13px] text-muted">
          <CornerDownLeft aria-hidden className="size-4 shrink-0 text-brand-ink" />
          Follow-ups re-enter at step 5, so every email in a sequence is reviewed like the first.
        </p>
        <div className="mt-4 rounded-lg border border-dashed border-ink/25 bg-surface p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">Shared by all 3 campaigns</p>
          <ul className="mt-2 flex flex-wrap gap-1.5 text-[13px]">
            {["20-mailbox sending pool", "Append-only send ledger", "Bounce circuit breakers", "Operator control panel"].map(
              (t) => (
                <li key={t} className="rounded-md border border-line bg-white px-2.5 py-1 font-medium text-ink/80">
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Simplified diagram: 8 stages, 1 human gate, 1 shared infrastructure layer.
      </figcaption>
    </figure>
  );
}

const draftSteps = [
  { name: "Inputs", sub: "Research profile + active knowledge-base rows only" },
  { name: "Call 1 · Strategy", sub: "Decides what to say, not how" },
  { name: "Call 2 · Write", sub: "Writes the email from that angle" },
  { name: "Code validator", sub: "Numbers, service offers, projections", code: true },
  { name: "Call 3 · Self-check", sub: "Yes or no against each rule" },
  { name: "Rewrite if needed", sub: "Only on a hard failure or two soft misses" },
];

function DraftingDiagram() {
  return (
    <figure>
      <ol className="grid gap-2 rounded-2xl border border-line bg-white p-4 sm:grid-cols-3 sm:p-6">
        {draftSteps.map((s, i) => (
          <li
            key={s.name}
            className={`relative rounded-lg border p-3 ${s.code ? "border-ink/30 bg-surface" : "border-line bg-white"}`}
          >
            <p className="text-sm font-semibold text-ink">{s.name}</p>
            <p className="mt-1 text-[13px] leading-snug text-muted">{s.sub}</p>
            {i < draftSteps.length - 1 && (
              <>
                <ArrowDown aria-hidden className="mx-auto mt-2 size-4 text-muted sm:hidden" />
                {i % 3 !== 2 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-1/2 z-10 hidden size-4 -translate-y-1/2 rounded-full bg-white text-muted sm:block"
                  />
                )}
              </>
            )}
          </li>
        ))}
        <li className="rounded-lg border border-brand bg-brand-tint p-3 sm:col-span-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <UserCheck aria-hidden className="size-4 text-brand-ink" />
            To the approval queue
          </p>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            A draft that cannot be produced honestly is recorded as a failure, not replaced with something plausible.
          </p>
        </li>
      </ol>
      <figcaption className="mt-3 text-sm text-muted">
        Drafting pipeline: 3 model calls, 1 conditional rewrite, 1 code validator.
      </figcaption>
    </figure>
  );
}

/* ---------- Body ---------- */

export function OutreachPlatformBody() {
  return (
    <div className="space-y-16">
      <Section
        id="at-a-glance"
        title="At a glance"
        lead="A three-segment outreach platform that researches each prospect organisation from its own website, drafts a personalised email grounded in an approved knowledge base, holds it for human approval, sends it across a 20-mailbox pool under a shared rate limit, and handles every reply, bounce and opt-out that comes back."
      >
        <Table
          caption="Project facts"
          head={["", "Detail"]}
          rows={[
            ["Role", "Sole engineer: architecture, build, testing, deployment, documentation, client communication"],
            ["Duration", "About 3 months"],
            ["Domain", "Multi-segment B2B outreach for a regional service company"],
            ["Segments", "3 parallel campaigns, each with its own database, knowledge base and messaging rules"],
            ["Contacts under management", "10,691 across 4,350 organisations"],
            ["Automated research profiles", "3,503 organisations researched from their own websites"],
            ["Workflows", "About 60 in n8n, each version-controlled and published through the API"],
            ["Sending capacity", "20 authenticated mailboxes, 500 emails/day ceiling, shared across all segments"],
            ["Test coverage", "500+ automated assertions across 14 suites, run against deployed code"],
            ["Core stack", "n8n · Airtable · OpenAI · Node.js · Python · Docker · Traefik · SQLite · IMAP/SMTP"],
          ]}
        />
        <Callout>
          The engineering emphasis throughout was <strong>failing closed</strong>: every gate, cap and suppression rule is
          built so that a fault stops an email rather than releasing one.
        </Callout>
      </Section>

      <Section
        id="brief"
        title="The brief"
        lead="The client sold the same service to three audiences that buy it for entirely different reasons, and had no way to reach any of them at volume."
      >
        <P>
          The three segments shared a product but nothing else: different decision-makers, different objections,
          different commercial terms, and in one case a service the client explicitly does <strong>not</strong> offer
          but which prospects in that segment ask for constantly. A single generic campaign would have been wrong for all
          three.
        </P>
        <Table
          caption="Constraints and their effect on the design"
          head={["Constraint", "Consequence for the design"]}
          rows={[
            ["Owner is non-technical", "Everything operable from a dashboard and a spreadsheet-style grid; no terminal, no workflow editor"],
            ["Nothing may send without human sign-off", "A human approval gate enforced in the database filter and re-checked in code"],
            ["AI must never invent a price, a claim or an offer", "Hard validators in code, not instructions in a prompt"],
            ["Shared sending reputation", "One pool of mailboxes serving all three campaigns, so a problem in one degrades the others"],
            ["Commercial terms still unconfirmed in one segment", "Unapproved facts made structurally unavailable to the model rather than flagged in a document"],
            ["Prospect lists arrive by hand", "Import tooling built to be idempotent and re-runnable against live data"],
          ]}
        />
        <P>
          The last two drove most of the architecture. &ldquo;The client has not confirmed this yet&rdquo; had to become
          something the system enforced, not something a person remembered.
        </P>
      </Section>

      <Section id="architecture" title="System architecture">
        <ArchitectureDiagram />
        <P>
          The same eight-stage pipeline is instantiated three times, once per campaign, each with its own database,
          knowledge base and messaging rules. What the three share is the part where mistakes are expensive: one pool of
          sending mailboxes, one ledger that caps them collectively, and one control surface.
        </P>
        <P>
          Follow-ups loop back through the approval gate rather than around it, so the second and third emails to a
          prospect are reviewed exactly like the first.
        </P>
      </Section>

      <Section
        id="research"
        title="Data model and automated research"
        lead="Personalisation is only as good as the research behind it, so the system reads each prospect organisation's own website before it writes anything."
      >
        <P>
          Each segment has its own database of 12–13 linked tables. The anchor is the <strong>organisation</strong>, not
          the contact, because several contacts usually share one employer. Researching once per organisation and reusing
          it across its contacts cut model calls by roughly two thirds for identical output.
        </P>
        <Table
          caption="Core tables common to all three segments"
          head={["Table", "Holds"]}
          rows={[
            ["Organisations", "The prospect company, its research status and derived priority score"],
            ["Contacts", "The person, their role category, send tier, approval state and suppression flags"],
            ["Research profiles", "One AI-generated profile per organisation, appended rather than overwritten"],
            ["Knowledge base", "Approved facts, prices and proof points: the only things the AI may quote"],
            ["Campaigns", "Segment grouping, health status and the pause flag the circuit breaker writes"],
            ["Replies", "Inbound mail, its classification, the drafted answer and the final sent text"],
            ["Send ledger", "One append-only row per email sent, shared across all three segments"],
            ["Document library", "Attachable PDFs with an on/off flag per document"],
          ]}
        />
        <H3>The research crawler</H3>
        <P>
          For each organisation the crawler fetches the homepage, scores every internal link it finds, then fetches the
          highest-scoring pages and sends the combined text to the model for structured extraction.
        </P>
        <P>
          Link scoring is tuned per segment. Events and news pages rank highest, because a dated event the prospect has
          publicly announced is the most useful personalisation signal available. Sponsor and partner pages rank highly in
          one segment because they are double evidence: the organisation raises money <em>and</em> already transacts
          with local businesses.
        </P>
        <P>Three details mattered more than expected:</P>
        <Bullets
          ordered
          items={[
            <>
              <strong>Exact fallback strings.</strong> The model returns a literal marker such as{" "}
              <Code>NO EVENT SIGNALS FOUND</Code> rather than free prose, so &ldquo;nothing found&rdquo; is
              machine-detectable instead of looking like a thin answer.
            </>,
            <>
              <strong>One page per scoring band.</strong> An early version picked three near-identical news items; the
              picker now takes at most one page from each band, so three fetches are three <em>kinds</em> of page.
            </>,
            <>
              <strong>Hostname excluded from scoring.</strong> A keyword in the domain name was matching every page on the
              site, which caused one organisation&rsquo;s privacy policy to be selected as its research source.
            </>,
          ]}
        />
        <P>Measured cost: about 5,500 tokens and one cent per organisation, roughly eight seconds each.</P>
      </Section>

      <Section id="drafting" title="The AI drafting pipeline">
        <DraftingDiagram />
        <P>
          Splitting strategy from writing was the change that moved quality most. A single call asked to both choose an
          angle and write well tends to do neither; a cheap first call that only decides <em>what to say</em> leaves the
          writing call a much narrower job.
        </P>
        <P>
          The self-check is a separate call that answers yes or no against each rule rather than being asked to
          &ldquo;review the draft&rdquo;. A rewrite is triggered only by a hard code failure or two soft misses. An
          earlier version rewrote on any single miss, which meant rewriting almost everything and losing good drafts in
          the process.
        </P>
        <P>
          <strong>Why a node graph rather than one block of code.</strong> The platform&rsquo;s code sandbox has no HTTP
          client, so each model call is a separate node. That turned out to be useful: every stage&rsquo;s input and
          output is inspectable in the execution record, which is how most of the prompt-level bugs were found.
        </P>
        <Callout>
          The first live run produced no draft at all, and the honest-placeholder path correctly recorded a failure
          rather than writing something plausible. The cause was a lookup node running once per input item instead of
          once per execution, multiplying the knowledge base by every row of another table and pushing the prompt to
          282,000 characters. With an execute-once guard and a deduplication pass, token use per email fell from{" "}
          <strong>36,735 to 5,818</strong>.
        </Callout>
      </Section>

      <Section
        id="grounding"
        title="Keeping the AI factually honest"
        lead="Every commercial claim the system can make is enforced in code against an approved list, not requested in a prompt."
      >
        <P>
          Asking a model not to invent prices works most of the time, and most of the time is not good enough when the
          output is a commitment to a customer. After the draft is written, a validator extracts every currency figure,
          percentage and quantity from the text and checks each one against the set injected from the knowledge base for
          that specific email. Anything outside that set is a violation.
        </P>
        <Table
          caption="The three validators"
          head={["Validator", "Rejects"]}
          rows={[
            ["Numbers", "Any figure not present in an active knowledge-base row or the injected research"],
            ["Service offers", "Offering a service the client does not sell, in the segment where prospects ask for it most"],
            ["Projection", "Telling a prospect what they will earn, as opposed to attributing a figure to a named reference customer"],
          ]}
        />
        <H3>The kill switch is a checkbox</H3>
        <P>
          Each knowledge-base row has an <strong>Active</strong> flag, and only active rows are fetched into the prompt.
          Switching a row off removes its figures from the accepted set, so the model can no longer quote them, and the
          validator would reject them even if it tried.
        </P>
        <P>
          This turned an open commercial question into an enforced constraint. Six items in one segment were commercially
          unconfirmed at build time. Rather than note them in a document and hope, they were loaded inactive. The
          generator could not quote them, because the rows were not there to quote.
        </P>
        <H3>Distinguishing an offer from a reference</H3>
        <P>
          The hardest validator guards the service the client does not provide. &ldquo;We would love to sponsor your
          team&rdquo; and &ldquo;I noticed your sponsor programme and would like to talk&rdquo; both contain a first
          person, an offering verb and the same keyword. One is a commitment nobody authorised; the other is the best
          personalisation available in that segment.
        </P>
        <P>
          The validator strips references to the prospect&rsquo;s <em>own</em> programme before testing what remains, and
          treats an explicit refusal as safe: declining to offer something is the correct answer, not a violation. A
          dedicated test holds that line. It was written before the workflow was built, and it failed on its first run.
        </P>
        <H3>Validators can also be wrong</H3>
        <P>
          Two defects made the system <em>too</em> strict, and both were invisible from the pass/fail flag alone:
        </P>
        <Bullets
          items={[
            "A reply confirming a prospect's own stated figure back to them was rejected as an invented claim; the validator was fighting a prompt rule that asked the model to confirm details back. Fixed by adding every number in the inbound message to the allowed set.",
            "A figure from the client's own approved answer text was rejected, because only one knowledge table had been whitelisted and not the FAQ text injected alongside it.",
          ]}
        />
        <P>
          Both were found by reading the drafts, not the test results. A validator that silently replaces good output with
          a safe fallback looks identical to one that is working.
        </P>
      </Section>

      <Section
        id="approval"
        title="The human approval gate"
        lead="No email can reach the send node without a person having approved that specific row, and the rule is enforced twice: once in the database query, once again in code."
      >
        <P>
          The reviewer works in a grid: subject, draft, personalisation score, approval status. Setting one field to{" "}
          <strong>Approved</strong> is the send authorisation. Edits to the draft in that grid are what actually goes out,
          so what the reviewer reads is what the recipient receives.
        </P>
        <H3>Enforced in two independent places</H3>
        <P>
          The database filter that selects sendable rows requires approval. A code gate immediately after re-checks the
          same conditions on every item, so a manual run, a pinned execution or a hand-made queue task cannot bypass the
          filter. That redundancy caught a real defect: an early version applied the suppression rules only to the
          scheduled path, leaving a direct invocation able to process a suppressed contact.
        </P>
        <H3>What else must be true</H3>
        <P>
          Approval is necessary but not sufficient. Every send also requires that the contact is not hard-bounced, has not
          opted out, is not marked do-not-contact, does not belong to a suppressed organisation, has not already been sent
          to, belongs to a campaign that has not paused itself, and falls within the daily send allowance. All of it fails
          closed: if the paused-campaign lookup errors, the gate emits nothing rather than assuming nothing is paused.
        </P>
        <H3>A simplification that had to be done carefully</H3>
        <P>
          The gate originally had two keys, row approval plus a separate batch release. The client found it cumbersome, so
          it was reduced to one. The batch builder was the <strong>only</strong> thing that wrote the frozen draft
          snapshot the sender required, so removing the batch interface alone would have left every approved row sitting
          there forever, sending nothing, with no error anywhere.
        </P>
        <P>
          The sender was rewritten to fall back to the live draft, the readiness formula was rewritten to match, and the
          senders now stamp the exact text they sent for audit. Tests written for the change caught that dropping the
          batch condition had also dropped the check for non-empty body text, which would have put empty emails on the
          wire.
        </P>
      </Section>

      <Section
        id="deliverability"
        title="Deliverability engineering"
        lead="Sending is spread across 20 authenticated mailboxes on two domains, with a shared daily ledger so that three independent campaigns cannot collectively exceed what any one mailbox can safely send."
      >
        <H3>The shared ledger</H3>
        <P>
          Each send appends one row to a single ledger table recording the date, the mailbox and the campaign. Every
          sender reads that same ledger before dispatching. Three campaigns each enforcing their own per-mailbox limit
          would allow three times the intended volume from the same address; one ledger makes the combined cap real.
        </P>
        <P>
          The cap is proven by test: with the ledger pre-filled to the limit by <em>other</em> campaigns, a campaign that
          had sent nothing all day still correctly emitted zero. The ledger is append-only by design, because an earlier
          one-row-per-day design needed read-modify-write and silently lost counts when two cycles overlapped.
        </P>
        <H3>Allocation</H3>
        <P>
          The allocator reads remaining headroom per mailbox and hands each approved contact to the next mailbox that
          still has room, decrementing as it goes. An earlier version divided the batch evenly with capacity summed
          globally, which pushed one mailbox 50% past its limit while another sat idle.
        </P>
        <H3>Bounce circuit breakers</H3>
        <Table
          caption="Bounce thresholds and actions"
          head={["Threshold", "Action"]}
          rows={[
            ["Below 25 sends", "No action: minimum sample guard"],
            ["5%", "Warn; pause the lower-confidence address tier where one exists"],
            ["10%", "Pause the campaign"],
          ]}
        />
        <P>
          The monitors never un-pause. Recovery is a human decision, surfaced as a one-click control in the dashboard. The
          minimum-sample guard matters more than the thresholds: one bounce on one send is a 100% bounce rate, and without
          the guard a new campaign would stop itself on its first delivery failure.
        </P>
        <H3>Capacity, before and after</H3>
        <P>
          An audit late in the project found that one campaign had been wired to a single mailbox and the other two to
          four, while all 20 were being polled for replies. The real ceiling was 100 emails a day, not the 500 everyone
          assumed.
        </P>
        <Table
          caption="Sending capacity before and after the audit"
          head={["", "Before", "After"]}
          rows={[
            ["Mailboxes wired to send", "4 of 20", "20 of 20"],
            ["System-wide daily ceiling", "100", "500"],
            ["Time to work the largest list", "About 177 days", "About 30 days"],
          ]}
        />
        <P>
          Before widening it, both domains were checked for identical SPF and DMARC policy and all 20 credentials were
          verified, so there was no deliverability reason the other sixteen had been idle. They had never been wired in.
        </P>
      </Section>

      <Section
        id="replies"
        title="Replies, bounces and opt-outs"
        lead="All 20 mailboxes are polled over IMAP into a single router that cleans each message, works out which campaign it belongs to, and files it, or suppresses the sender permanently."
      >
        <H3>One router, three campaigns</H3>
        <P>
          An early design gave each campaign its own IMAP readers across the same 20 mailboxes, so three readers raced for
          each message and the losers never saw it. The replacement is a single router. Readers write no IMAP flags and
          track the last message id per mailbox instead, so new-mail detection does not depend on a server-side flag
          another process can change. The router also marks the contact as having replied, which removes them from the
          follow-up sequence.
        </P>
        <H3>Bounce classification</H3>
        <P>
          Bounce-backs were originally discarded as automated mail, which meant the circuit breakers were measuring a rate
          that could only ever be zero. The router now parses delivery status notifications, extracts the failed
          recipient from the standard headers, and classifies by status code. Permanent failures suppress the address;
          temporary ones do not; anything unclassifiable is treated as temporary, because a soft bounce is retried while a
          hard bounce discards a live lead.
        </P>
        <P>Three false positives found in testing would each have destroyed real prospects silently:</P>
        <Bullets
          items={[
            "Bare numbers were counted as bounce evidence, so an auto-acknowledgement that quoted the price list back marked the live prospect who sent it as permanently failed.",
            "A “delivery delayed” notice, where nothing had failed and the server was still retrying, was recorded as a bounce and blocked a deliverable address.",
            "The outgoing email footer, surviving in quoted history the trimmer had missed, was read as the recipient’s opt-out request, suppressing a positive reply from an interested prospect.",
          ]}
        />
        <H3>Opt-out handling</H3>
        <P>
          Unsubscribe detection is deliberately a regex, not a model call: it is the one decision that must not depend on a
          model getting it right. The patterns are narrow on purpose. A bare &ldquo;stop&rdquo; or &ldquo;remove&rdquo;
          does not qualify, because the phrase has to be about being contacted. Matching runs on the cleaned body with
          quoted history stripped, so an unsubscribe link inside a quoted copy of the original email cannot trigger it.
        </P>
        <P>
          Once suppressed, a contact is excluded by every sender filter, every gate&rsquo;s code check, the readiness
          formula, and the sequence-restart tool, which refuses a suppressed address outright.
        </P>
        <H3>AI-drafted replies</H3>
        <P>
          Inbound messages are classified, have structured details extracted, and get a suggested answer drafted against
          the same grounded knowledge base. Requests for the service the client does not sell, custom commercial terms or
          unusually large enquiries escalate to a human instead.
        </P>
        <P>
          Escalation checks both the model&rsquo;s classification <strong>and</strong> a regex over the raw message. In
          testing, a message explicitly requesting the unsold service was misclassified by the model; the regex caught it
          and escalated anyway.
        </P>
      </Section>

      <Section
        id="control-panel"
        title="The operator control panel"
        lead="A non-technical owner needed to start and stop a system of sixty workflows without opening a workflow editor, so the project includes a small custom web app as the single operating surface."
      >
        <P>
          It is deliberately plain: Node with no dependencies, served from a container behind a reverse proxy with TLS,
          single sign-in, and the database token held server-side so it never reaches the browser.
        </P>
        <Table
          caption="What the control panel exposes"
          head={["Control", "Purpose"]}
          rows={[
            ["Master switch", "One stop for everything, independent of per-campaign state"],
            ["Per-campaign drafting and sending", "Two switches per campaign, both required"],
            ["Daily send limit", "Editable, clamped at three layers rather than trusted"],
            ["Work waiting", "Drafts to review, replies waiting, approved and ready to send"],
            ["Sending capacity today", "Per-mailbox usage against the shared cap"],
            ["Bounce rates", "Per campaign, against the same thresholds the breakers use"],
            ["Paused campaigns + resume", "Appears only when something has stopped itself"],
            ["Guarded maintenance actions", "Re-research an organisation, restart a contact's sequence"],
            ["Activity log", "Who changed what, when"],
          ]}
        />
        <H3>The panel&rsquo;s numbers must agree with the automation</H3>
        <P>
          The bounce card&rsquo;s arithmetic is a cross-check, not an independent implementation. Its test extracts the
          panel&rsquo;s function <em>and</em> the deployed monitor&rsquo;s code, runs both over the same synthetic data,
          and asserts they agree on every campaign. A dashboard that disagrees with the circuit breaker is worse than no
          dashboard, because it is believed.
        </P>
        <P>
          Below the minimum sample, the card shows raw counts and &ldquo;too early to tell&rdquo; instead of a rate the
          breaker would correctly ignore.
        </P>
        <H3>Guards, not relocated checkboxes</H3>
        <P>
          The maintenance actions exist on the panel because of what they refuse. Re-research for an organisation with no
          website used to be accepted and then silently skipped; restarting a bounced contact used to look like it worked
          and then be rejected downstream. The panel refuses both up front, says which reason applied, and logs the
          attempt.
        </P>
      </Section>

      <Section
        id="practice"
        title="Engineering practice"
        lead="The dominant failure mode in this system is not a crash. It is a step that reports success and does nothing. Most of the practice below exists to catch that shape of bug."
      >
        <H3>Tests run against deployed code, not a copy</H3>
        <P>
          Each suite extracts the actual function body out of the deployed workflow definition and runs it against stubbed
          platform globals, which proves the shipped code works rather than a local copy. The suites reproduce the
          runtime&rsquo;s constraints too: the workflow sandbox has no <Code>URL</Code> class, so the URL-handling tests
          pass <Code>URL</Code> as <Code>undefined</Code> on purpose.
        </P>
        <P>
          <strong>Over 500 assertions across 14 suites</strong> cover every send gate, the cap arithmetic, bounce
          classification, opt-out detection, escalation rules, the grounding validators and the template renderer.
        </P>
        <H3>Verification after every deployment</H3>
        <Bullets
          ordered
          items={[
            "Pull the deployed code back out of the live database.",
            "Compare it byte-for-byte against the tested file.",
            "Confirm the workflow is active and its current version matches its published version.",
            "Confirm the published record carries the change, since that is what actually executes.",
            "Where a live run is affordable, trigger one and read the execution record.",
          ]}
        />
        <P>
          Step 4 is not pedantry. An active workflow runs its published snapshot, not the draft, so a change written only
          to the draft deploys cleanly, reports success, and changes nothing.
        </P>
        <H3>Bounded blast radius</H3>
        <P>
          Before any change that touches live data, the affected set is measured first. A database aggregation gives the
          full distribution of a field in one call, so the number of records a new filter will match is known before it is
          deployed. The checklist also asks &ldquo;can this workflow fire on its own schedule?&rdquo;, added after a
          single-record test let a scheduled sweep fire twice and produce work nobody had asked for.
        </P>
        <H3>A read-only audit agent</H3>
        <P>
          The recurring failure patterns were written up as a reusable audit specification: eleven failure classes, each
          with the real case from this codebase that produced it. Audits run against it over separate scopes found ten
          defects, three of them introduced in the preceding 48 hours. Every finding was re-verified by hand against the
          live system before being acted on. An audit report is a lead, not evidence.
        </P>
      </Section>

      <Section
        id="problems"
        title="Five problems worth describing"
        lead="Each of these reported success while doing nothing, which is why they are worth writing down."
      >
        <Problem
          n={1}
          title="A missing global silently disabled every research crawl"
          rows={[
            {
              label: "Symptom",
              body: "Personalisation was thin everywhere. Thousands of organisations were marked researched, yet the profiles carried almost no usable detail.",
            },
            {
              label: "Cause",
              body: (
                <>
                  The workflow sandbox has no <Code>URL</Code> class. Every crawler resolved links with{" "}
                  <Code>new URL(href, base)</Code> inside a <Code>try/catch</Code> that skipped the link on throw, so every
                  link was discarded on every site and each crawler fell back to re-reading the homepage. Nothing errored.
                </>
              ),
            },
            {
              label: "Fix",
              body: "String-based URL resolution for absolute, protocol-relative, root-relative and directory-relative links. Verified by tests that pass URL as undefined, and by a before/after crawl: sources reaching the prompt went from homepage-only to homepage plus three scored subpages.",
            },
          ]}
        />
        <Problem
          n={2}
          title="Scheduled runs were executing thirteen-day-old code"
          rows={[
            {
              label: "Symptom",
              body: "Manual runs produced correct output. The same workflow on its schedule produced output matching a version that no longer existed anywhere in the database.",
            },
            {
              label: "Cause",
              body: "The platform registers a scheduled trigger's workflow definition in memory at activation. The process had been running for thirteen days, so scheduled executions ran the code as it stood at process start, while manual runs read the current version.",
            },
            {
              label: "Fix",
              body: "Unpublish and republish through the running instance's API, which re-registers from the database. Proven by letting the next scheduled run fire and confirming its output carried the new code.",
            },
          ]}
        />
        <Problem
          n={3}
          title="A filter that matched zero rows, forever"
          rows={[
            {
              label: "Symptom",
              body: "A filter joining a linked-record field returned no rows under any conditions.",
            },
            {
              label: "Cause",
              body: "The array-join function on a linked-record field returns display values, not record ids, so the filter compared an id against a list of names. In a second case of the same class, 4,314 contacts in the largest segment sat in a status value a later filter rewrite no longer accepted, invisible to drafting.",
            },
            {
              label: "Fix",
              body: "Both corrected, and verified at no cost by running the deployed filter expression directly against the database: zero matches before, a full page after.",
            },
          ]}
        />
        <Problem
          n={4}
          title="A retry loop that starved the real work"
          rows={[
            {
              label: "Symptom",
              body: "Executions succeeded continuously for hours while the completed count did not move.",
            },
            {
              label: "Cause",
              body: "The sweep excluded Success and Running but not its own Skipped state, so dead records were re-selected, re-crawled and re-sent to the model on every pass while unprocessed records were never reached.",
            },
            {
              label: "Fix",
              body: "Exclude terminal states from the sweep. On the next pass the looping records gained zero new profiles, and starved records went from fourteen to zero. “Executions succeeded” had proved nothing.",
            },
          ]}
        />
        <Problem
          n={5}
          title="Attachments 60% smaller with no visible quality loss"
          rows={[
            {
              label: "Problem",
              body: "Attachment encoding inflates an email by about a third, so a 7.5 MB PDF became a 10.3 MB message, right at the limit many corporate mail systems reject.",
            },
            {
              label: "Approach",
              body: "Measured where the bytes were: 84% of each file was barely compressed RGB bitmaps. Lossless optimisation was worth 1.4%. Re-encoding only the bitmaps cut files by 58–76%, using per-image stream edits because the platform's batch image rewrite corrupted gradients.",
            },
            {
              label: "Result",
              body: "Text layer identical page for page, every image at its original pixel size, transparency masks byte-for-byte unchanged, 49.1 dB PSNR. The largest message dropped from 10.4 MB to 4.3 MB, confirmed by a live test send.",
            },
          ]}
        />
      </Section>

      <Section
        id="shipped"
        title="What shipped"
        lead="The handover was a running system plus the documentation needed to operate it without me."
      >
        <Table
          caption="Deliverables"
          head={["Deliverable", "Detail"]}
          rows={[
            ["Three campaign databases", "12–13 linked tables each, with approval and reply interfaces for non-technical reviewers"],
            ["About 60 automation workflows", "Research, drafting, sending, follow-up, reply handling, bounce monitoring, dry runs"],
            ["Operator control panel", "Custom web app, containerised behind TLS"],
            ["Data import tooling", "Idempotent, re-runnable, with reconciliation checks that exit non-zero on mismatch"],
            ["Test suites", "500+ assertions run against deployed code"],
            ["Operating manual", "Task-ordered guide written for whoever does the work"],
            ["Walkthrough script", "Timed narration for a recorded handover video"],
            ["Credential sheet", "Every access point documented in one place for the client to own"],
            ["Technical change log", "Every decision, defect and fix, with the reasoning"],
          ]}
        />
        <H3>Documentation as a deliverable</H3>
        <P>
          The operating manual is written for the person doing the task rather than the person who commissioned it.
          Volatile numbers are left out: &ldquo;49 drafts waiting&rdquo; is wrong tomorrow, so the manual points at where
          to read each number. It also keeps its caveats, for example that re-research adds new staff but cannot detect
          that someone has left, and that editing message wording does not rewrite drafts that already exist.
        </P>
        <H3>Reporting that holds up</H3>
        <P>
          The status document is generated from live queries, not typed, so no figure in it can drift from the system it
          describes. Client-facing reports were verified by inspecting the generated file&rsquo;s internal XML, after an
          earlier document was silently truncated by a word processor&rsquo;s re-save.
        </P>
      </Section>

      <Section id="stack" title="Stack and skills">
        <Table
          caption="Technologies used"
          head={["Area", "Used"]}
          rows={[
            ["Automation", "n8n: about 60 workflows, custom code nodes, scheduled and sub-workflow triggers, API-based deployment"],
            ["Data", "Airtable: 3 bases, about 38 tables, formulas, rollups, lookups, linked records, interface builder"],
            ["AI", "OpenAI GPT-4o and GPT-4o-mini: multi-stage prompting, structured extraction, self-critique, token and cost accounting"],
            ["Backend", "Node.js (dependency-free web app), Python (import, migration and audit tooling)"],
            ["Infrastructure", "Docker, Traefik, Let's Encrypt, Linux VPS administration, SQLite"],
            ["Email", "SMTP across 20 authenticated mailboxes, IMAP ingestion, SPF/DKIM/DMARC checks, MIME and attachment handling"],
            ["Testing", "Custom JavaScript suites running against extracted production code"],
            ["Documents", "Programmatic DOCX, XLSX and PDF generation; PDF stream-level optimisation with objective quality measurement"],
          ]}
        />
        <H3>What this project demonstrates</H3>
        <Bullets
          items={[
            <>
              Designing AI systems where correctness is <strong>enforced structurally</strong>, not requested in a prompt
            </>,
            "Building for a non-technical operator: guarded actions, honest dashboards, fail-closed defaults",
            "Diagnosing silent failures: the bugs that report success and do nothing",
            "Deliverability and compliance engineering: rate limiting, bounce handling, suppression, opt-out",
            "Working directly with a client over months: scoping, pushback, written answers, handover",
          ]}
        />
        <H3>What this case study does not claim</H3>
        <P>
          The system was delivered built, tested and verified, with all sending switched off pending the client&rsquo;s
          decision to launch. <strong>No campaign performance figures are claimed</strong>: no open rates, reply rates or
          conversions, because at handover none existed. Every figure on this page describes what was built and measured.
          The live sends mentioned were verification tests to controlled addresses, not campaign traffic.
        </P>
      </Section>
    </div>
  );
}
