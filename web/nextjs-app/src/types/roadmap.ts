// src/types/roadmap.ts — Strict types for Python Career Roadmap

export type CareerRoleId =
  | "python-dev"
  | "backend-dev"
  | "fastapi-dev"
  | "data-analyst"
  | "data-scientist"
  | "ml-engineer"
  | "ai-engineer"
  | "automation-engineer"
  | "qa-sdet"
  | "devops-platform"
  | "fullstack-python";

export type NodeStatus =
  | "locked"
  | "available"
  | "in-progress"
  | "completed"
  | "recommended";

export interface NodeLessonRef {
  title: string;
  phaseSlug: string;
  lessonSlug: string;
}

export interface RoadmapNode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  stageId: string;
  category: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[]; // node IDs
  unlocks: string[]; // node IDs
  lessons: NodeLessonRef[];
  projects: string[];
  tags: string[];
  x: number; // SVG center X
  y: number; // SVG center Y
  width?: number;
  height?: number;
}

export interface CapstoneProject {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  skills: string[];
}

export interface CareerRole {
  id: CareerRoleId;
  title: string;
  shortTitle: string;
  headline: string;
  description: string;
  icon: string;
  nodeIds: string[];
  capstoneProjects: CapstoneProject[];
}

export interface RoadmapEdge {
  id: string;
  from: string; // node ID
  to: string;   // node ID
  roles?: CareerRoleId[];
}

export interface RoadmapStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  y: number;
  height: number;
  nodeIds: string[];
}

