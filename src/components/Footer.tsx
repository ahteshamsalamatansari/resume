import Link from 'next/link';
import { CONTACT } from '@/lib/data';
import { RESUME_PATH } from '@/lib/site';
import SocialLinks from './SocialLinks';

const COLUMNS = [
  {
    title: 'Work',
    links: [
      { label: 'Projects', href: '/work' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Writing', href: '/writing' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Profile', href: '/about' },
      { label: 'Résumé', href: '/resume' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-paper/[0.09] bg-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xl font-bold tracking-tight text-paper">
              {CONTACT.name}
            </p>
            <p className="mt-2 text-sm text-paper/60 max-w-sm leading-relaxed">
              {CONTACT.role} building production GenAI, RAG systems and data
              intelligence at scale. Open to remote roles.
            </p>
            <SocialLinks className="mt-6 flex-wrap" />
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper/70 hover:text-accent transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60">
              Direct
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-paper/70 hover:text-accent transition-colors duration-300 break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-paper/70 hover:text-accent transition-colors duration-300"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={RESUME_PATH}
                  download
                  className="text-accent hover:text-paper transition-colors duration-300"
                >
                  Download résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-paper/[0.09] flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-paper/55">
          <span>
            © {new Date().getFullYear()} {CONTACT.name}
          </span>
          <span className="font-mono text-xs">{CONTACT.location}</span>
        </div>
      </div>
    </footer>
  );
}
