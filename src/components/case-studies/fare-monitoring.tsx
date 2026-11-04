import { ArrowDown, ArrowRight, ShieldAlert } from "lucide-react";
import { Bullets, Callout, Code, H3, P, Problem, Section, Table } from "./outreach-platform";

/**
 * Long-form body of the Airfare Price Monitoring Web Scraper case study.
 * Facts come from the project code and the delivered output files (counted
 * 2026-11-04). Carrier names, booking-site names, routes, endpoints and
 * credentials stay out: sites are referred to by type only.
 */

export const fareMonitoringToc = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "brief", label: "The brief" },
  { id: "architecture", label: "System architecture" },
  { id: "collectors", label: "One collector per site" },
  { id: "in-page-api", label: "API calls instead of page loads" },
  { id: "challenges", label: "Cloudflare and CAPTCHA handling" },
  { id: "reliability", label: "Checkpoints, resume and retries" },
  { id: "recovery", label: "Scheduled and recovery runs" },
  { id: "output", label: "The dataset the client receives" },
  { id: "problems", label: "Four problems worth describing" },
  { id: "stack", label: "Stack and skills" },
  { id: "faq", label: "Quick answers" },
];

const stages = [
  { name: "Plan the run", sub: "Routes × 84 dates, from today in the client's timezone" },
  { name: "Open a session", sub: "Warmed browser or web-unlocker API" },
  { name: "Detect challenges", sub: "Turnstile, JS challenge, reCAPTCHA, hCaptcha", gate: true },
  { name: "Collect", sub: "JSON endpoint, booking flow or fare matrix" },
  { name: "Parse", sub: "Layered selectors, then a text fallback" },
  { name: "Normalise", sub: "One 10-column schema for every site" },
  { name: "Checkpoint", sub: "Saved after every row" },
  { name: "Export", sub: "CSV and Excel per route" },
];

