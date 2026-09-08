'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/data';

/**
 * No backend, no API keys, and no silent failure. The form composes a
 * prefilled message and hands it to the user's mail client — and because a
 * mailto: link does nothing at all on a machine with no mail client
 * configured, the address itself is always one click from the clipboard.
 */
export default function ContactForm() {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const subject = name
    ? `Hello from ${name}`
    : 'Hello — reaching out from your site';

  const bodyLines = [
    message,
    '',
    '—',
    name && `Name: ${name}`,
    from && `Email: ${from}`,
  ].filter(Boolean);

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the
      // address stays selectable as text, so there is still a path.
      setCopied(false);
    }
  };

  const field =
    'w-full rounded-xl border border-paper/15 bg-paper/[0.03] px-4 py-3.5 text-paper placeholder:text-paper/60 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors duration-300';

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <form
        className="lg:col-span-7 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = mailto;
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="cf-name"
              className="block font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-2"
            >
              Name
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="cf-email"
              className="block font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-2"
            >
              Email
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={field}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="cf-message"
            className="block font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-2"
          >
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${field} resize-y`}
            placeholder="What are you building?"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-semibold rounded-full hover:bg-paper transition-colors duration-300 glow-accent"
        >
          Send message
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="text-xs text-paper/55 leading-relaxed">
          This opens your email client with the message prefilled. If nothing
          happens, your device has no mail client configured — use the address
          on the right instead.
        </p>
      </form>

      <aside className="lg:col-span-5">
        <div className="rounded-2xl border border-paper/[0.1] bg-paper/[0.02] p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
            Or reach me directly
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-lg font-semibold text-paper hover:text-accent transition-colors duration-300 break-all"
            >
              {CONTACT.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-3.5 py-1.5 text-xs font-medium text-paper/75 hover:text-accent hover:border-accent/50 transition-colors duration-300"
            >
              {copied ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <rect x="9" y="9" width="12" height="12" rx="2" />
                    <path d="M5 15V5a2 2 0 012-2h10" strokeLinecap="round" />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>

          <dl className="mt-7 space-y-4 text-sm">
            <div className="flex items-baseline justify-between gap-4 border-t border-paper/[0.08] pt-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                Phone
              </dt>
              <dd>
                <a
                  href={CONTACT.phoneHref}
                  className="text-paper/85 hover:text-accent transition-colors duration-300"
                >
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-paper/[0.08] pt-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                Location
              </dt>
              <dd className="text-paper/85">{CONTACT.location}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-paper/[0.08] pt-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                Response
              </dt>
              <dd className="text-paper/85">Usually within a day</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
