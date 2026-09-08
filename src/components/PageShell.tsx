import Link from 'next/link';
import Nav from './Nav';
import Footer from './Footer';
import Cursor from './Cursor';
import JsonLd from './JsonLd';
import { graph, breadcrumbSchema } from '@/lib/schema';

export type Crumb = { name: string; path: string };

/**
 * Layout for every sub-page: nav, breadcrumb trail, content, footer.
 * Deliberately without the Preloader — that entrance belongs to the
 * homepage only, and repeating it on every route would tax navigation.
 */
export default function PageShell({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
  schema,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  schema?: object[];
}) {
  const trail: Crumb[] = [{ name: 'Home', path: '/' }, ...crumbs];

  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(trail), ...(schema ?? []))} />
      <Cursor />
      <Nav />
      <main id="main" className="relative">
        <header className="relative border-b border-paper/[0.08] bg-dark">
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_0%,rgba(31,111,95,0.20),transparent_60%)]"
            aria-hidden
          />
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-24">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55">
                {trail.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-paper/60">
                        /
                      </span>
                    )}
                    {i === trail.length - 1 ? (
                      <span className="text-accent" aria-current="page">
                        {c.name}
                      </span>
                    ) : (
                      <Link
                        href={c.path}
                        className="hover:text-accent transition-colors duration-300"
                      >
                        {c.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-5">
              {eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tightest text-paper leading-[1.02] max-w-4xl">
              {title}
            </h1>
            {lede && (
              <p className="mt-7 text-lg md:text-xl text-paper/70 max-w-2xl leading-relaxed">
                {lede}
              </p>
            )}
          </div>
        </header>

        {children}
      </main>
      <Footer />
    </>
  );
}
