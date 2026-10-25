# SEO

How search and social discovery work on this site, what is implemented, and what to do after each deploy.

- **Production URL:** https://ahteshamsalamatansari.vercel.app
- **Vercel project:** `resumeport` (auto-deploys `main` of `ahteshamsalamatansari/resume`)
- **Content last updated:** see `LAST_UPDATED` in `src/config/site.ts`

## 1. Positioning and keywords

The home page targets the person-name query and the main service queries, which match the Upwork profile positioning. Each service page targets one buyer query (for example "RAG chatbot development" or "AI automation audit"). Each case study page targets the longer, more specific queries for its own project (for example "n8n Airtable OpenAI outreach automation" or "SQL data validation deduplication").

| Page | URL | Purpose |
| --- | --- | --- |
| Home | `/` | Name, role, services, highlights |
| Services index | `/services` | Hub that links every service, packaged first |
| Service (×6) | `/services/[slug]` | One service: when it fits, deliverables, process, packages or pricing, related case studies, FAQ |
| Case studies index | `/projects` | Hub that links every case study |
| Case study (×6) | `/projects/[slug]` | One project: problem, approach, outcome, tools, results |
| Long-form case study | `/projects/ai-outreach-automation-platform` | Full engineering write-up with a table of contents, diagrams and tables (`src/components/case-studies/outreach-platform.tsx`) |

| Intent | Primary terms | Where they appear |
| --- | --- | --- |
| Name / brand | Ahtesham Salamat Ansari, Ahtesham Ansari | `<title>`, header, footer, JSON-LD `Person` |
| Role | AI Engineer | `<title>`, hero eyebrow, `jobTitle` |
| Services | LLM application development, RAG / Retrieval-Augmented Generation, AI agents, MCP, Python automation, data pipelines | Title, description, Services `h3`s, Skills |
| Proof | n8n, Airtable, OpenAI, Claude, LangChain, Airflow, Playwright, Selenium | Project stacks, Skills |
| Buyer queries | AI automation audit, n8n AI outreach automation, Python web scraping and data cleaning, RAG chatbot development, AI agent / MCP server development, AI integration services | Service page `h1`, title, description, FAQ |

Service selection: the first three services are the Upwork Project Catalog offers, shown with their tiers and delivery times. The other three come from Upwork's In-Demand Skills 2026 report, where AI integration grew 178% and AI chatbot development 71% year over year, and match skills already on the profile. No prices appear anywhere on the site, by request; Upwork shows them.

Rules: every keyword must map to content the page actually shows. Do not add terms to `keywords` or JSON-LD that the page does not support.

## 2. What is implemented

### Metadata (`src/app/layout.tsx`, values in `src/config/site.ts`)

| Item | Value |
| --- | --- |
| `metadataBase` | `SITE_URL` (env `NEXT_PUBLIC_SITE_URL` overrides) |
| Title | `Ahtesham Salamat Ansari \| AI Engineer: LLM Apps, RAG, AI Agents & Python Automation` (template `%s \| Ahtesham Salamat Ansari` for any future pages) |
| Description | 170 characters, states services and that case studies include measured results |
| Canonical | `/` |
| Robots | `index, follow`; Googlebot `max-image-preview:large`, unlimited snippet |
| Open Graph | `type=profile`, url, site name, locale `en_US`, first/last name |
| Twitter | `summary_large_image` |
| Bing verification | `msvalidate.01` meta (same GUID as `BingSiteAuth.xml`) |
| Google verification | File method only (see section 4). Meta tag stays off unless `NEXT_PUBLIC_GOOGLE_VERIFICATION` is set |
| `lang` | `en` on `<html>` |

### Generated files

| URL | Source | Notes |
| --- | --- | --- |
| `/robots.txt` | `src/app/robots.ts` | Allows all crawlers; points to the sitemap |
| `/sitemap.xml` | `src/app/sitemap.ts` | Home, `/projects` and every case study, generated from `projects` in `src/content/profile.ts`; `lastmod` from `LAST_UPDATED` |
| `/manifest.webmanifest` | `src/app/manifest.ts` | Name, colors, icons |
| `/opengraph-image`, `/twitter-image` | `src/app/opengraph-image.tsx` | 1200×630 PNG for the home page |
| `/projects/opengraph-image` | `src/app/projects/opengraph-image.tsx` | Index card |
| `/projects/[slug]/opengraph-image` | `src/app/projects/[slug]/opengraph-image.tsx` | One card per case study with its title, stack and results |

