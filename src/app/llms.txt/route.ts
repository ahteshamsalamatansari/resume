import { LOCATION, SITE_URL, UPWORK_PROFILE_URL, site } from "@/config/site";
import { career, certifications, projects, services, skillGroups } from "@/content/profile";
import { aboutFaqs, homeFaqs, servicePages } from "@/content/services";

/**
 * /llms.txt: a plain-text summary for AI assistants and answer engines,
 * generated from the same content the page renders.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.bio}`,
    "",
    `Role: ${site.positioning}`,
    `Location: ${LOCATION.label}`,
    `Website: ${SITE_URL}`,
    `About: ${SITE_URL}/about`,
    `Upwork profile: ${UPWORK_PROFILE_URL}`,
    "",
    "## Experience",
    ...career.map((c) => `- ${c.role}, ${c.org} (${c.period})`),
    "",
    "## Services",
    ...services.map((s) => `- ${s.title}: ${s.problem}`),
    "",
    `## Services you can order on Upwork (${SITE_URL}/services)`,
    ...servicePages.map(
      (s) =>
        `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.metaDescription} ${
          s.packages
            ? `Packages: ${s.packages.map((p) => `${p.name} (${p.delivery}): ${p.includes}`).join("; ")}.`
            : "Scoped per project."
        }`,
    ),
    "",
    `## Case studies (${SITE_URL}/projects)`,
    ...projects.map(
      (p) =>
        `- [${p.title}](${SITE_URL}/projects/${p.slug}) (${p.context}): ${p.problem} Approach: ${p.approach.join(" ")} Results: ${p.results
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
    "## FAQ",
    ...[...aboutFaqs, ...homeFaqs].flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
