/**
 * schema.org JSON-LD builders.
 *
 * This is the machine-readable identity layer: it tells Google and every LLM
 * answer engine who this person is, what they have built, and which external
 * profiles are the same person. Without it a search engine has to infer all
 * of that from prose, and an LLM asked "who is Ahtesham Ansari" has nothing
 * authoritative to anchor on.
 */

import {
  SITE_URL,
  SITE_NAME,
  SAME_AS,
  RESUME_PATH,
  abs,
} from './site';
import {
  CONTACT,
  ALL_SKILLS,
  EXPERIENCE,
  PROJECTS,
  CASE_STUDIES,
  BLOG_POSTS,
  FAQS,
  type BlogPost,
  type Project,
  type CaseStudy,
} from './data';

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

/** The root entity. Everything else references this by @id. */
export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: CONTACT.name,
  alternateName: 'Ahtesham Ansari',
  jobTitle: CONTACT.role,
  description:
    'AI Engineer building production generative AI, retrieval-augmented generation systems and data intelligence at scale.',
  email: `mailto:${CONTACT.email}`,
  telephone: CONTACT.phone,
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: abs('/profile.png'),
    width: 1254,
    height: 1254,
    caption: `${CONTACT.name} — ${CONTACT.role}`,
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: CONTACT.countryCode,
    addressLocality: CONTACT.locality,
  },
  knowsAbout: ALL_SKILLS,
  worksFor: {
    '@type': 'Organization',
    name: EXPERIENCE[0].company,
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'AI Engineer',
    occupationalCategory: '15-2051.00',
    skills: ALL_SKILLS.join(', '),
  },
  sameAs: SAME_AS,
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description:
    'Portfolio of Ahtesham Salamat Ansari — AI Engineer working on production GenAI, RAG systems and large-scale data pipelines.',
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
});

export const profilePageSchema = () => ({
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: `${CONTACT.name} — ${CONTACT.role}`,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
});

export const faqSchema = () => ({
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

export const projectSchema = (p: Project) => ({
  '@type': 'CreativeWork',
  '@id': abs(`/work/${p.slug}#project`),
  name: p.title,
  headline: p.title,
  description: p.summary,
  url: abs(`/work/${p.slug}`),
  dateCreated: p.year,
  creator: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
  keywords: p.stack.join(', '),
  about: p.category,
  isPartOf: { '@id': SITE_ID },
});

export const caseStudySchema = (c: CaseStudy) => ({
  '@type': 'Article',
  '@id': abs(`/case-studies/${c.slug}#article`),
  headline: c.title,
  description: c.summary,
  url: abs(`/case-studies/${c.slug}`),
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  keywords: c.stack.join(', '),
  about: c.client,
  inLanguage: 'en',
  mainEntityOfPage: abs(`/case-studies/${c.slug}`),
});

export const articleSchema = (post: BlogPost) => ({
  '@type': 'BlogPosting',
  '@id': abs(`/writing/${post.slug}#article`),
  headline: post.title,
  description: post.excerpt,
  url: abs(`/writing/${post.slug}`),
  datePublished: post.iso,
  dateModified: post.iso,
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  articleSection: post.category,
  inLanguage: 'en',
  mainEntityOfPage: abs(`/writing/${post.slug}`),
});

export const resumeSchema = () => ({
  '@type': 'DigitalDocument',
  '@id': abs('/resume#document'),
  name: `${CONTACT.name} — Résumé`,
  url: abs(RESUME_PATH),
  encodingFormat: 'application/pdf',
  about: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
});

export const itemListSchema = (
  name: string,
  items: { name: string; path: string }[]
) => ({
  '@type': 'ItemList',
  name,
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    url: abs(it.path),
  })),
});

/** Wrap any set of nodes into one @graph document. */
export const graph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});

/** The sitewide graph injected on every page. */
export const rootGraph = () =>
  graph(personSchema(), websiteSchema());

export const allProjectItems = PROJECTS.map((p) => ({
  name: p.title,
  path: `/work/${p.slug}`,
}));

export const allCaseStudyItems = CASE_STUDIES.map((c) => ({
  name: c.title,
  path: `/case-studies/${c.slug}`,
}));

export const allPostItems = BLOG_POSTS.map((p) => ({
  name: p.title,
  path: `/writing/${p.slug}`,
}));