All social cards share `src/lib/og.tsx` and are prerendered at build time. Font loading in that file is wrapped in `"use cache"`; without it the file read counts as uncached I/O and every image route becomes on-demand.
| `/favicon.ico`, `/icon.png`, `/apple-icon.png`, `/icon-512.png` | `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/icon-512.png` | Circular profile-photo favicon (16/32/48 ICO, 192 PNG), 180×180 iOS icon on white, 512 PNG for the web manifest |
| `/llms.txt` | `src/app/llms.txt/route.ts` | Plain-text profile for AI assistants, built from the page content |

### Structured data (`src/lib/schema.ts`)

One JSON-LD `@graph` on the home page:

- `WebSite`: name, description, publisher.
- `ProfilePage`: `mainEntity` is the person; `hasPart` lists capabilities, the orderable service pages, and selected projects with their stated results.
- `FAQPage`: the six questions shown in the home FAQ section.
- `Person`: name, photo (`public/ahtesham-salamat-ansari.jpg`), job title, employer (BizProspex), alma mater, `knowsAbout`, four certifications as `EducationalOccupationalCredential`, and `sameAs` pointing only to the Upwork profile.

On `/services`: a `CollectionPage` whose `mainEntity` is an `OfferCatalog` of the six services, plus a `BreadcrumbList`.

On each `/services/[slug]`: a `Service` (provider linked to the `Person`, Upwork as the `availableChannel`, no `Offer` markup because prices are not shown), a `FAQPage` matching the visible questions, and a `BreadcrumbList`.

On `/projects`: a `CollectionPage` with an `ItemList` of every case study, plus a `BreadcrumbList`.

On each `/projects/[slug]`: an `Article` (headline, description, image, author linked to the home-page `Person` by `@id`, tools as keywords) plus a `BreadcrumbList` (Home › Case studies › title).

Every graph is generated from `src/content/profile.ts` and `src/content/services.ts`, the same data the pages render, so it cannot drift from the visible content.

### Case study metadata (`src/app/projects/[slug]/page.tsx`)

- Title: `<Project title>: Case Study | Ahtesham Salamat Ansari`
- Description: the project's `summary` field (one sentence with the verified result)
- Canonical: `/projects/<slug>`; Open Graph `type=article`
- Pages are statically generated from `generateStaticParams`. An unknown slug calls `notFound()` and returns a real 404.

### Internal linking

- Home project cards link to their case study ("Read the case study"), and the Projects section links to `/projects`.
- Each case study links back through the breadcrumb, to the related services on the home page, and to the other five case studies.
- Header navigation uses `/#section` links so it works from every page.

### On-page

- One `h1` (hero), one `h2` per section, `h3` per card. Every section has `aria-labelledby` pointing to its heading.
- Content is server-rendered and statically prerendered (`○ Static` in the build output). No content depends on JavaScript.
- No images in the page body, so no alt-text debt. Project mockups are HTML and marked `aria-hidden`, with a visible caption.
- Fonts are self-hosted by `next/font` (no third-party requests) with `display: swap`.

### Technical

- Security headers on all routes: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
- `X-Powered-By` header disabled.
- Custom 404 page with `noindex`.

## 3. Redirects from the previous site

The previous site at this domain had multiple pages that may be indexed. They now redirect permanently (HTTP 308, treated as 301 by Google) to the closest section. Defined in `next.config.ts`.

| Old URL | New destination |
| --- | --- |
| `/about` | `/#overview` |
| `/work/data-quality-engine` | `/projects/b2b-data-validation-deduplication` |
| `/writing/data-quality-playbook-78-to-94` | `/projects/b2b-data-validation-deduplication` |
| `/work`, `/work/*` | `/projects` |
| `/case-studies`, `/case-studies/*` | `/projects` |
| `/writing`, `/writing/*` | `/` |
| `/resume` | `/` |
| `/contact` | `/` |
| `/Ahtesham-Ansari-AI-Engineer-Resume.pdf` | `/` |
| `/projects/ai-outreach-drafting-system` | `/projects/ai-outreach-automation-platform` (slug renamed 2026-10-25) |

The two old data-quality pages describe the same work as the new data validation case study, so they redirect straight to it. Other old project and case-study pages described work that is not on the current profile, so they go to the index rather than to an unrelated page. The remaining old blog posts (`/writing/*`) and the resume PDF have no equivalent on the new site. Google will likely treat those redirects as soft 404s and drop them from the index over the next few weeks. That is expected. Rankings those posts had will not transfer.

