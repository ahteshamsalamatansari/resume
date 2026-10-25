import { site } from "@/config/site";
import { getServicePage, servicePages } from "@/content/services";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `Service by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const service = getServicePage((await params).slug) ?? servicePages[0];
  return renderOgImage({
    eyebrow: `Service · ${site.name}`,
    title: service.shortName.charAt(0).toUpperCase() + service.shortName.slice(1),
    subtitle: service.stack.slice(0, 6).join(" · "),
    results: service.packages
      ? service.packages.map((p) => ({ value: p.price, label: `${p.name} · ${p.delivery}` }))
      : [{ value: "Custom scope", label: "quoted on Upwork" }],
  });
}
