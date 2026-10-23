import { site } from "@/config/site";
import { getProject, projects } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `Case study by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug) ?? projects[0];
  return renderOgImage({
    eyebrow: `Case study · ${site.name}`,
    title: project.title,
    subtitle: project.stack.join(" · "),
    results: project.results,
  });
}
