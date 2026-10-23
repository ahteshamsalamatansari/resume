import type { ReactNode } from "react";
import { FinalCta, SiteFooter } from "./sections";
import { SiteHeader } from "./site-header";

/** Chrome shared by inner pages: skip link, header, closing CTA and footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        {children}
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