function ArchitectureDiagram() {
  return (
    <figure>
      <div className="rounded-2xl border border-line bg-white p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/70">Per route · 34 route feeds</p>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li
              key={s.name}
              className={`rounded-lg border p-3 ${s.gate ? "border-brand bg-brand-tint" : "border-line bg-white"}`}
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="tabular-nums text-muted">{i + 1}</span>
                {s.name}
                {s.gate && <ShieldAlert aria-hidden className="ml-auto size-4 text-brand-ink" />}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{s.sub}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-lg border border-dashed border-ink/25 bg-surface p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink/70">Shared by all 5 collectors</p>
          <ul className="mt-2 flex flex-wrap gap-1.5 text-[13px]">
            {["Scheduled cloud runs", "Local recovery runners", "Resume from checkpoint", "Same output format"].map((t) => (
              <li key={t} className="rounded-md border border-line bg-white px-2.5 py-1 font-medium text-ink/80">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Simplified diagram: 8 stages per route, 1 challenge gate, 1 shared operations layer.
      </figcaption>
    </figure>
  );
}

const fetchSteps = [
  { name: "Warm up once", sub: "Open the route's search page in a real browser" },
  { name: "Confirm the session", sub: "Wait for the page's own search call to return 200" },
  { name: "Call from the page", sub: "fetch() per date inside the same tab" },
];

function InPageFetchDiagram() {
  return (
    <figure>
      <ol className="grid gap-2 rounded-2xl border border-line bg-white p-4 sm:grid-cols-3 sm:p-6">
        {fetchSteps.map((s, i) => (
          <li key={s.name} className="relative rounded-lg border border-line bg-white p-3">
            <p className="text-sm font-semibold text-ink">{s.name}</p>
            <p className="mt-1 text-[13px] leading-snug text-muted">{s.sub}</p>
            {i < fetchSteps.length - 1 && (
              <>
                <ArrowDown aria-hidden className="mx-auto mt-2 size-4 text-muted sm:hidden" />
                <ArrowRight
                  aria-hidden
                  className="absolute -right-3 top-1/2 z-10 hidden size-4 -translate-y-1/2 rounded-full bg-white text-muted sm:block"
                />
              </>
            )}
          </li>
        ))}
        <li className="rounded-lg border border-brand bg-brand-tint p-3 sm:col-span-3">
          <p className="text-sm font-semibold text-ink">JSON back in under a second per date</p>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            The request carries the browser&apos;s own TLS fingerprint, cookies and origin, so the site treats it like
            the page&apos;s own search.
          </p>
        </li>
      </ol>
      <figcaption className="mt-3 text-sm text-muted">
        One warm-up per route, then one lightweight call per date instead of one full page load per date.
      </figcaption>
    </figure>
  );
}

export function FareMonitoringBody() {
  return (
    <div className="space-y-16">
      <Section
        id="at-a-glance"
        title="At a glance"
        lead="A Python web scraping system that collects published airfares from four carrier booking sites and one online travel agency, on 34 regional route feeds, for every departure date 84 days ahead. Each site gets the lightest collection method it allows, every challenge is detected and routed, and every run delivers the same CSV and Excel format."
      >
        <Table
          caption="Project facts"
          head={["", "Detail"]}
          rows={[
            ["Type", "Client project, recurring engagement since June 2026"],
            ["Sources", "5 booking sites: 4 carriers and 1 online travel agency"],
            ["Coverage", "34 route feeds between 11 regional airports, 84 departure dates each: 2,856 route-date searches per full run"],
            ["Collected", "144,426 unique fare records across 88 collection dates, June to November 2026"],
            ["Output", "CSV and Excel per route, one 10-column schema"],
            ["Stack", "Python, Playwright, asyncio, Bright Data, CapSolver, Pandas, BeautifulSoup, openpyxl"],
          ]}
        />
      </Section>

      <Section
        id="brief"
        title="The brief"
        lead="The client needed one comparable view of published fares from every carrier and a travel agency serving the same regional routes, for every departure date up to 12 weeks out."
      >
        <P>
          Fares on these routes change daily, and a fare that was not captured on the day it was published cannot be
          collected later. The data had to arrive on every run, in one format, whichever site it came from, so the
          client could compare carriers on the same route and date without cleaning anything by hand.
        </P>
        <P>Three things made this harder than a typical scraping job:</P>
        <Bullets
          items={[
            "Five different booking engines: some return JSON to the page, some only render results after a full search form is completed.",
            "Bot protection on most sites: Cloudflare challenges, Turnstile, reCAPTCHA interstitials and session limits.",
            "Long runs: thousands of searches per run, so any failure halfway through had to be recoverable without starting again.",
          ]}
        />
      </Section>

      <Section
        id="architecture"
        title="System architecture"
        lead="Every collector follows the same eight stages and writes the same output. Only the collect step differs between sites."
      >
        <ArchitectureDiagram />
        <P>
          The planning step computes &ldquo;today&rdquo; in the client&apos;s Australian timezone, not the server&apos;s,
          so the 84-day window always starts on the right departure date wherever the run executes.
        </P>
      </Section>

      <Section
        id="collectors"
        title="One collector per site"
        lead="I picked the lightest method each site allowed. A JSON endpoint beats rendering a page, and an unlocker API beats running a browser, but some sites only show fares after a full search."
      >
        <Table
          caption="Collection method by site type"
          head={["Site", "Method", "Why"]}
          rows={[
            [
              "Carrier site 1",
              "Internal JSON search endpoint, found by recording the browser's network traffic (HAR), called with fetch() inside a warmed Playwright session",
              "Sub-second per date, no page rendering",
            ],
            [
              "Carrier site 2",
              "Bright Data Web Unlocker API with async queue workers; HTML parsed with BeautifulSoup",
              "Heavy Cloudflare protection; no browser needed when the unlocker clears it",
            ],
            [
              "Carrier site 3",
              "Playwright connected over the Chrome DevTools Protocol to real Chrome, driving the booking flow; one Chrome per route in parallel, each on its own port and profile",
              "Fares only appear after the search form is completed",
            ],
            [
              "Carrier site 4",
              "Playwright Firefox through the booking flow, including connecting itineraries priced as one combined fare",
              "reCAPTCHA interstitials and routes with a stopover",
            ],
            [
              "Travel agency",
              "Fare matrix page for each date in a visible browser, extracted table by table",
              "One page per date lists the fares to compare",
            ],
          ]}
        />
      </Section>

      <Section
        id="in-page-api"
        title="API calls instead of page loads"
        lead="On the site that allowed it, the scraper stopped loading pages altogether: one warm-up per route, then one sub-second JSON call per date."
      >
        <P>
          Recording the network traffic of a normal search showed that the booking page fills its results from a single
          POST endpoint, and that the endpoint expects full city names rather than airport codes. Calling that endpoint
          directly replaced a full page render, with all its scripts and timeouts, for every one of the 84 dates.
        </P>
        <InPageFetchDiagram />
        <P>
          The session is checked by listening for the page&apos;s own search request: if it returns 200, the session is
          live and the date loop starts. If it does not, the scraper reconnects through a new exit IP and tries again,
          up to three times, before marking that route&apos;s dates as missed.
        </P>
      </Section>

      <Section
        id="challenges"
        title="Cloudflare and CAPTCHA handling"
        lead="The scraper first works out which challenge it is looking at, then sends it to whatever can clear it: an unlocker service, a CAPTCHA-solving service, or a person."
      >
        <Bullets
          ordered
          items={[
            <>
              <strong>Detect.</strong> The returned page is classified as Cloudflare Turnstile, a JavaScript challenge,
              reCAPTCHA v2, reCAPTCHA v3, hCaptcha, or a normal result page.
            </>,
            <>
              <strong>Clear automatically where possible.</strong> Bright Data&apos;s Web Unlocker or Scraping Browser handles
              most Cloudflare challenges. CapSolver handles token-based CAPTCHAs, bound to the same exit IP as the requests
              that follow.
            </>,
            <>
              <strong>Hand over to a person when needed.</strong> Recovery runs open visible browser windows. When a
              challenge appears the run pauses, a person solves it in the window, and the script detects the cleared
              page and carries on by itself.
            </>,
          ]}
        />
        <Callout>
          Fares are public information shown to any visitor. The scrapers search one route and date at a time, with
          randomised delays, and never log in, book or hold seats.
        </Callout>
      </Section>

      <Section
        id="reliability"
        title="Checkpoints, resume and retries"
        lead="A run is thousands of searches long, so every layer assumes something will fail and makes sure nothing already collected is lost."
      >
        <Table
          caption="Reliability mechanisms"
          head={["Mechanism", "What it does"]}
          rows={[
            ["Row-level checkpoints", "Progress is written after every fare row; raw results and errors go to append-only JSONL logs"],
            ["Resume", "A rerun skips dates already saved as a fare or as a confirmed no-fare day"],
            ["Retries with backoff", "Failed requests retry with exponential backoff (2, 4, then 8 seconds); a route is abandoned after repeated consecutive failures and its missed dates are listed"],
            ["Route retry pass", "Routes that failed in the first pass run again after a 60-second cooldown"],
            ["Session refresh", "Browser sessions reconnect at 55 minutes, before the provider's 60-minute cut-off"],
            ["Provider health check", "Before any scraping, the proxy provider is tested three times; if it is down the run stops with a clear warning and a non-zero exit code"],
            ["Debug artifacts", "A screenshot and the page HTML are saved whenever extraction fails, so a layout change can be fixed from evidence"],
            ["Atomic writes", "Excel files are written to a temporary file and swapped in, so an interrupted run never leaves a corrupt file"],
          ]}
        />
      </Section>

      <Section
        id="recovery"
        title="Scheduled and recovery runs"
        lead="Scheduled cloud runs do the routine collection. When a route fails there, a local recovery runner fills the gap and produces identical output."
      >
        <P>
          The recovery runners import the parsing and URL-building code from the scheduled scripts rather than copying it,
          so a recovered file cannot drift from the format the client already receives. They open one visible browser per
          route, tiled across the screen with separate profiles, let the operator choose routes and dates from a menu, and
          resume from the last checkpoint.
        </P>
        <P>
          Each project folder also carries setup and run instructions, so the runners work on another Windows machine
          without editing paths.
        </P>
      </Section>

      <Section
        id="output"
        title="The dataset the client receives"
        lead="Every collector writes the same ten columns, so fares from different carriers and the travel agency line up row for row."
      >
        <Table
          caption="Output columns"
          head={["Column", "Example"]}
          rows={[
            ["Date Checked", "The day the fare was collected"],
            ["Time Checked", "Collection time, in the client's timezone"],
            ["Airline", "The carrier that operates the flight"],
            ["Date of Departure", "Any day in the 84-day window"],
            ["Time of Departure", "Scheduled departure time"],
            ["Origin", "Airport code"],
            ["Destination", "Airport code"],
            ["Fare Price", "Published fare for that flight"],
            ["Fare Class", "Cabin or fare brand"],
            ["Source", "The site the fare came from"],
          ]}
        />
      </Section>

      <Section id="problems" title="Four problems worth describing">
        <Problem
          n={1}
          title="Direct API calls were blocked even with valid cookies"
          rows={[
            {
              label: "Symptom",
              body: "Calling the fare endpoint from Python's HTTP client returned Cloudflare's \"Just a moment\" page with HTTP 403, even with cookies copied from a working browser.",
            },
            {
              label: "Cause",
              body: "Cloudflare checks the TLS fingerprint of the client. A raw HTTP client does not look like a browser, whatever cookies it sends.",
            },
            {
              label: "Fix",
              body: (
                <>
                  Run the request with <Code>fetch()</Code> inside the warmed browser tab. It inherits the real
                  browser&apos;s TLS, the clearance cookie and the same origin, and passes like the page&apos;s own search.
                </>
              ),
            },
          ]}
        />
        <Problem
          n={2}
          title="Long runs died at the 60-minute mark"
          rows={[
            { label: "Symptom", body: "Runs that started cleanly failed partway through later routes." },
            { label: "Cause", body: "The scraping-browser provider ends every session after 60 minutes." },
            {
              label: "Fix",
              body: "Track session age and reconnect at 55 minutes, re-warming the route before the next call, so no request is in flight when the session ends.",
            },
          ]}
        />
        <Problem
          n={3}
          title="A provider outage would have looked like a quiet day"
          rows={[
            {
              label: "Risk",
              body: "If the unlocker service fails, a naive scraper writes empty files, and an empty file looks the same as a day with no fares.",
            },
            {
              label: "Fix",
              body: "Test the provider before scraping and count worker-level failures during the run. Past a threshold the run stops, prints a plain warning and exits non-zero so the scheduler alerts. A confirmed no-fare day is recorded separately from a failed one.",
            },
          ]}
        />
        <Problem
          n={4}
          title="Result layouts differed between routes"
          rows={[
            {
              label: "Symptom",
              body: "Selectors that worked on direct routes found nothing on routes with a stopover, where one itinerary has two flights.",
            },
            {
              label: "Fix",
              body: "Layered extraction: known card selectors first, then a scan of the page text for flight numbers and times. Connecting itineraries are priced as one combined fare, and every flight is de-duplicated by flight number and departure time.",
            },
          ]}
        />
      </Section>

      <Section id="stack" title="Stack and skills">
        <Table
          caption="Technologies used"
          head={["Area", "Used"]}
          rows={[
            ["Language", "Python 3, asyncio, dataclasses, zoneinfo"],
            ["Browser automation", "Playwright (Chromium, Chrome over CDP, Firefox), headed and headless"],
            ["Anti-bot", "Bright Data Web Unlocker and Scraping Browser, residential proxies, CapSolver"],
            ["Parsing", "BeautifulSoup, in-page JavaScript, regular expressions"],
            ["Data", "Pandas, openpyxl, CSV, JSONL checkpoints"],
            ["Operations", "Scheduled cloud runs, Windows recovery runners, PowerShell launch scripts"],
          ]}
        />
        <H3>What this project demonstrates</H3>
        <Bullets
          items={[
            "Reverse engineering a site's own API from network traffic instead of scraping rendered HTML",
            "Getting reliable data from sites behind Cloudflare and CAPTCHA, with a person in the loop where needed",
            "Long-running scrapers that resume, retry and fail loudly rather than silently",
            "Normalising five different sources into one dataset the client can use as delivered",
          ]}
        />
      </Section>
    </div>
  );
}
