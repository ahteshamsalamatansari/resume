/**
 * Site-wide configuration.
 *
 * UPWORK_PROFILE_URL is the only hiring-related destination on the site.
 * It was taken from the public Upwork freelancer profile (tracking params removed).
 * Change it here and every CTA updates.
 */
export const UPWORK_PROFILE_URL =
  "https://www.upwork.com/freelancers/~0130d0bef351ef54dc";

/**
 * Production origin, no trailing slash. Used for canonical URLs, the sitemap,
 * Open Graph and JSON-LD. Override with NEXT_PUBLIC_SITE_URL when moving to a
 * custom domain; nothing else hardcodes a domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahteshamsalamatansari.vercel.app"
).replace(/\/$/, "");

/** Bump when page content changes; feeds sitemap lastmod. */
export const LAST_UPDATED = "2026-10-23";

/**
 * Search-engine ownership. Both are verified with files in /public
 * (google57d36c46b130cd35.html, BingSiteAuth.xml), carried over from the
 * previous site so Search Console and Bing Webmaster Tools stay verified.
 * Bing's meta token is the GUID inside BingSiteAuth.xml. Google's meta token
 * differs from its file name, so it stays empty unless set explicitly.
 */
export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  bing: process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "DCCF0EFED55DD44D14F2C6FA741FBF1C",
};

export const site = {
  name: "Ahtesham Salamat Ansari",
  shortName: "Ahtesham Ansari",
  role: "AI Engineer",
  positioning: "AI Engineer | LLM Applications, RAG, AI Agents & Python Automation",
  title: "Ahtesham Salamat Ansari | AI Engineer: LLM Apps, RAG, AI Agents & Python Automation",
  description:
    "AI Engineer building LLM applications, RAG systems, AI agents, MCP integrations, and Python automation and data pipelines. Case studies with measured results from production work.",
} as const;

// Root-relative so they work from case-study pages; on the home page the browser
// treats them as same-document jumps.
export const navItems = [
  { label: "Overview", href: "/#overview" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
] as const;
