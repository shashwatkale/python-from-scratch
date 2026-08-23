// src/components/roadmap/RoadmapGraph.tsx — Interactive SVG Career Roadmap
"use client";

import { useMemo, useRef } from "react";
import {
  ROADMAP_NODES,
  ROADMAP_EDGES,
  ROADMAP_STAGES,
  getNodeById,
  getNodeStatus,
} from "@/data/roadmap";
import type { CareerRoleId, RoadmapNode } from "@/types";

interface Props {
  selectedRole: CareerRoleId | "all";
  selectedNodeId: string | null;
  activeRoleNodeIds: Set<string>;
  prereqNodeIds: Set<string>;
  unlockNodeIds: Set<string>;
  completedLessons: string[];
  zoom: number;
  onSelectNode: (nodeId: string) => void;
}

const NODE_WIDTH = 180;
const NODE_HEIGHT = 68;

export function RoadmapGraph({
  selectedRole,
  selectedNodeId,
  activeRoleNodeIds,
  prereqNodeIds,
  unlockNodeIds,
  completedLessons,
  zoom,
  onSelectNode,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Determine edge styling and active state
  const renderedEdges = useMemo(() => {
    return ROADMAP_EDGES.map((edge) => {
      const fromNode = getNodeById(edge.from);
      const toNode = getNodeById(edge.to);
      if (!fromNode || !toNode) return null;

      const isFromActive =
        selectedRole === "all" || activeRoleNodeIds.has(edge.from);
      const isToActive =
        selectedRole === "all" || activeRoleNodeIds.has(edge.to);
      const isActive = isFromActive && isToActive;

      const isSelectedPrereq =
        selectedNodeId !== null &&
        (edge.to === selectedNodeId || prereqNodeIds.has(edge.from));
      const isSelectedUnlock =
        selectedNodeId !== null &&
        (edge.from === selectedNodeId || unlockNodeIds.has(edge.to));

      // Calculate smooth curved path
      const startX = fromNode.x;
      const startY = fromNode.y + NODE_HEIGHT / 2;
      const endX = toNode.x;
      const endY = toNode.y - NODE_HEIGHT / 2;

      const midY = (startY + endY) / 2;
      const pathD = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

      return {
        id: edge.id,
        pathD,
        startX,
        startY,
        endX,
        endY,
        isActive,
        isSelectedPrereq,
        isSelectedUnlock,
      };
    }).filter((e): e is NonNullable<typeof e> => e !== null);
  }, [selectedRole, activeRoleNodeIds, selectedNodeId, prereqNodeIds, unlockNodeIds]);

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: `${1400 * zoom}px`,
          margin: "0 auto",
          transition: "width 0.2s ease-out",
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1400 2300"
          width="100%"
          height="auto"
          style={{ display: "block" }}
        >
          <defs>
            {/* Arrowhead markers */}
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-accent)" />
            </marker>

            <marker
              id="arrow-inactive"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-border-2)" />
            </marker>

            <marker
              id="arrow-prereq"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
            </marker>

            <marker
              id="arrow-unlock"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
            </marker>

            {/* Filter for node card shadows */}
            <filter id="card-shadow" x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.08" />
            </filter>

            <filter id="selected-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="var(--color-accent)" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* ─── STAGE BACKGROUND BANDS ─────────────────────────── */}
          {ROADMAP_STAGES.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <g key={stage.id} id={`stage-${stage.id}`}>
                {/* Band background */}
                <rect
                  x="0"
                  y={stage.y}
                  width="1400"
                  height={stage.height}
                  fill={isEven ? "var(--color-surface)" : "var(--color-bg)"}
                  stroke="var(--color-border)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Zone Header Label */}
                <text
                  x="40"
                  y={stage.y + 35}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="0.12em"
                  fill="var(--color-accent-text)"
                  textAnchor="start"
                >
                  {stage.number} · {stage.title.toUpperCase()}
                </text>
                <text
                  x="40"
                  y={stage.y + 52}
                  fontFamily="var(--font-body)"
                  fontSize="12"
                  fill="var(--color-ink-3)"
                  textAnchor="start"
                >
                  {stage.subtitle}
                </text>
              </g>
            );
          })}

          {/* ─── EDGES (DEPENDENCY PATHS) ───────────────────────── */}
          <g className="edges-layer">
            {renderedEdges.map((edge) => {
              let strokeColor = "var(--color-border-2)";
              let strokeWidth = 1.5;
              let markerEnd = "url(#arrow-inactive)";
              let strokeDasharray = "none";
              let opacity = selectedRole === "all" ? 0.8 : 0.25;

              if (edge.isSelectedPrereq) {
                strokeColor = "#059669";
                strokeWidth = 2.5;
                markerEnd = "url(#arrow-prereq)";
                opacity = 1;
              } else if (edge.isSelectedUnlock) {
                strokeColor = "#d97706";
                strokeWidth = 2.5;
                markerEnd = "url(#arrow-unlock)";
                opacity = 1;
              } else if (edge.isActive) {
                strokeColor = "var(--color-accent)";
                strokeWidth = 2;
                markerEnd = "url(#arrow-active)";
                opacity = 1;
              }

              return (
                <g key={edge.id}>
                  {/* Base path */}
                  <path
                    d={edge.pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    markerEnd={markerEnd}
                    opacity={opacity}
                    style={{ transition: "stroke 0.2s, opacity 0.2s, stroke-width 0.2s" }}
                  />

                  {/* Active Travelling Pulse Particle (if active route) */}
                  {edge.isActive && !edge.isSelectedPrereq && (
                    <circle r="3.5" fill="var(--color-accent)">
                      <animateMotion
                        path={edge.pathD}
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </g>

          {/* ─── NODES (SKILL CARDS) ────────────────────────────── */}
          <g className="nodes-layer">
            {ROADMAP_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isPrereq = prereqNodeIds.has(node.id);
              const isUnlock = unlockNodeIds.has(node.id);
              const isInActiveRole =
                selectedRole === "all" || activeRoleNodeIds.has(node.id);

              const status = getNodeStatus(node, completedLessons, ROADMAP_NODES);
              const isCompleted = status === "completed";
              const isAvailable = status === "available" || status === "in-progress";

              // Opacity logic
              let nodeOpacity = 1;
              if (selectedNodeId) {
                if (isSelected || isPrereq || isUnlock) {
                  nodeOpacity = 1;
                } else {
                  nodeOpacity = 0.35;
                }
              } else if (!isInActiveRole) {
                nodeOpacity = 0.4;
              }

              // Card styling colors
              let cardBg = "var(--color-surface)";
              let borderColor = "var(--color-border)";
              let filter = "url(#card-shadow)";

              if (isSelected) {
                cardBg = "var(--color-accent-soft)";
                borderColor = "var(--color-accent)";
                filter = "url(#selected-glow)";
              } else if (isPrereq) {
                cardBg = "#f0fdf4";
                borderColor = "#059669";
              } else if (isUnlock) {
                cardBg = "#fffbeb";
                borderColor = "#d97706";
              } else if (isCompleted) {
                cardBg = "var(--color-surface-2)";
                borderColor = "var(--color-accent)";
              }

              const cardX = node.x - NODE_WIDTH / 2;
              const cardY = node.y - NODE_HEIGHT / 2;

              return (
                <g
                  key={node.id}
                  id={`node-${node.id}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.title} — ${node.subtitle}`}
                  onClick={() => onSelectNode(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectNode(node.id);
                    }
                  }}
                  opacity={nodeOpacity}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                    transition: "opacity 0.2s ease, transform 0.15s ease",
                  }}
                >
                  {/* Card Background Rect */}
                  <rect
                    x={cardX}
                    y={cardY}
                    width={NODE_WIDTH}
                    height={NODE_HEIGHT}
                    rx="2"
                    fill={cardBg}
                    stroke={borderColor}
                    strokeWidth={isSelected ? 2 : 1}
                    filter={filter}
                  />

                  {/* Top Bar / Status Stripe */}
                  <rect
                    x={cardX}
                    y={cardY}
                    width={NODE_WIDTH}
                    height="3"
                    fill={
                      isCompleted
                        ? "var(--color-accent)"
                        : isSelected
                        ? "var(--color-accent)"
                        : isPrereq
                        ? "#059669"
                        : isUnlock
                        ? "#d97706"
                        : "transparent"
                    }
                  />

                  {/* Node Number & Category */}
                  <text
                    x={cardX + 10}
                    y={cardY + 18}
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    fontWeight="700"
                    fill={
                      isSelected
                        ? "var(--color-accent)"
                        : isCompleted
                        ? "var(--color-accent-text)"
                        : "var(--color-ink-3)"
                    }
                  >
                    {node.number} · {node.category.toUpperCase()}
                  </text>

                  {/* Status Indicator Icon / Text (Top Right) */}
                  <text
                    x={cardX + NODE_WIDTH - 10}
                    y={cardY + 18}
                    fontFamily="var(--font-mono)"
                    fontSize="8"
                    fontWeight="700"
                    textAnchor="end"
                    fill={
                      isCompleted
                        ? "var(--color-accent)"
                        : isAvailable
                        ? "var(--color-accent-text)"
                        : "var(--color-ink-3)"
                    }
                  >
                    {isCompleted ? "✓ DONE" : isAvailable ? "READY" : "LOCKED"}
                  </text>

                  {/* Main Title */}
                  <text
                    x={cardX + 10}
                    y={cardY + 36}
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--color-ink)"
                    letterSpacing="0.02em"
                  >
                    {node.title.length > 18
                      ? node.title.slice(0, 17) + "…"
                      : node.title}
                  </text>

                  {/* Subtitle / Key topics */}
                  <text
                    x={cardX + 10}
                    y={cardY + 52}
                    fontFamily="var(--font-body)"
                    fontSize="9.5"
                    fill="var(--color-ink-3)"
                  >
                    {node.subtitle.length > 26
                      ? node.subtitle.slice(0, 25) + "…"
                      : node.subtitle}
                  </text>

                  {/* Focus Outline for Accessibility */}
                  <rect
                    x={cardX - 3}
                    y={cardY - 3}
                    width={NODE_WIDTH + 6}
                    height={NODE_HEIGHT + 6}
                    rx="4"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    opacity={isSelected ? 1 : 0}
                    style={{ transition: "opacity 0.12s" }}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

