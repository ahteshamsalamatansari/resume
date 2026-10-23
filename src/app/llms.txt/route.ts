import { SITE_URL, UPWORK_PROFILE_URL, site } from "@/config/site";
import { career, certifications, projects, services, skillGroups } from "@/content/profile";

/**
 * /llms.txt: a plain-text summary for AI assistants and answer engines,
 * generated from the same content the page renders.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.positioning}. ${site.description}`,
    "",
    `Website: ${SITE_URL}`,
    `Upwork profile: ${UPWORK_PROFILE_URL}`,
    "",
    "## Experience",
    ...career.map((c) => `- ${c.role}, ${c.org} (${c.period})`),
    "",
    "## Services",
    ...services.map((s) => `- ${s.title}: ${s.problem}`),
    "",
    "## Selected projects",
    ...projects.map(
      (p) =>
        `- ${p.title} (${p.context}): ${p.problem} Approach: ${p.approach.join(" ")} Results: ${p.results
          .map((r) => `${r.value} ${r.label}`)
          .join("; ")}. Stack: ${p.stack.join(", ")}.`,
    ),
    "",
    "## Skills",
    ...skillGroups.map((g) => `- ${g.title}: ${g.skills.join(", ")}`),
    "",
    "## Certifications",
    ...certifications.map((c) => `- ${c.name} (${c.issuer}, ${c.year})`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
