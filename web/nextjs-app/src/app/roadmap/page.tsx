// src/app/roadmap/page.tsx — Animated Interactive Python Career Roadmap
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  CAREER_ROLES,
  ROADMAP_NODES,
  getRoleById,
  getNodeById,
  calculateRoleProgress,
  getNodeDependencyChain,
} from "@/data/roadmap";
import { loadProgress, saveProgress } from "@/lib/progress";
import { RoadmapHero } from "@/components/roadmap/RoadmapHero";
import { RoleSelector } from "@/components/roadmap/RoleSelector";
import { RoadmapControls } from "@/components/roadmap/RoadmapControls";
import { RoadmapGraph } from "@/components/roadmap/RoadmapGraph";
import { RouteInspector } from "@/components/roadmap/RouteInspector";
import { RecommendedNext } from "@/components/roadmap/RecommendedNext";
import { CareerRoleCards } from "@/components/roadmap/CareerRoleCards";
import { CapstoneProjectsSection } from "@/components/roadmap/CapstoneProjectsSection";
import type { CareerRoleId } from "@/types";

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState<CareerRoleId | "all">("python-dev");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load progress from browser localStorage on mount
  useEffect(() => {
    const p = loadProgress();
    setCompletedLessons(p.completedLessons);

    // Keyboard navigation (ESC to deselect)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNodeId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Active role object
  const activeRole = useMemo(() => {
    return selectedRole === "all" ? null : getRoleById(selectedRole) ?? null;
  }, [selectedRole]);

  // Set of node IDs active for the current role
  const activeRoleNodeIds = useMemo(() => {
    if (selectedRole === "all" || !activeRole) {
      return new Set(ROADMAP_NODES.map((n) => n.id));
    }
    return new Set(activeRole.nodeIds);
  }, [selectedRole, activeRole]);

  // Overall role completion percentage
  const roleProgress = useMemo(() => {
    if (!activeRole) return 0;
    return calculateRoleProgress(activeRole.id, completedLessons);
  }, [activeRole, completedLessons]);

  // Selected node object & dependency chains
  const selectedNode = useMemo(() => {
    return selectedNodeId ? getNodeById(selectedNodeId) ?? null : null;
  }, [selectedNodeId]);

  const { prereqs: prereqNodeIds, unlocks: unlockNodeIds } = useMemo(() => {
    if (!selectedNodeId) {
      return { prereqs: new Set<string>(), unlocks: new Set<string>() };
    }
    return getNodeDependencyChain(selectedNodeId);
  }, [selectedNodeId]);

  // Handler to toggle lesson completion
  const handleToggleLesson = useCallback((lessonKey: string) => {
    const p = loadProgress();
    if (p.completedLessons.includes(lessonKey)) {
      p.completedLessons = p.completedLessons.filter((s) => s !== lessonKey);
    } else {
      p.completedLessons.push(lessonKey);
    }
    saveProgress(p);
    setCompletedLessons([...p.completedLessons]);
  }, []);

  // Jump to specific zone
  const handleJumpToStage = useCallback((stageId: string) => {
    const el = document.getElementById(`stage-${stageId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* ── 1. Hero ───────────────────────────────────────────── */}
      <RoadmapHero activeRole={activeRole} roleProgress={roleProgress} />

      {/* ── 2. Role Selector ──────────────────────────────────── */}
      <RoleSelector
        selectedRole={selectedRole}
        onSelectRole={(role) => setSelectedRole(role)}
        completedLessons={completedLessons}
      />

      {/* ── 3. Recommended Next Banner ────────────────────────── */}
      <div style={{ padding: "0 1.5rem" }}>
        <RecommendedNext
          activeRole={activeRole}
          completedLessons={completedLessons}
          onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
        />
      </div>

      {/* ── 4. Graph Controls & Search Bar ────────────────────── */}
      <div style={{ marginTop: "1rem" }}>
        <RoadmapControls
          zoom={zoom}
          onZoomIn={() => setZoom((z) => Math.min(1.5, Math.round((z + 0.15) * 100) / 100))}
          onZoomOut={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.15) * 100) / 100))}
          onResetZoom={() => setZoom(1.0)}
          onJumpToStage={handleJumpToStage}
          onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
        />
      </div>

      {/* ── 5. Main Graph + Inspector Workspace ───────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: selectedNodeId ? "1fr 340px" : "1fr",
          borderBottom: "1px solid var(--color-border)",
          minHeight: "750px",
          position: "relative",
        }}
        className="roadmap-workspace"
      >
        {/* SVG Graph Canvas */}
        <div style={{ minWidth: 0 }}>
          <RoadmapGraph
            selectedRole={selectedRole}
            selectedNodeId={selectedNodeId}
            activeRoleNodeIds={activeRoleNodeIds}
            prereqNodeIds={prereqNodeIds}
            unlockNodeIds={unlockNodeIds}
            completedLessons={completedLessons}
            zoom={zoom}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
          />
        </div>

        {/* Right-Side Desktop / Sticky Inspector */}
        {selectedNodeId && (
          <aside
            style={{
              width: "340px",
              borderLeft: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              position: "sticky",
              top: "3.25rem",
              height: "calc(100vh - 3.25rem)",
              overflowY: "auto",
              zIndex: 30,
            }}
          >
            <RouteInspector
              selectedNode={selectedNode}
              activeRole={activeRole}
              completedLessons={completedLessons}
              onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
              onToggleLesson={handleToggleLesson}
              onClose={() => setSelectedNodeId(null)}
            />
          </aside>
        )}
      </div>

      {/* ── 6. Visual Graph Legend ────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "0.85rem 1.5rem",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-ink-3)",
            }}
          >
            Legend:
          </span>
          {[
            { color: "var(--color-accent)", label: "Active Role Route" },
            { color: "#059669", label: "Prerequisites" },
            { color: "#d97706", label: "Unlocks Next" },
            { color: "var(--color-border-2)", label: "Other Skills" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span
                style={{
                  width: "14px",
                  height: "3px",
                  backgroundColor: color,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--color-ink-2)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. Capstone Projects Section ──────────────────────── */}
      <CapstoneProjectsSection
        activeRole={activeRole}
        selectedRole={selectedRole}
      />

      {/* ── 8. 11 Career Roles Summary Section ────────────────── */}
      <CareerRoleCards
        selectedRole={selectedRole}
        onSelectRole={(role) => {
          setSelectedRole(role);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        completedLessons={completedLessons}
      />

      {/* ── Bottom Padding ────────────────────────────────────── */}
      <div style={{ height: "6rem" }} />
    </div>
  );
}
