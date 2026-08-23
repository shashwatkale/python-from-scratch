// src/lib/search.ts — Client-side search using Fuse.js

import Fuse from "fuse.js";
import { PHASES, EXERCISES, PROJECTS } from "./curriculum";
import type { SearchResult } from "@/types";

import { GLOSSARY_TERMS } from "@/data/glossary";
import { ROADMAP_NODES, CAREER_ROLES } from "@/data/roadmap";
import { CERTIFICATION_TRACKS } from "@/data/certifications";

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const track of CERTIFICATION_TRACKS) {
    results.push({
      title: `${track.code} · ${track.title}`,
      description: track.tagline,
      category: "certification",
      href: `/certifications/${track.id}/`,
      tags: ["certification", "claude", "anthropic", track.code, track.levelBadge],
    });

    for (const lesson of track.lessons) {
      results.push({
        title: `${track.code} Lesson ${lesson.order.toString().padStart(2, "0")} · ${lesson.title}`,
        description: lesson.leadParagraph,
        category: "certification",
        href: `/certifications/${track.id}/lessons/${lesson.slug}/`,
        tags: ["certification", "lesson", track.code, ...lesson.domains],
      });
    }
  }

  for (const role of CAREER_ROLES) {
    results.push({
      title: `${role.title} Career Path`,
      description: role.headline,
      category: "project",
      href: `/roadmap/`,
      tags: ["career", "role", "roadmap", role.shortTitle],
    });
  }

  for (const node of ROADMAP_NODES) {
    results.push({
      title: `${node.number} · ${node.title}`,
      description: `${node.subtitle} — ${node.description}`,
      category: "lesson",
      href: `/roadmap/`,
      tags: [...node.tags, node.category, "roadmap", "skill"],
    });
  }

  for (const term of GLOSSARY_TERMS) {
    results.push({
      title: term.term,
      description: term.definition,
      category: "glossary",
      href: `/glossary/${term.slug}/`,
      tags: [...term.tags, term.categoryLabel, term.difficulty],
    });
  }

  for (const phase of PHASES) {
    for (const lesson of phase.lessons) {
      results.push({
        title: lesson.title,
        description: lesson.description,
        category: "lesson",
        href: `/curriculum/${phase.slug}/${lesson.slug}/`,
        tags: lesson.tags,
      });
    }
  }

  for (const exercise of EXERCISES) {
    results.push({
      title: exercise.title,
      description: exercise.description,
      category: "exercise",
      href: `/exercises/#${exercise.slug}`,
      tags: exercise.tags,
    });
  }

  for (const project of PROJECTS) {
    results.push({
      title: project.title,
      description: project.description,
      category: "project",
      href: `/projects/#${project.slug}`,
      tags: project.concepts,
    });
  }

  return results;
}

const INDEX = buildIndex();

const fuse = new Fuse(INDEX, {
  keys: ["title", "description", "tags"],
  threshold: 0.35,
  includeScore: true,
});

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((r) => r.item);
}
