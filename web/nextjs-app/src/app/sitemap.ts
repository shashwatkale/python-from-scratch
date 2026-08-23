import { MetadataRoute } from "next";
import { PHASES } from "@/lib/curriculum";
import { GLOSSARY_TERMS } from "@/data/glossary";

export const dynamic = "force-static";

const BASE = "https://your-username.github.io/python-from-scratch";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/curriculum/`, lastModified: new Date() },
    { url: `${BASE}/glossary/`, lastModified: new Date() },
    { url: `${BASE}/exercises/`, lastModified: new Date() },
    { url: `${BASE}/projects/`, lastModified: new Date() },
    { url: `${BASE}/cheatsheets/`, lastModified: new Date() },
    { url: `${BASE}/roadmap/`, lastModified: new Date() },
    { url: `${BASE}/about/`, lastModified: new Date() },
  ];

  for (const phase of PHASES) {
    routes.push({ url: `${BASE}/curriculum/${phase.slug}/`, lastModified: new Date() });
    for (const lesson of phase.lessons) {
      routes.push({
        url: `${BASE}/curriculum/${phase.slug}/${lesson.slug}/`,
        lastModified: new Date(),
      });
    }
  }

  for (const term of GLOSSARY_TERMS) {
    routes.push({
      url: `${BASE}/glossary/${term.slug}/`,
      lastModified: new Date(),
    });
  }

  return routes;
}
