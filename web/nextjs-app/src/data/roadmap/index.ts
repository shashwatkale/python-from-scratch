// src/data/roadmap/index.ts — Master Roadmap Aggregator & Calculations
import type {
  CareerRole,
  CareerRoleId,
  RoadmapNode,
  RoadmapEdge,
  RoadmapStage,
  NodeStatus,
} from "@/types";
import { ROADMAP_STAGES } from "./stages";
import { CAREER_ROLES } from "./roles";
import { ROADMAP_NODES } from "./nodes";
import { ROADMAP_EDGES } from "./edges";
import { CAPSTONE_PROJECTS } from "./projects";

export { ROADMAP_STAGES, CAREER_ROLES, ROADMAP_NODES, ROADMAP_EDGES, CAPSTONE_PROJECTS };

export function getRoleById(id: CareerRoleId): CareerRole | undefined {
  return CAREER_ROLES.find((r) => r.id === id);
}

export function getNodeById(id: string): RoadmapNode | undefined {
  return ROADMAP_NODES.find((n) => n.id === id);
}

export function getStageById(id: string): RoadmapStage | undefined {
  return ROADMAP_STAGES.find((s) => s.id === id);
}

/**
 * Calculates dynamic node status based on user's completed lessons in localStorage
 */
export function getNodeStatus(
  node: RoadmapNode,
  completedLessons: string[],
  allNodes: RoadmapNode[] = ROADMAP_NODES
): NodeStatus {
  if (node.lessons.length > 0) {
    const completedCount = node.lessons.filter((l) =>
      completedLessons.includes(`${l.phaseSlug}/${l.lessonSlug}`)
    ).length;

    if (completedCount === node.lessons.length) {
      return "completed";
    }
    if (completedCount > 0) {
      return "in-progress";
    }
  }

  // Check if all prerequisites are completed
  const arePrereqsMet = node.prerequisites.every((prereqId) => {
    const prereqNode = allNodes.find((n) => n.id === prereqId);
    if (!prereqNode || prereqNode.lessons.length === 0) return true;
    return prereqNode.lessons.every((l) =>
      completedLessons.includes(`${l.phaseSlug}/${l.lessonSlug}`)
    );
  });

  return arePrereqsMet ? "available" : "locked";
}

/**
 * Calculates overall percentage progress for a selected career role
 */
export function calculateRoleProgress(
  roleId: CareerRoleId,
  completedLessons: string[]
): number {
  const role = getRoleById(roleId);
  if (!role || role.nodeIds.length === 0) return 0;

  const roleNodes = role.nodeIds
    .map((id) => getNodeById(id))
    .filter((n): n is RoadmapNode => n !== undefined);

  let completedNodesCount = 0;
  for (const node of roleNodes) {
    const status = getNodeStatus(node, completedLessons, ROADMAP_NODES);
    if (status === "completed") {
      completedNodesCount++;
    }
  }

  return Math.round((completedNodesCount / roleNodes.length) * 100);
}

/**
 * Finds the immediate next recommended skill for a role
 */
export function getRecommendedNextNode(
  roleId: CareerRoleId,
  completedLessons: string[]
): RoadmapNode | undefined {
  const role = getRoleById(roleId);
  if (!role) return undefined;

  for (const nodeId of role.nodeIds) {
    const node = getNodeById(nodeId);
    if (!node) continue;
    const status = getNodeStatus(node, completedLessons, ROADMAP_NODES);
    if (status === "in-progress" || status === "available") {
      return node;
    }
  }

  return undefined;
}

/**
 * Returns edges that are active for the currently selected role
 */
export function getActiveEdgesForRole(
  roleId: CareerRoleId | "all"
): RoadmapEdge[] {
  if (roleId === "all") {
    return ROADMAP_EDGES;
  }
  const role = getRoleById(roleId);
  if (!role) return ROADMAP_EDGES;

  const nodeSet = new Set(role.nodeIds);
  return ROADMAP_EDGES.filter(
    (edge) => nodeSet.has(edge.from) && nodeSet.has(edge.to)
  );
}

/**
 * Traverses full upstream prerequisite and downstream unlock chains for a node
 */
export function getNodeDependencyChain(nodeId: string): {
  prereqs: Set<string>;
  unlocks: Set<string>;
} {
  const prereqs = new Set<string>();
  const unlocks = new Set<string>();

  function collectPrereqs(id: string) {
    const node = getNodeById(id);
    if (!node) return;
    for (const pId of node.prerequisites) {
      if (!prereqs.has(pId)) {
        prereqs.add(pId);
        collectPrereqs(pId);
      }
    }
  }

  function collectUnlocks(id: string) {
    const node = getNodeById(id);
    if (!node) return;
    for (const uId of node.unlocks) {
      if (!unlocks.has(uId)) {
        unlocks.add(uId);
        collectUnlocks(uId);
      }
    }
  }

  collectPrereqs(nodeId);
  collectUnlocks(nodeId);

  return { prereqs, unlocks };
}

/**
 * Fuzzy search across all skills in the roadmap
 */
export function searchRoadmapSkills(query: string): RoadmapNode[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return ROADMAP_NODES.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.subtitle.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );
}

