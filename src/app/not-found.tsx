import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell
      crumbs={[{ name: 'Not found', path: '/404' }]}
      eyebrow="404"
      title="That page isn’t here."
      lede="The link may be out of date, or the page may have moved. Everything below is still where it should be."
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
          {[
            { href: '/', label: 'Home', hint: 'The full portfolio' },
            { href: '/work', label: 'Projects', hint: 'Five production systems' },
            { href: '/case-studies', label: 'Case studies', hint: 'Problem → result, in full' },
            { href: '/writing', label: 'Writing', hint: 'Engineering notes' },
            { href: '/resume', label: 'Résumé', hint: 'Read or download' },
            { href: '/contact', label: 'Contact', hint: 'Replies within a day' },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group block rounded-2xl border border-paper/[0.1] bg-paper/[0.02] p-6 hover:border-accent/40 transition-colors duration-300"
              >
                <span className="block text-lg font-semibold text-paper group-hover:text-accent transition-colors duration-300">
                  {l.label}
                </span>
                <span className="mt-1 block text-sm text-paper/65">{l.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
