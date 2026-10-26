"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/config/site";
import { Container, Signature, UpworkButton } from "./ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  // Page links are active on their own pages; section links while their section is in view.
  const isActive = (href: string) => (href.includes("#") ? active === href : pathname.startsWith(href));

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = navItems
      .filter((item) => item.href.includes("#"))
      .map((item) => document.getElementById(item.href.split("#")[1]))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(`/#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={(e) => {
            // Already home: a same-URL navigation doesn't scroll, so go back to the top.
            if (pathname !== "/") return;
            e.preventDefault();
            window.history.replaceState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-ink transition-colors hover:text-brand-ink"
          aria-label="Ahtesham Salamat Ansari, home"
        >
          <Signature className="text-[26px] sm:text-[28px]" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const current = isActive(item.href);
              // Section links stay plain anchors so the browser does the smooth scroll.
              const NavLink = item.href.includes("#") ? "a" : Link;
              return (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    aria-current={current ? (item.href.includes("#") ? "true" : "page") : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                      current ? "text-brand-ink" : "text-ink/75 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-brand transition-opacity ${
                        current ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <UpworkButton size="sm" />
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-surface md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-full border-y border-line bg-white shadow-[0_12px_24px_-16px_rgba(34,34,34,0.25)] md:hidden">
          <Container className="py-4">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const NavLink = item.href.includes("#") ? "a" : Link;
                return (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={!item.href.includes("#") && isActive(item.href) ? "page" : undefined}
                      className="block rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-surface"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <UpworkButton className="mt-3 w-full" />
          </Container>
        </nav>
      )}
    </header>
  );
}
