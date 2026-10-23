import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { buildJsonLd } from "@/lib/schema";
import { Approach, FinalCta, Hero, Overview, Projects, Services, SiteFooter, Skills } from "@/components/sections";

export default function Home() {
  return (
    <>
      <JsonLd data={buildJsonLd()} />
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div id="top" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Overview />
        <Services />
        <Projects />
        <Skills />
        <Approach />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
