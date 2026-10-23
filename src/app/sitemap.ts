import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "@/config/site";

// Single-page site: one canonical URL. Section anchors are not separate pages
// for search engines, so they are intentionally not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(LAST_UPDATED),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
