import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { PROJECTS, CASE_STUDIES, BLOG_POSTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/writing`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/resume`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];

  const projects: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${SITE_URL}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.85,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/writing/${p.slug}`,
    lastModified: new Date(p.iso),
    changeFrequency: 'yearly',
    priority: 0.75,
  }));

  return [...statics, ...caseStudies, ...projects, ...posts];
}
