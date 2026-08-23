// src/components/roadmap/RoadmapControls.tsx
"use client";

import { useState } from "react";
import { ROADMAP_STAGES, searchRoadmapSkills } from "@/data/roadmap";
import type { RoadmapNode } from "@/types";

interface Props {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onJumpToStage: (stageId: string) => void;
  onSelectNode: (nodeId: string) => void;
}

export function RoadmapControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onJumpToStage,
  onSelectNode,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RoadmapNode[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim().length > 1) {
      setSearchResults(searchRoadmapSkills(q).slice(0, 6));
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSelectSkill = (nodeId: string) => {
    onSelectNode(nodeId);
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.85rem 1.5rem",
        backgroundColor: "var(--color-surface-2)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* ── Stage Jump Pills ───────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink-3)",
            marginRight: "0.3rem",
          }}
        >
          Jump Zone:
        </span>
        {ROADMAP_STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => onJumpToStage(stage.id)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "0.25rem 0.6rem",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
            }}
          >
            {stage.title}
          </button>
        ))}
      </div>

      {/* ── Search & Zoom Controls ─────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Search Skill Dropdown */}
        <div style={{ position: "relative", minWidth: "220px" }}>
          <input
            type="text"
            placeholder="Find skill / topic..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim().length > 1) setIsSearching(true);
            }}
            style={{
              width: "100%",
              padding: "0.35rem 0.65rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border)",
              outline: "none",
            }}
          />

          {isSearching && searchResults.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border-2)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                zIndex: 80,
                maxHeight: "240px",
                overflowY: "auto",
              }}
            >
              {searchResults.map((res) => (
                <button
                  key={res.id}
                  onClick={() => handleSelectSkill(res.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem 0.75rem",
                    borderBottom: "1px solid var(--color-border)",
                    backgroundColor: "transparent",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="hover:bg-surface-2"
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--color-ink)",
                        margin: 0,
                      }}
                    >
                      {res.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.65rem",
                        color: "var(--color-ink-3)",
                        margin: 0,
                      }}
                    >
                      {res.subtitle}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      textTransform: "uppercase",
                      color: "var(--color-accent-text)",
                    }}
                  >
                    Jump →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <button
            onClick={onZoomOut}
            disabled={zoom <= 0.6}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.6rem",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border)",
              cursor: zoom <= 0.6 ? "not-allowed" : "pointer",
              opacity: zoom <= 0.6 ? 0.4 : 1,
            }}
            title="Zoom Out"
          >
            −
          </button>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-ink-3)",
              minWidth: "42px",
              textAlign: "center",
            }}
          >
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            disabled={zoom >= 1.5}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.6rem",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border)",
              cursor: zoom >= 1.5 ? "not-allowed" : "pointer",
              opacity: zoom >= 1.5 ? 0.4 : 1,
            }}
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={onResetZoom}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "0.25rem 0.6rem",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink-3)",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

