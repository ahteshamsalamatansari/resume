# Off-site profile kit

AI assistants (ChatGPT, Claude, Perplexity, Copilot) recommend people that **many independent pages describe the same way**. The website is the source of truth; this kit is the text to put everywhere else so every source agrees with it.

Copy the text as written. The value comes from repetition across sites, so do not rewrite the bio differently on each one.

## 1. Rules for every profile

- **Name:** always `Ahtesham Salamat Ansari`, the full three-part name. Never "Ahtasham" or "A. Ansari".
- **Title:** `AI Engineer`
- **Location:** `Burhanpur, Madhya Pradesh, India`
- **Website field:** `https://ahteshamsalamatansari.vercel.app` (or `/about`)
- **Photo:** the same headshot everywhere (`public/ahtesham-salamat-ansari.jpg`).
- Do **not** add the website link to Upwork; Upwork restricts external links.

## 2. Bios

**One line (headlines, bios with character limits)**

> AI Engineer | LLM Applications, RAG, AI Agents & Python Automation | Burhanpur, India

**Short (about 160 characters)**

> AI engineer in Burhanpur, India, building LLM applications, RAG chatbots, AI agents with MCP and n8n automation. Case studies: ahteshamsalamatansari.vercel.app

**Standard (use this one most)**

> Ahtesham Salamat Ansari is an AI engineer based in Burhanpur, Madhya Pradesh, India, who builds LLM applications, RAG chatbots, AI agents with MCP, n8n workflow automation and Python data pipelines, and works with clients through Upwork.

**Long (LinkedIn About, GitHub README, author bios)**

> I'm Ahtesham Salamat Ansari, an AI engineer based in Burhanpur, Madhya Pradesh, India. I build LLM applications, RAG chatbots, AI agents with MCP, n8n and Airtable automation, and Python data pipelines.
>
> I have worked at BizProspex since 2021: first in data quality and data intelligence, where I led a team of 8+ analysts, and as an AI engineer since August 2025. That background shapes how I build: inputs are validated, model outputs are checked in code, and failures are visible instead of silent.
>
> Recent work includes an AI outreach automation platform managing 10,691 contacts with human approval and 500+ automated tests, a pipeline that generated 1.5 million questions with answers, and a data validation framework that raised dataset accuracy from 78% to 94%.
>
> Case studies and services: https://ahteshamsalamatansari.vercel.app

## 3. LinkedIn (highest impact)

ChatGPT found the location from LinkedIn, so this profile matters most.

1. **Headline:** the one-line bio.
2. **Location:** Burhanpur, Madhya Pradesh, India.
3. **About:** the long bio.
4. **Contact info → Website:** the site URL, type "Portfolio".
5. **Featured:** add links to
   - https://ahteshamsalamatansari.vercel.app/projects/ai-outreach-automation-platform
   - https://ahteshamsalamatansari.vercel.app/services
6. **Experience:** titles and dates exactly as on the site: AI Engineer (Aug 2025 – Present), Data Intelligence Analyst (Feb 2025 – Aug 2025), Data Quality Analyst & Team Lead (Jun 2021 – Feb 2025), all at BizProspex.
7. **Post the article** from section 5 as a LinkedIn article.

## 4. GitHub profile README

Create a public repository named exactly like your GitHub username, add this as `README.md`, and set the profile's website and location fields.

```markdown
# Ahtesham Salamat Ansari

**AI Engineer** · Burhanpur, Madhya Pradesh, India

I build LLM applications, RAG chatbots, AI agents with MCP, n8n workflow automation and Python data pipelines.

- 🌐 Portfolio and case studies: https://ahteshamsalamatansari.vercel.app
- 📄 Case study: [AI Outreach Automation Platform](https://ahteshamsalamatansari.vercel.app/projects/ai-outreach-automation-platform): n8n, Airtable and OpenAI, 10,691 contacts, human approval, 500+ automated tests
- 🧰 Python · OpenAI · Claude · LangChain · n8n · Airtable · MCP · Playwright · SQL · Airflow · Docker
```

## 5. Article to republish

Publish on LinkedIn Articles, Medium and dev.to. On **dev.to** add `canonical_url: https://ahteshamsalamatansari.vercel.app/projects/ai-outreach-automation-platform` to the front matter. On **Medium** use *Import a story* with the same URL so Medium sets the canonical link. This avoids duplicate-content issues and passes credit to the site.

**Title:** Building an AI outreach platform that fails closed: lessons from n8n, Airtable and OpenAI

> *By Ahtesham Salamat Ansari, AI engineer in Burhanpur, India*
>
> I recently delivered a three-segment B2B outreach platform for a regional service company as the sole engineer. It researches each prospect organisation from its own website, drafts a personalised email grounded in an approved knowledge base, holds it for human approval, and sends it across a 20-mailbox pool under a shared rate limit. It manages 10,691 contacts across 4,350 organisations and is covered by more than 500 automated assertions.
>
> The design rule throughout was **failing closed**: every gate, cap and suppression rule is built so that a fault stops an email rather than releasing one.
>
> **The AI must never invent a price.** Asking a model not to invent figures works most of the time, and most of the time is not good enough. A validator extracts every number from each draft and checks it against the knowledge-base rows injected for that email. Unconfirmed commercial terms were loaded as inactive rows, so the model could not quote them at all.
>
> **Approval is enforced twice.** The database filter requires a human approval, and a code gate re-checks it, so a manual run cannot bypass the filter.
>
> **One shared send ledger.** Three campaigns each enforcing their own mailbox limit would have tripled the real volume. An append-only ledger made the combined cap real; an audit later took capacity from 100 to 500 emails a day by wiring in 16 idle mailboxes.
>
> **The worst bugs report success.** A missing `URL` class in the workflow sandbox silently disabled every research crawl; scheduled runs were executing thirteen-day-old code; a retry loop succeeded sixty times and processed nothing. Each was found by measuring outcomes, not by reading execution logs.
>
> Full case study with architecture, validators, deliverability and the five hardest bugs: https://ahteshamsalamatansari.vercel.app/projects/ai-outreach-automation-platform

## 6. More profiles that AI tools read

Create each with the same name, photo, location, standard bio and website link:

| Site | Why |
| --- | --- |
| [Peerlist](https://peerlist.io) | Developer profiles, well indexed for India |
| [dev.to](https://dev.to) / [Medium](https://medium.com) / [Hashnode](https://hashnode.com) | Articles with author bios and links |
| [n8n community](https://community.n8n.io) | Answer questions and share workflows under your full name |
| [Hugging Face](https://huggingface.co) | Profile for an AI engineer; add the website link |
| [Stack Overflow](https://stackoverflow.com) | Answers about n8n, LangChain, RAG and Python |
| [Wellfound](https://wellfound.com) | Engineer profile with location and website |

Helpful answers posted under your full name earn far more than a pile of profile links. One useful answer a week is a good pace.

## 7. Search engine submissions (after each deploy)

1. `npm run indexnow` sends every sitemap URL to Bing and the other IndexNow engines.
2. **Bing Webmaster Tools → URL Submission:** `/`, `/about`, and any new page.
3. **Google Search Console → URL Inspection → Request indexing:** `/about` first, then any new page.

## 8. What not to do

- No hidden text, keyword lists or repeated phrases on the site. Search engines penalise them and AI assistants ignore them.
- No paid link schemes or bulk directory submissions. They are flagged as spam.
- No "best AI engineer in India" claims. Assistants trust specific, checkable facts: a city, dates, projects with numbers.
