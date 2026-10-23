import { site } from "@/config/site";
import { projects } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `Case studies by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.name,
    title: "Case studies: AI automation, LLM pipelines and data engineering",
    subtitle: `${projects.length} projects with problem, approach, tools and measured results`,
    results: projects.slice(0, 3).map((p) => p.results[0]),
  });
}
