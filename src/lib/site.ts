/**
 * Single source of truth for everything that needs an absolute URL or an
 * external identity: metadata, canonicals, sitemap, JSON-LD, OG images.
 *
 * If you later move to a custom domain, change SITE_URL here (or set
 * NEXT_PUBLIC_SITE_URL) — nothing else in the codebase hardcodes a domain.
 */

/** Production domain. No trailing slash. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://ahteshamsalamatansari.vercel.app';

export const SITE_NAME = 'Ahtesham Salamat Ansari';
export const SITE_TAGLINE = 'AI Engineer';

/**
 * The sameAs identity graph. This is what lets Google and LLMs confirm that
 * this site, the LinkedIn profile and the GitHub account are one person.
 * Empty strings are filtered out everywhere, so an unknown profile is safe
 * to leave blank — it just weakens the graph.
 */
export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/ahteshamsalamatansari',
  github: 'https://github.com/ahteshamsalamatansari',
  twitter: 'https://x.com/ahteshamsalamat',
  instagram: 'https://www.instagram.com/ahteshamsalamat/',
  medium: 'https://medium.com/@ahteshamsalamat',
  scholar: '',
} as const;

/** Handle without the @, used for the Twitter card creator tag. */
export const TWITTER_HANDLE = 'ahteshamsalamat';

export const SAME_AS: string[] = Object.values(SOCIALS).filter(Boolean);

/**
 * Search-engine ownership verification.
 *
 * Both engines are verified by the FILE method — public/google*.html and
 * public/BingSiteAuth.xml — which is what is actually live. These meta tags
 * are a redundant second signal.
 *
 * Google is intentionally left blank: the google-site-verification meta tag
 * takes a different token from the one in the filename, so guessing it from
 * the file would emit a tag that silently fails. Paste the real value here
 * only if you also generate an HTML-tag verification in Search Console.
 * Bing's msvalidate.01 token IS the GUID inside BingSiteAuth.xml, so it can
 * be reused directly.
 */
export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? '',
  bing:
    process.env.NEXT_PUBLIC_BING_VERIFICATION ??
    'DCCF0EFED55DD44D14F2C6FA741FBF1C',
};

export const RESUME_PATH = '/Ahtesham-Ansari-AI-Engineer-Resume.pdf';

export const abs = (path: string) =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
