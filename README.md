# AI Engineer Portfolio — Ahtesham Salamat Ansari

A production portfolio for an AI Engineer: a cinematic single-page homepage backed by a
full set of crawlable, schema-marked content routes. Built with Next.js 14 (App Router),
React Three Fiber, Tailwind CSS, Framer Motion and Lenis.

---

## ⚙️ Configuration

Everything domain- and identity-related lives in [`src/lib/site.ts`](src/lib/site.ts) —
no other file hardcodes a URL.

- **`SITE_URL`** — `https://ahteshamsalamatansari.vercel.app`. Canonicals, sitemap, Open
  Graph URLs, JSON-LD `@id`s and `llms.txt` all derive from it. Override without editing
  the file by setting `NEXT_PUBLIC_SITE_URL`; change this one line if you move to a
  custom domain.
- **`SOCIALS`** — the `sameAs` identity graph (LinkedIn, GitHub, X, Instagram, Medium).
  This is what lets Google and LLM answer engines confirm the site and those profiles are
  one person. Empty entries are filtered out everywhere, so adding Google Scholar later is
  a one-line change.

### Search-engine verification

Both engines are verified by the **file method**, and those files must stay in `public/`
to be served from the domain root:

- `public/google57d36c46b130cd35.html` → Google Search Console
- `public/BingSiteAuth.xml` → Bing Webmaster Tools

`VERIFICATION.bing` in `site.ts` additionally emits an `msvalidate.01` meta tag reusing
the same GUID, as a redundant signal. `VERIFICATION.google` is deliberately left blank —
Google's meta-tag token differs from the token in its filename, so it cannot be derived
from the file. Fill it in only if you also generate an HTML-tag verification.

> Because `.vercel.app` is on the Public Suffix List, use a **URL-prefix** property in
> Search Console, not a Domain property. Submit the production URL — Vercel serves
> `x-robots-tag: noindex` on preview deployments.

---

## 🗺️ Routes

| Route | What it is |
| --- | --- |
| `/` | Cinematic single-page experience (hero, skills, work, deep dives, experience, writing, FAQ, globe finale) |
| `/about` | Full profile, experience, skills and FAQ — the entity page |
| `/work` · `/work/[slug]` | Project index + one full page per project (5) |
| `/case-studies` · `/case-studies/[slug]` | Index + full problem → approach → result narrative (2) |
| `/writing` · `/writing/[slug]` | Article index + full articles (3) |
| `/resume` | HTML résumé (indexable) with the PDF download alongside |
| `/contact` | Contact form, copy-to-clipboard email, FAQ |

Generated endpoints: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/manifest.webmanifest`,
`/icon`, `/apple-icon`, `/opengraph-image`, `/twitter-image`.

All content is driven by [`src/lib/data.ts`](src/lib/data.ts) — adding an entry there
creates its page, its sitemap row and its JSON-LD automatically.

---

## 🔍 SEO / AEO

- **Structured data** (`src/lib/schema.ts`): `Person`, `WebSite`, `ProfilePage`,
  `FAQPage`, `BreadcrumbList`, `ItemList`, `Article`, `BlogPosting`, `CreativeWork`,
  `DigitalDocument` — all cross-referenced by `@id` into one entity graph.
- **`llms.txt`** — a curated plain-Markdown summary for LLM crawlers, generated from the
  same data as the site so it cannot drift.
- **`robots.txt`** explicitly allows the AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, and others) as a deliberate opt-in.
- **Long-form prose is server-rendered plain markup** — never opacity-gated — so crawlers
  that do not execute JavaScript still read the full text.
- Per-route canonicals, Open Graph and Twitter cards, with a build-time generated
  1200×630 share image.

---

## 🎨 Design System

- `Dark` `#0A0A0A` · `Primary` `#1F6F5F` · `Secondary` `#2FA084` · `Accent` `#6FCF97` · `Paper` `#EEEEEE`
- Type: Plus Jakarta Sans + JetBrains Mono, self-hosted via `next/font`
- Body text is held at `/55` opacity or above for WCAG AA contrast; the marquee is the one
  deliberate exception (large display type, which has a lower threshold).

---

## 🌍 The globe

`src/components/three/GlobeScene.tsx` builds the finale globe as a particle cloud that
assembles on scroll. Land and colour both come from a real NASA Blue Marble map at
`public/textures/earth-map.png` (RGB = true surface colour, alpha = land mask, 512×256,
~180 KB), sampled per dot at runtime.

Grading constants at the top of the file:

| Constant | Effect |
| --- | --- |
| `REALISM` | `1` = raw satellite colour, `0` = the original all-emerald globe |
| `GAIN` / `LIFT` | Brightness — Blue Marble is dark against `#0A0A0A` |
| `SATURATION` | Pushes each dot away from its own luma; without it, brightening greys everything out |

Regenerate the texture with `scripts/` inputs from NASA Visible Earth (public domain) if
you ever want a different resolution.

---

## 🚀 Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

Requires Node 18+.

---

## 📂 Project Structure

```text
├── public/
│   ├── textures/earth-map.png            # NASA Blue Marble colour + land mask
│   └── Ahtesham-Ansari-AI-Engineer-Resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # metadata, fonts, JSON-LD, skip link, analytics
│   │   ├── page.tsx                      # single-page homepage
│   │   ├── about|work|case-studies|writing|resume|contact/
│   │   ├── robots.ts / sitemap.ts / manifest.ts / llms.txt/
│   │   ├── icon.tsx / apple-icon.tsx / opengraph-image.tsx / twitter-image.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── sections/                     # homepage sections
│   │   ├── three/                        # WebGL scenes and shaders
│   │   ├── PageShell.tsx                 # sub-page layout + breadcrumbs
│   │   ├── Prose.tsx                     # long-form renderer
│   │   ├── ContactForm.tsx / SocialLinks.tsx / Footer.tsx / JsonLd.tsx
│   │   └── Nav / Cursor / Magnetic / Preloader / SmoothScroll / TextReveal
│   └── lib/
│       ├── data.ts                       # all content
│       ├── site.ts                       # domain + identity (edit this)
│       └── schema.ts                     # JSON-LD builders
└── next.config.js                        # security headers, caching
```

---

## ✍️ Updating Content

Everything is in [`src/lib/data.ts`](src/lib/data.ts): `PROJECTS`, `CASE_STUDIES`,
`BLOG_POSTS`, `EXPERIENCE`, `SKILL_GROUPS`, `METRICS`, `FAQS`, `CONTACT`, `NAV_ITEMS`.
Each project, case study and post carries a `slug` and a `body` of `{ heading, paragraphs,
bullets }` blocks — add a record and its page, sitemap entry and schema appear on the next
build.

> The three articles under `BLOG_POSTS` are drafts written from the metrics and systems
> described elsewhere in this repo. Review them for accuracy against your own experience
> before publishing.

---

## 📩 Contact

- **Ahtesham Salamat Ansari** — AI Engineer
- ahteshamsalamat@gmail.com · +91 74159 95966 · India (GMT+5:30)
