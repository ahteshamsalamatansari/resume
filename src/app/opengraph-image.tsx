import { site } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${site.name}, ${site.positioning}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.name,
    title: "Building AI systems that solve real business problems",
    subtitle: "LLM Applications · RAG · AI Agents · Python Automation",
    results: [
      { value: "10,691", label: "contacts, AI outreach platform" },
      { value: "1.5M", label: "Q&A from a generative pipeline" },
      { value: "78% → 94%", label: "dataset accuracy" },
    ],
  });
}
