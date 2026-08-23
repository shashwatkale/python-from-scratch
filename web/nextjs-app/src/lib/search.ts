// src/lib/search.ts — Client-side search using Fuse.js

import Fuse from "fuse.js";
import { PHASES, EXERCISES, PROJECTS } from "./curriculum";
import type { SearchResult } from "@/types";

import { GLOSSARY_TERMS } from "@/data/glossary";

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

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
