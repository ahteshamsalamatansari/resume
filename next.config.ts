import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/llms.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      },
    ];
  },

  // URLs from the previous multi-page site at this domain. They are indexed,
  // so send them (301) to the closest section of the single-page site instead
  // of letting them 404.
  async redirects() {
    return [
      { source: "/about", destination: "/#overview", permanent: true },
      { source: "/work", destination: "/#projects", permanent: true },
      { source: "/work/:slug*", destination: "/#projects", permanent: true },
      { source: "/case-studies", destination: "/#projects", permanent: true },
      { source: "/case-studies/:slug*", destination: "/#projects", permanent: true },
      { source: "/writing", destination: "/", permanent: true },
      { source: "/writing/:slug*", destination: "/", permanent: true },
      { source: "/resume", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/Ahtesham-Ansari-AI-Engineer-Resume.pdf", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
