# SEO

How search and social discovery work on this site, what is implemented, and what to do after each deploy.

- **Production URL:** https://ahteshamsalamatansari.vercel.app
- **Vercel project:** `resumeport` (auto-deploys `main` of `ahteshamsalamatansari/resume`)
- **Content last updated:** see `LAST_UPDATED` in `src/config/site.ts`

## 1. Positioning and keywords

The site is a single page. It targets one person-name query and a small set of service queries, which match the Upwork profile positioning.

| Intent | Primary terms | Where they appear |
| --- | --- | --- |
| Name / brand | Ahtesham Salamat Ansari, Ahtesham Ansari | `<title>`, header, footer, JSON-LD `Person` |
| Role | AI Engineer | `<title>`, hero eyebrow, `jobTitle` |
| Services | LLM application development, RAG / Retrieval-Augmented Generation, AI agents, MCP, Python automation, data pipelines | Title, description, Services `h3`s, Skills |
| Proof | n8n, Airtable, OpenAI, Claude, LangChain, Airflow, Playwright, Selenium | Project stacks, Skills |

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
| `/sitemap.xml` | `src/app/sitemap.ts` | One URL (`/`), `lastmod` from `LAST_UPDATED` |
| `/manifest.webmanifest` | `src/app/manifest.ts` | Name, colors, icons |
| `/opengraph-image`, `/twitter-image` | `src/app/opengraph-image.tsx` | 1200×630 PNG, Google Sans from `src/app/_fonts` |
| `/icon.svg`, `/apple-icon` | `src/app/icon.svg`, `src/app/apple-icon.tsx` | Favicon and 180×180 iOS icon |
| `/llms.txt` | `src/app/llms.txt/route.ts` | Plain-text profile for AI assistants, built from the page content |

### Structured data (`src/lib/schema.ts`)

One JSON-LD `@graph` on the home page:

- `WebSite`: name, description, publisher.
- `ProfilePage`: `mainEntity` is the person; `hasPart` lists services and selected projects with their stated results.
- `Person`: name, job title, employer (BizProspex), alma mater, `knowsAbout`, four certifications as `EducationalOccupationalCredential`, and `sameAs` pointing only to the Upwork profile.

The graph is generated from `src/content/profile.ts`, the same data the page renders, so it cannot drift from the visible content.

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
| `/work`, `/work/*` | `/#projects` |
| `/case-studies`, `/case-studies/*` | `/#projects` |
| `/writing`, `/writing/*` | `/` |
| `/resume` | `/` |
| `/contact` | `/` |
| `/Ahtesham-Ansari-AI-Engineer-Resume.pdf` | `/` |

The old blog posts (`/writing/*`) and the resume PDF have no equivalent on the new site. Google will likely treat those redirects as soft 404s and drop them from the index over the next few weeks. That is expected. Rankings those posts had will not transfer.

## 4. Search engine verification

Both files were copied from the previous site so existing ownership stays valid. **Do not delete them.**

| Engine | File | Status |
| --- | --- | --- |
| Google Search Console | `public/google57d36c46b130cd35.html` | Served at `/google57d36c46b130cd35.html` |
| Bing Webmaster Tools | `public/BingSiteAuth.xml` | Served at `/BingSiteAuth.xml`, plus `msvalidate.01` meta |

## 5. After each production deploy

1. **Google Search Console** (property `https://ahteshamsalamatansari.vercel.app`):
   - Sitemaps: submit `sitemap.xml`. Remove the old sitemap if it is listed separately, since it pointed to the pages that now redirect.
   - URL Inspection on `/`: *Request indexing*.
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

- **Content changes:** edit `src/content/profile.ts`, then update `LAST_UPDATED` in `src/config/site.ts` so the sitemap `lastmod` changes.
- **Custom domain:** add it in Vercel, then set `NEXT_PUBLIC_SITE_URL` for Production (or change the default in `src/config/site.ts`). Canonical, sitemap, robots, Open Graph and JSON-LD all follow. Add the new domain as a property in Search Console and Bing, and keep the `vercel.app` domain redirecting to it.
- **Social image:** edit `src/app/opengraph-image.tsx`. The bundled fonts are a Latin subset with layout tables removed (the OG renderer cannot parse them). Characters outside basic Latin plus `→ · – ’` will not render; regenerate the subset if you need more.

## 7. Deliberate exclusions

These are left out on purpose, not by oversight:

- **No social or contact links**, and `sameAs` lists only the Upwork profile. The site directs all hiring to Upwork.
- **No FAQ schema.** Google shows FAQ rich results only for authoritative government and health sites, so it would add markup with no benefit.
- **No `keywords`-only terms.** The `keywords` meta tag is ignored by Google and kept only as documentation of targeting.
- **No unverified metrics** in titles, descriptions or structured data. Only figures stated in the Upwork profile appear.

## 8. Known limits

- A single page can rank for the name and a few broad service terms, but it has little depth for long-tail queries. The removed blog posts were the main source of long-tail traffic. Adding individual case-study pages later (e.g. `/projects/outreach-system`) would be the biggest SEO gain, each with its own title, description and `CreativeWork` schema.
- A `*.vercel.app` subdomain carries less authority than a custom domain. A custom domain is the second-biggest gain.
