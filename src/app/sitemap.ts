import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "@/config/site";
import { projects } from "@/content/profile";
import { servicePages } from "@/content/services";

// Home, the service and case-study indexes, and one page per service and case study. Section anchors on
// the home page are not separate pages for search engines, so they are not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...servicePages.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
