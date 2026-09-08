import { SITE_URL, SAME_AS, RESUME_PATH } from '@/lib/site';
import {
  CONTACT,
  PROJECTS,
  CASE_STUDIES,
  BLOG_POSTS,
  EXPERIENCE,
  SKILL_GROUPS,
  METRICS,
  FAQS,
} from '@/lib/data';

export const dynamic = 'force-static';

/**
 * llms.txt — a curated plain-Markdown summary for LLM crawlers that do not
 * execute JavaScript. Generated from the same data as the site so it can
 * never drift out of sync with what the pages actually say.
 */
export function GET() {
  const body = `# ${CONTACT.name}

> ${CONTACT.role} based in ${CONTACT.locality}. Builds production generative AI,
> retrieval-augmented generation systems, and large-scale data pipelines.
> 3+ years of experience. Open to remote AI engineering roles.

- Site: ${SITE_URL}
- Email: ${CONTACT.email}
- Location: ${CONTACT.location}
- Résumé (PDF): ${SITE_URL}${RESUME_PATH}
${SAME_AS.map((u) => `- Profile: ${u}`).join('\n')}

## Headline results

${METRICS.map((m) => `- ${m.value} — ${m.label}`).join('\n')}

## Skills

${SKILL_GROUPS.map((g) => `### ${g.label}\n${g.blurb}\n${g.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}

## Experience

${EXPERIENCE.map(
  (e) => `### ${e.role} — ${e.company} (${e.period})\n${e.impact.map((i) => `- ${i}`).join('\n')}`
).join('\n\n')}

## Case studies

${CASE_STUDIES.map(
  (c) =>
    `### ${c.title} — ${c.client}\n${SITE_URL}/case-studies/${c.slug}\n\n${c.summary}\n\nResults: ${c.results
      .map((r) => `${r.value} ${r.label}`)
      .join('; ')}\nStack: ${c.stack.join(', ')}`
).join('\n\n')}

## Projects

${PROJECTS.map(
  (p) =>
    `### ${p.title}\n${SITE_URL}/work/${p.slug}\n\n${p.summary}\n\nStack: ${p.stack.join(', ')}`
).join('\n\n')}

## Writing

${BLOG_POSTS.map(
  (p) => `### ${p.title}\n${SITE_URL}/writing/${p.slug}\n\n${p.excerpt} (${p.date}, ${p.readTime})`
).join('\n\n')}

## Frequently asked questions

${FAQS.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
