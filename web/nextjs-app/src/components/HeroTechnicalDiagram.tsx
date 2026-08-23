// src/components/HeroTechnicalDiagram.tsx — Animated Technical Schematic Diagram
"use client";

import { useState, useEffect, useMemo } from "react";

interface NodeData {
  id: string;
  layer: number;
  row: number;
  label: string;
  detail: string;
  x: number;
  y: number;
}

interface EdgeData {
  id: string;
  from: NodeData;
  to: NodeData;
  pathD: string;
  hasPulse: boolean;
  pulseDur: string;
  pulseBegin: string;
}

interface FigureData {
  id: string;
  figNumber: string;
  title: string;
  formula: string;
  caption: string;
  layerLabels: [string, string, string, string];
  nodeDetails: string[][]; // 4 layers x 4 rows
}

const FIGURES: FigureData[] = [
  {
    id: "fig-001",
    figNumber: "FIG_001",
    title: "PYTHON EXECUTION PIPELINE",
    formula: "Source → AST → Bytecode → PyVM",
    caption: "Every layer of this diagram is a concept you implement by hand.",
    layerLabels: ["x (Source)", "h₁ (AST)", "h₂ (Bytecode)", "ŷ (PyVM)"],
    nodeDetails: [
      ["tokenize.py", "String Source", "Lexer Stream", "Indent Stack"],
      ["ast.Module", "ast.FunctionDef", "ast.BinOp", "ast.Name"],
      ["LOAD_FAST", "BINARY_ADD", "STORE_NAME", "RETURN_VALUE"],
      ["Frame Eval", "PyObject Dict", "Stack Alloc", "Stdout Stream"],
    ],
  },
  {
    id: "fig-002",
    figNumber: "FIG_002",
    title: "MEMORY MODEL & GC",
    formula: "id(obj) → RefCount → TypePtr → Value",
    caption: "Understand reference counting, memory arenas, and cyclic garbage collection.",
    layerLabels: ["Namespace", "PyObject", "Memory Arena", "GC Cycler"],
    nodeDetails: [
      ["local_var", "global_dict", "closure_cell", "sys.modules"],
      ["ob_refcnt", "ob_type", "tp_methods", "ob_size"],
      ["PyMalloc", "Arena (256KB)", "Pool (4KB)", "Block (64B)"],
      ["Gen 0 Young", "Gen 1 Medium", "Gen 2 Old", "Cycle Breaker"],
    ],
  },
  {
    id: "fig-003",
    figNumber: "FIG_003",
    title: "ASYNC EVENT LOOP",
    formula: "async def → Task → EventLoop → I/O",
    caption: "Master cooperative coroutines, non-blocking selectors, and task scheduling.",
    layerLabels: ["Coroutines", "Task Queue", "Event Loop", "I/O Drivers"],
    nodeDetails: [
      ["coro_1()", "coro_2()", "asyncio.gather", "TaskGroup"],
      ["Ready Queue", "Sleep Heap", "Pending Future", "Callback List"],
      ["epoll / kqueue", "Selector", "Time Slice", "Signal Wake"],
      ["Socket Read", "DB Pool Query", "Disk File I/O", "Worker Thread"],
    ],
  },
];

const LAYER_X = [80, 200, 340, 460];
const ROW_Y = [65, 125, 185, 245];

