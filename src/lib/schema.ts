import { SITE_URL, UPWORK_PROFILE_URL, site } from "@/config/site";
import { career, certifications, education, projects, services, skillGroups } from "@/content/profile";

/**
 * JSON-LD graph for the home page: WebSite, ProfilePage and Person.
 * Built from the same content the page renders, so structured data never
 * claims more than the visible page does.
 */
const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

export function buildJsonLd() {
  const current = career[0];

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    jobTitle: site.role,
    description: site.description,
    worksFor: { "@type": "Organization", name: current.org },
    hasOccupation: {
      "@type": "Occupation",
      name: site.role,
      skills: skillGroups.flatMap((g) => g.skills).join(", "),
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: [
      "Large language models",
      "Retrieval-Augmented Generation",
      "AI agents",
      "Model Context Protocol",
      "Workflow automation",
      "Python",
      "Data pipelines",
      "Data quality",
    ],
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
    // Upwork is the only public profile this site links to.
    sameAs: [UPWORK_PROFILE_URL],
  };

  const website = {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: site.title,
    isPartOf: { "@id": SITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    inLanguage: "en",
    hasPart: [
      {
        "@type": "ItemList",
        name: "Services",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "Service", name: s.title, description: s.problem, provider: { "@id": PERSON_ID } },
        })),
      },
      {
        "@type": "ItemList",
        name: "Selected projects",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            url: `${SITE_URL}/#projects`,
            description: `${p.problem} Result: ${p.results.map((r) => `${r.value} ${r.label}`).join("; ")}.`,
            creator: { "@id": PERSON_ID },
            keywords: p.stack.join(", "),
          },
        })),
      },
    ],
  };

  return { "@context": "https://schema.org", "@graph": [website, profilePage, person] };
}