## 4. Search engine verification

Both files were copied from the previous site so existing ownership stays valid. **Do not delete them.**

| Engine | File | Status |
| --- | --- | --- |
| Google Search Console | `public/google57d36c46b130cd35.html` | Served at `/google57d36c46b130cd35.html` |
| Bing Webmaster Tools | `public/BingSiteAuth.xml` | Served at `/BingSiteAuth.xml`, plus `msvalidate.01` meta |

## 5. After each production deploy

1. **Google Search Console** (property `https://ahteshamsalamatansari.vercel.app`):
   - Sitemaps: submit `sitemap.xml` only. Remove the old sitemap if it is listed separately, since it pointed to the pages that now redirect. Never submit a page URL (such as `/projects`) as a sitemap; Search Console reports it as "Sitemap is HTML".
   - URL Inspection on `/`, `/projects` and each new or changed `/projects/<slug>`: *Request indexing*.
   - Watch *Pages → Not indexed → Page with redirect* over the next 2–4 weeks; the old URLs should move there.
2. **Bing Webmaster Tools:** submit the sitemap and use *URL Submission* for `/`.
3. **Validate:**
   - [Rich Results Test](https://search.google.com/test/rich-results) on the home URL: expect `ProfilePage` and `Person` detected with no errors.
   - [Schema Markup Validator](https://validator.schema.org/) for the full graph.
   - Social preview: LinkedIn Post Inspector or opengraph.xyz with the home URL to refresh cached previews.
4. **Spot-check from the command line:**

   ```bash
   curl -s https://ahteshamsalamatansari.vercel.app/robots.txt
   curl -s https://ahteshamsalamatansari.vercel.app/sitemap.xml
   curl -sI https://ahteshamsalamatansari.vercel.app/about | grep -i location
   curl -s -o /dev/null -w "%{http_code}\n" https://ahteshamsalamatansari.vercel.app/google57d36c46b130cd35.html
   ```

## 6. Maintenance

- **Content changes:** edit `src/content/profile.ts`, then update `LAST_UPDATED` in `src/config/site.ts` so the sitemap `lastmod` and article dates change.
- **New case study:** add an entry to `projects` with a unique `slug`, a one-sentence `summary` (it becomes the meta description), `outcome`, `services` (titles from `services`) and verified `results`. The page, social card, sitemap entry, index row, JSON-LD and `llms.txt` line are all generated from it. Then request indexing for the new URL in Search Console.
- **New service:** add an entry to `servicePages` in `src/content/services.ts`. Add `packages` only when the service is a published Upwork catalog offer. Do not add prices. `proof` links it to case studies, and the case studies link back automatically.
- **Never rename a slug** without adding a redirect from the old URL in `next.config.ts`.
- **Custom domain:** add it in Vercel, then set `NEXT_PUBLIC_SITE_URL` for Production (or change the default in `src/config/site.ts`). Canonical, sitemap, robots, Open Graph and JSON-LD all follow. Add the new domain as a property in Search Console and Bing, and keep the `vercel.app` domain redirecting to it.
- **Social image:** edit `src/app/opengraph-image.tsx`. The bundled fonts are a Latin subset with layout tables removed (the OG renderer cannot parse them). Characters outside basic Latin plus `→ · – ’` will not render; regenerate the subset if you need more.

## 7. Deliberate exclusions

These are left out on purpose, not by oversight:

- **No social or contact links**, and `sameAs` lists only the Upwork profile. The site directs all hiring to Upwork.
- **FAQ schema without rich results.** Since 2023 Google shows FAQ rich results only for authoritative government and health sites, so the FAQ markup will not create expandable results in Google. It is kept because the questions are visible on the page, Bing and AI answer engines read it, and it costs nothing.
- **No `keywords`-only terms.** The `keywords` meta tag is ignored by Google and kept only as documentation of targeting.
- **No unverified metrics** in titles, descriptions or structured data. Only figures stated in the Upwork profile, the Upwork catalog or Ahtesham's own case-study write-ups appear.
- **No `aggregateRating` or reviews** on services. There are no published reviews to mark up, and self-serving review markup is against Google's guidelines.

## 8. Known limits

- The case studies are deliberately short: they only state what the Upwork profile supports. Longer pages would rank better for long-tail queries, but only if the extra detail is real. The best next step is adding verified specifics per project (scale, timeline, constraints, what was tried first), not more keywords.
- A `*.vercel.app` subdomain carries less authority than a custom domain. A custom domain is the second-biggest gain.
