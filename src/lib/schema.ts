import { LAST_UPDATED, LOCATION, PHOTO, SITE_URL, UPWORK_PROFILE_URL, site } from "@/config/site";
import { career, certifications, education, projects, services, skillGroups, type Project } from "@/content/profile";
import { aboutFaqs, homeFaqs, servicePages, type Faq, type ServicePage } from "@/content/services";

/**
 * JSON-LD graph for the home page: WebSite, ProfilePage and Person.
 * Built from the same content the page renders, so structured data never
 * claims more than the visible page does.
 */
const PERSON_ID = `${SITE_URL}/#person`;
export const projectUrl = (p: Project) => `${SITE_URL}/projects/${p.slug}`;
const SITE_ID = `${SITE_URL}/#website`;
export const serviceUrl = (s: ServicePage) => `${SITE_URL}/services/${s.slug}`;

const faqPage = (faqs: Faq[], url: string) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

function personNode() {
  const current = career[0];

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    alternateName: [site.shortName, "Ahtesham S. Ansari"],
    givenName: "Ahtesham",
    familyName: "Ansari",
    url: SITE_URL,
    mainEntityOfPage: `${SITE_URL}/about`,
    image: { "@type": "ImageObject", url: `${SITE_URL}${PHOTO.src}`, width: PHOTO.width, height: PHOTO.height },
    jobTitle: site.role,
    description: site.bio,
    disambiguatingDescription: `AI Engineer from ${LOCATION.label}, specialising in LLM applications, RAG, AI agents and Python automation`,
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCATION.city,
      addressRegion: LOCATION.region,
      addressCountry: LOCATION.countryCode,
    },
    homeLocation: {
      "@type": "Place",
      name: LOCATION.label,
      address: {
        "@type": "PostalAddress",
        addressLocality: LOCATION.city,
        addressRegion: LOCATION.region,
        addressCountry: LOCATION.countryCode,
      },
    },
    nationality: { "@type": "Country", name: LOCATION.country },
    worksFor: { "@type": "Organization", name: current.org },
    hasOccupation: {
      "@type": "Occupation",
      name: site.role,
      occupationLocation: { "@type": "Country", name: LOCATION.country },
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
  return person;
}

export function buildJsonLd() {
  const person = personNode();

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
        name: "Services you can order",
        itemListElement: servicePages.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: serviceUrl(s),
          name: s.shortName,
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
            url: projectUrl(p),
            description: `${p.problem} Result: ${p.results.map((r) => `${r.value} ${r.label}`).join("; ")}.`,
            creator: { "@id": PERSON_ID },
            keywords: p.stack.join(", "),
          },
        })),
      },
    ],
  };

  return { "@context": "https://schema.org", "@graph": [website, profilePage, person, faqPage(homeFaqs, SITE_URL)] };
}

const breadcrumbs = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
});

/** /projects: the list of case studies. */
export function buildProjectsIndexJsonLd() {
  const url = `${SITE_URL}/projects`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: `Case studies | ${site.name}`,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: projectUrl(p),
            name: p.title,
          })),
        },
      },
      breadcrumbs([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Case studies", url },
      ]),
    ],
  };
}

/** /projects/[slug]: one case study, authored by the person on the home page. */
export function buildCaseStudyJsonLd(p: Project) {
  const url = projectUrl(p);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: p.title,
        description: p.summary,
        image: `${url}/opengraph-image`,
        datePublished: p.published ?? LAST_UPDATED,
        dateModified: LAST_UPDATED,
        inLanguage: "en",
        author: { "@type": "Person", "@id": PERSON_ID, name: site.name, url: SITE_URL, image: `${SITE_URL}${PHOTO.src}` },
        publisher: { "@type": "Person", "@id": PERSON_ID, name: site.name },
        isPartOf: { "@id": SITE_ID },
        keywords: p.stack.join(", "),
        about: p.services.map((name) => ({ "@type": "Thing", name })),
      },
      breadcrumbs([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Case studies", url: `${SITE_URL}/projects` },
        { name: p.title, url },
      ]),
    ],
  };
}

/** /services: the list of service pages. */
export function buildServicesIndexJsonLd() {
  const url = `${SITE_URL}/services`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: `Services | ${site.name}`,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        mainEntity: {
          "@type": "OfferCatalog",
          name: "AI engineering and automation services",
          itemListElement: servicePages.map((s) => ({
            "@type": "Offer",
            url: serviceUrl(s),
            itemOffered: { "@type": "Service", name: s.shortName, url: serviceUrl(s) },
          })),
        },
      },
      breadcrumbs([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Services", url },
      ]),
    ],
  };
}

/** /services/[slug]: one service and its FAQ. Prices are not shown on the site, so no Offer markup. */
export function buildServiceJsonLd(s: ServicePage) {
  const url = serviceUrl(s);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name: s.name,
        serviceType: s.shortName,
        description: s.metaDescription,
        provider: { "@type": "Person", "@id": PERSON_ID, name: site.name, url: SITE_URL },
        areaServed: "Worldwide",
        availableChannel: { "@type": "ServiceChannel", serviceUrl: UPWORK_PROFILE_URL, name: "Upwork" },
        keywords: s.keywords.join(", "),
      },
      faqPage(s.faqs, url),
      breadcrumbs([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: s.shortName, url },
      ]),
    ],
  };
}

/** /about: the canonical profile of the person, with quick answers as FAQPage. */
export function buildAboutJsonLd() {
  const url = `${SITE_URL}/about`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#page`,
        url,
        name: `About ${site.name}, AI Engineer in ${LOCATION.city}, ${LOCATION.country}`,
        description: site.bio,
        isPartOf: { "@id": SITE_ID },
        mainEntity: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
        primaryImageOfPage: `${SITE_URL}${PHOTO.src}`,
        dateModified: LAST_UPDATED,
        inLanguage: "en",
      },
      personNode(),
      faqPage(aboutFaqs, url),
      breadcrumbs([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "About", url },
      ]),
    ],
  };
}