export function HeroTechnicalDiagram() {
  const [activeFigIndex, setActiveFigIndex] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredNodeInfo, setHoveredNodeInfo] = useState<{ title: string; detail: string; layer: string } | null>(null);

  const activeFigure = FIGURES[activeFigIndex];

  // Auto-switch figures every 12 seconds unless hovered
  useEffect(() => {
    if (hoveredNodeId) return;
    const interval = setInterval(() => {
      setActiveFigIndex((prev) => (prev + 1) % FIGURES.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [hoveredNodeId]);

  // Construct 16 nodes (4x4)
  const nodes = useMemo(() => {
    const list: NodeData[] = [];
    for (let layer = 0; layer < 4; layer++) {
      for (let row = 0; row < 4; row++) {
        const id = `n-${layer}-${row}`;
        const detail = activeFigure.nodeDetails[layer][row];
        list.push({
          id,
          layer,
          row,
          label: `L${layer}R${row}`,
          detail,
          x: LAYER_X[layer],
          y: ROW_Y[row],
        });
      }
    }
    return list;
  }, [activeFigure]);

  // Construct network edges between adjacent layers
  const edges = useMemo(() => {
    const list: EdgeData[] = [];
    let edgeIdx = 0;

    for (let layer = 0; layer < 3; layer++) {
      const fromNodes = nodes.filter((n) => n.layer === layer);
      const toNodes = nodes.filter((n) => n.layer === layer + 1);

      for (let f = 0; f < fromNodes.length; f++) {
        for (let t = 0; t < toNodes.length; t++) {
          const from = fromNodes[f];
          const to = toNodes[t];
          const id = `e-${from.id}-${to.id}`;

          // Bezier curve
          const midX = (from.x + to.x) / 2;
          const pathD = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;

          // Select specific paths to carry travelling light pulses
          const isPulsePath = (f + t + layer) % 3 === 0 || (f === t);
          const pulseDur = `${2.4 + ((edgeIdx % 5) * 0.4)}s`;
          const pulseBegin = `${(edgeIdx % 7) * 0.35}s`;

          list.push({
            id,
            from,
            to,
            pathD,
            hasPulse: isPulsePath,
            pulseDur,
            pulseBegin,
          });
          edgeIdx++;
        }
      }
    }
    return list;
  }, [nodes]);

  const handleNodeMouseEnter = (node: NodeData) => {
    setHoveredNodeId(node.id);
    setHoveredNodeInfo({
      title: node.detail,
      detail: `Layer: ${activeFigure.layerLabels[node.layer]}`,
      layer: activeFigure.layerLabels[node.layer],
    });
  };

  const handleNodeMouseLeave = () => {
    setHoveredNodeId(null);
    setHoveredNodeInfo(null);
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border-2)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
        padding: "1.25rem 1.25rem 1rem",
        overflow: "hidden",
      }}
    >
      {/* ── Schematic Header ───────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--color-accent-text)",
            }}
          >
            {activeFigure.figNumber} · {activeFigure.title}
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-ink-3)",
            letterSpacing: "0.06em",
          }}
        >
          {activeFigure.formula}
        </span>
      </div>

      {/* ── SVG Schematic Canvas ───────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "auto" }}>
        <svg
          viewBox="0 0 540 310"
          width="100%"
          height="auto"
          style={{ display: "block" }}
        >
          <defs>
            {/* Glow filter */}
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--color-accent)" floodOpacity="0.8" />
            </filter>
            <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#38bdf8" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Technical Corner Brackets */}
          {/* Top-Left */}
          <path d="M 8 24 L 8 8 L 24 8" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
          {/* Top-Right */}
          <path d="M 532 24 L 532 8 L 516 8" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
          {/* Bottom-Left */}
          <path d="M 8 286 L 8 302 L 24 302" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
          {/* Bottom-Right */}
          <path d="M 532 286 L 532 302 L 516 302" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />

          {/* ── Connecting Edges ──────────────────────────────── */}
          <g className="schematic-edges">
            {edges.map((edge) => {
              const isConnectedToHovered =
                hoveredNodeId !== null &&
                (edge.from.id === hoveredNodeId || edge.to.id === hoveredNodeId);

              let stroke = "var(--color-border)";
              let strokeWidth = 0.8;
              let opacity = 0.45;

              if (hoveredNodeId) {
                if (isConnectedToHovered) {
                  stroke = "var(--color-accent)";
                  strokeWidth = 1.8;
                  opacity = 1;
                } else {
                  opacity = 0.12;
                }
              } else if (edge.hasPulse) {
                stroke = "var(--color-accent)";
                strokeWidth = 1;
                opacity = 0.6;
              }

              return (
                <g key={edge.id}>
                  <path
                    d={edge.pathD}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                    style={{ transition: "stroke 0.2s, opacity 0.2s" }}
                  />

                  {/* Animated Travelling Particle */}
                  {edge.hasPulse && !hoveredNodeId && (
                    <circle r="2.8" fill="#38bdf8" filter="url(#particle-glow)">
                      <animateMotion
                        path={edge.pathD}
                        dur={edge.pulseDur}
                        begin={edge.pulseBegin}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </g>

          {/* ── Layer Column Labels (Bottom) ──────────────────── */}
          {LAYER_X.map((x, idx) => (
            <text
              key={idx}
              x={x}
              y={290}
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="0.08em"
              fill="var(--color-ink-3)"
              textAnchor="middle"
            >
              {activeFigure.layerLabels[idx].split(" ")[0]}
            </text>
          ))}

          {/* ── Nodes ─────────────────────────────────────────── */}
          <g className="schematic-nodes">
            {nodes.map((node) => {
              const isHovered = hoveredNodeId === node.id;
              const isConnected =
                hoveredNodeId !== null &&
                edges.some(
                  (e) =>
                    (e.from.id === hoveredNodeId && e.to.id === node.id) ||
                    (e.to.id === hoveredNodeId && e.from.id === node.id)
                );

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => handleNodeMouseEnter(node)}
                  onMouseLeave={handleNodeMouseLeave}
                  style={{ cursor: "pointer" }}
                >
                  {/* Node Outer Halo Ring on Hover */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 12 : isConnected ? 9 : 7}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth={isHovered ? 2 : 1}
                    opacity={isHovered ? 1 : isConnected ? 0.7 : 0.3}
                    filter={isHovered ? "url(#node-glow)" : "none"}
                    style={{ transition: "all 0.18s ease-out" }}
                  />

                  {/* Node Inner Core Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 5.5 : 4}
                    fill={
                      isHovered
                        ? "#38bdf8"
                        : isConnected
                        ? "var(--color-accent)"
                        : "var(--color-surface)"
                    }
                    stroke="var(--color-ink)"
                    strokeWidth={1.5}
                    style={{ transition: "all 0.18s ease-out" }}
                  />

                  {/* Micro label for hovered node */}
                  {isHovered && (
                    <g>
                      <rect
                        x={node.x - 45}
                        y={node.y - 32}
                        width="90"
                        height="20"
                        fill="var(--color-ink)"
                        rx="2"
                      />
                      <text
                        x={node.x}
                        y={node.y - 19}
                        fontFamily="var(--font-mono)"
                        fontSize="8.5"
                        fontWeight="700"
                        fill="var(--color-surface)"
                        textAnchor="middle"
                      >
                        {node.detail.length > 13
                          ? node.detail.slice(0, 12) + "…"
                          : node.detail}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* ── Schematic Caption & Carousel Switcher ─────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "var(--color-ink-3)",
            fontStyle: "italic",
            margin: 0,
            textAlign: "center",
          }}
        >
          {hoveredNodeInfo ? (
            <span style={{ color: "var(--color-accent-text)", fontStyle: "normal" }}>
              <strong>{hoveredNodeInfo.title}</strong> — {hoveredNodeInfo.layer}
            </span>
          ) : (
            activeFigure.caption
          )}
        </p>

        {/* Carousel Dots */}
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {FIGURES.map((fig, idx) => (
            <button
              key={fig.id}
              onClick={() => setActiveFigIndex(idx)}
              style={{
                width: "8px",
                height: "8px",
                padding: 0,
                border: "1px solid var(--color-accent)",
                backgroundColor:
                  activeFigIndex === idx
                    ? "var(--color-accent)"
                    : "transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              title={fig.title}
              aria-label={fig.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
