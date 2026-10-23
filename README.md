# Ahtesham Salamat Ansari: AI Engineer portfolio

Portfolio for **AI Engineer | LLM Applications, RAG, AI Agents & Python Automation**: a home page plus a case-study page for each project.

Live: https://ahteshamsalamatansari.vercel.app

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Lucide icons, Google Fonts via `next/font`. No backend, database or API keys.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/config/site.ts` | Upwork profile URL (the only hiring link), site URL, verification IDs, title/description |
| `src/content/profile.ts` | All page content: services, projects, skills, process, experience, certifications |
| `src/components/` | Sections, header, mockups, shared UI |
| `src/app/` | Layout/metadata, home page, robots, sitemap, manifest, OG image, `llms.txt` |
| `src/app/projects/` | Case-study index and `[slug]` detail pages, generated from `projects` |
| `src/lib/` | JSON-LD builders (`schema.ts`) and the shared social card renderer (`og.tsx`) |
| `docs/SEO.md` | SEO implementation, redirects, verification and post-deploy checklist |

## Content rules

- Facts come from the Upwork profile only. Do not add metrics, clients or badges that are not stated there.
- No contact details, contact forms, social links or off-platform hiring links. The Upwork profile is the only CTA.
- Project visuals are illustrative mockups and must stay labelled as such.

## Deploy

The Vercel project `resumeport` deploys `main` automatically. Push a branch to get a preview URL first.
