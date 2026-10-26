import { LOCATION, site } from "@/config/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${site.name}, AI Engineer in ${LOCATION.city}, ${LOCATION.country}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: `About · ${LOCATION.label}`,
    title: site.name,
    subtitle: "AI Engineer · LLM Applications · RAG · AI Agents · Python Automation",
    results: [
      { value: "10,691", label: "contacts, AI outreach platform" },
      { value: "1.5M", label: "Q&A from a generative pipeline" },
      { value: "78% → 94%", label: "dataset accuracy" },
    ],
  });
}
