import { site } from "@/config/site";
import { servicePages } from "@/content/services";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `Services by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.name,
    title: "AI engineering services: automation, RAG chatbots, AI agents",
    subtitle: `${servicePages.length} services, ordered on Upwork`,
    results: [
      { value: "AI automation", label: "audits and n8n workflows" },
      { value: "RAG and agents", label: "chatbots, MCP, LLM integration" },
      { value: "Web data", label: "scraping and cleaning" },
    ],
  });
}
