import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Explicitly allows the AI crawlers as well as the search crawlers. For a
 * portfolio, being read and cited by ChatGPT, Claude, Perplexity and Gemini
 * is free distribution — this is a deliberate opt-in, not a default.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'Meta-ExternalAgent',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
