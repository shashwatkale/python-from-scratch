// src/components/HeroPythonEngineAnimation.tsx — Interactive CPython Execution Machine
"use client";

import { useState, useEffect } from "react";

interface ProgramPreset {
  id: string;
  title: string;
  category: string;
  code: string[];
  opcodes: { name: string; arg?: string; desc: string }[];
  stackItems: string[];
  heapObjects: { addr: string; type: string; val: string; refCount: number }[];
  stdout: string[];
}

const PRESETS: ProgramPreset[] = [
  {
    id: "pipeline",
    title: "1. Generator & Comprehension",
    category: "COMPREHENSION PIPELINE",
    code: [
      "def pipeline(stream):",
      "    return [x**2 for x in stream if x % 2 == 0]",
      "",
      "data = [1, 2, 3, 4, 6]",
      "result = pipeline(data)",
      "print(result)",
    ],
    opcodes: [
      { name: "LOAD_FAST", arg: "stream", desc: "Push 'stream' onto eval stack" },
      { name: "GET_ITER", desc: "Obtain PyIterObject for sequence" },
      { name: "FOR_ITER", arg: "x", desc: "Pull next element from iterator" },
      { name: "BINARY_OP", arg: "% 2", desc: "Modulo filter check (x % 2 == 0)" },
      { name: "BINARY_OP", arg: "** 2", desc: "Compute exponential power" },
      { name: "LIST_APPEND", desc: "Append computed item to buffer" },
      { name: "RETURN_VALUE", desc: "Return constructed list to caller" },
    ],
    stackItems: ["[4, 16, 36]", "x = 6", "<iter_pos: 4>", "<frame_root>"],
    heapObjects: [
      { addr: "0x7fff40", type: "list", val: "[4, 16, 36]", refCount: 1 },
      { addr: "0x7fff68", type: "int", val: "36", refCount: 3 },
      { addr: "0x7fff8c", type: "iter", val: "stream_iter", refCount: 1 },
    ],
    stdout: [
      "CPython 3.12.0 bytecode VM initialized.",
      ">> stream = [1, 2, 3, 4, 6]",
      ">> filtered: [2, 4, 6]",
      ">> output: [4, 16, 36]",
    ],
  },
  {
    id: "decorator",
    title: "2. Decorator & Closure Scope",
    category: "CLOSURE EXECUTION",
    code: [
      "@benchmark",
      "def query_database(user_id):",
      "    return db.fetch(user_id)",
      "",
      "res = query_database(42)",
    ],
    opcodes: [
      { name: "LOAD_GLOBAL", arg: "benchmark", desc: "Load wrapper factory function" },
      { name: "LOAD_FAST", arg: "user_id", desc: "Push argument into local frame" },
      { name: "PUSH_NULL", desc: "Prepare callable frame stack" },
      { name: "CALL_FUNCTION", arg: "1", desc: "Invoke closure wrapper" },
      { name: "STORE_FAST", arg: "res", desc: "Assign return value to name" },
      { name: "RETURN_VALUE", desc: "Pop frame & return control" },
    ],
    stackItems: ["{'user_id': 42}", "t0 = 12.4ms", "<closure_cell>", "<frame_eval>"],
    heapObjects: [
      { addr: "0x802a10", type: "function", val: "query_database", refCount: 2 },
      { addr: "0x802a48", type: "cell", val: "db_conn_ptr", refCount: 1 },
      { addr: "0x802a90", type: "dict", val: "{'user_id': 42}", refCount: 1 },
    ],
    stdout: [
      "Initializing closure frame (id: 0x802a10)...",
      ">> wrapper invoked: @benchmark",
      ">> query_database(user_id=42) elapsed: 1.2ms",
      ">> res = {'status': 200, 'id': 42}",
    ],
  },
  {
    id: "async-loop",
    title: "3. Async Coroutine & Event Loop",
    category: "ASYNCIO TASK SCHEDULER",
    code: [
      "async def fetch_task(url):",
      "    await asyncio.sleep(0.05)",
      "    return f'payload_{url}'",
      "",
      "await asyncio.gather(t1, t2)",
    ],
    opcodes: [
      { name: "GET_AWAITABLE", desc: "Extract awaitable coroutine object" },
      { name: "SEND", arg: "None", desc: "Send value to coroutine / yield" },
      { name: "YIELD_VALUE", desc: "Suspend frame & yield to event loop" },
      { name: "RESUME", desc: "Event loop wakes suspended task" },
      { name: "RETURN_VALUE", desc: "Resolve task future with result" },
    ],
    stackItems: ["TaskGroup(2)", "<coro: suspended>", "<loop_selector>", "<future_ready>"],
    heapObjects: [
      { addr: "0x910020", type: "coroutine", val: "fetch_task", refCount: 1 },
      { addr: "0x910060", type: "task", val: "Task-1 (READY)", refCount: 2 },
      { addr: "0x9100a0", type: "event_loop", val: "epoll_selector", refCount: 1 },
    ],
    stdout: [
      "Event loop initialized: asyncio.DefaultEventLoop",
      ">> schedule: fetch_task('api/users')",
      ">> yield to selector: non-blocking sleep (50ms)",
      ">> task resolved: 'payload_api/users' [OK]",
    ],
  },
];

export function HeroPythonEngineAnimation() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentPreset = PRESETS[presetIndex];

  // Advance step loop
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentPreset.opcodes.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, currentPreset]);

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % currentPreset.opcodes.length);
  };

  const handleSelectPreset = (idx: number) => {
    setPresetIndex(idx);
    setActiveStep(0);
  };

  const currentOpcode = currentPreset.opcodes[activeStep] || currentPreset.opcodes[0];

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border-2)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      {/* ── Schematic Header ───────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface-2)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: isPlaying ? "#10b981" : "#d97706",
              boxShadow: isPlaying ? "0 0 8px #10b981" : "none",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--color-ink)",
              textTransform: "uppercase",
            }}
          >
            FIG_001 · CPYTHON RUNTIME ENGINE
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: 600,
              padding: "0.15rem 0.45rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-accent-text)",
              textTransform: "uppercase",
            }}
          >
            STEP {activeStep + 1}/{currentPreset.opcodes.length}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              color: "var(--color-ink-3)",
            }}
          >
            {currentPreset.category}
          </span>
        </div>
      </div>

      {/* ── 2-Column Execution Grid ────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          borderBottom: "1px solid var(--color-border)",
        }}
        className="engine-grid"
      >
        {/* Left: Source Code Buffer */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderRight: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.6rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-3)",
                }}
              >
                Source Buffer
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "var(--color-accent-text)",
                }}
              >
                UTF-8
              </span>
            </div>

            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-ink)",
                lineHeight: 1.6,
                margin: 0,
                overflowX: "auto",
              }}
            >
              {currentPreset.code.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor:
                      idx === 1
                        ? "var(--color-accent-soft)"
                        : "transparent",
                    borderLeft:
                      idx === 1
                        ? "2px solid var(--color-accent)"
                        : "2px solid transparent",
                    paddingLeft: "0.4rem",
                    transition: "background-color 0.2s",
                  }}
                >
                  <span style={{ color: "var(--color-ink-3)", marginRight: "0.5rem", userSelect: "none" }}>
                    {idx + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </pre>
          </div>

          {/* Active Opcode Inspection Callout */}
          <div
            style={{
              marginTop: "1rem",
              padding: "0.6rem 0.75rem",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "var(--color-accent-text)",
                }}
              >
                ⚡ {currentOpcode.name} {currentOpcode.arg ? `(${currentOpcode.arg})` : ""}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                color: "var(--color-ink-2)",
                margin: "0.2rem 0 0",
              }}
            >
              {currentOpcode.desc}
            </p>
          </div>
        </div>

        {/* Right: Bytecode Stream & Memory Matrix */}
        <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--color-surface)" }}>
          {/* Opcode Instruction Stack */}
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              PyEval Instruction Stack (Opcodes)
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {currentPreset.opcodes.map((op, i) => {
                const isActive = i === activeStep;
                const isPassed = i < activeStep;

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.25rem 0.6rem",
                      backgroundColor: isActive
                        ? "var(--color-accent)"
                        : isPassed
                        ? "var(--color-surface-2)"
                        : "transparent",
                      border: "1px solid",
                      borderColor: isActive
                        ? "var(--color-accent)"
                        : "var(--color-border)",
                      color: isActive ? "#fff" : "var(--color-ink)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                      }}
                    >
                      {i.toString().padStart(2, "0")} {op.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.58rem",
                        color: isActive ? "#dbeafe" : "var(--color-ink-3)",
                      }}
                    >
                      {op.arg || "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Memory Heap Pointer Table */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-3)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Heap Memory & Reference Counts
            </span>

            <div
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-surface-2)",
              }}
            >
              {currentPreset.heapObjects.map((obj, idx) => (
                <div
                  key={obj.addr}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "70px 60px 1fr 35px",
                    gap: "0.4rem",
                    padding: "0.25rem 0.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    borderBottom:
                      idx < currentPreset.heapObjects.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--color-accent-text)" }}>{obj.addr}</span>
                  <span style={{ color: "var(--color-ink-3)" }}>&lt;{obj.type}&gt;</span>
                  <span style={{ color: "var(--color-ink)", fontWeight: 600 }}>{obj.val}</span>
                  <span style={{ color: "var(--color-ink-3)", textAlign: "right" }}>rc:{obj.refCount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── REPL Output Stream Terminal ───────────────────────── */}
      <div
        style={{
          padding: "0.65rem 1.25rem",
          backgroundColor: "var(--color-surface-2)",
          borderBottom: "1px solid var(--color-border)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--color-ink-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "var(--color-accent-text)", fontWeight: 700 }}>&gt;&gt;</span>
          <span>{currentPreset.stdout[Math.min(activeStep, currentPreset.stdout.length - 1)]}</span>
        </div>
        <span style={{ color: "var(--color-ink-3)", fontSize: "0.55rem" }}>STDOUT 0</span>
      </div>

      {/* ── Preset Tabs & Animation Controls ───────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.65rem 1.25rem",
          backgroundColor: "var(--color-surface)",
          flexWrap: "wrap",
          gap: "0.6rem",
        }}
      >
        {/* Preset Selector Buttons */}
        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
          {PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(idx)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                fontWeight: presetIndex === idx ? 700 : 500,
                padding: "0.25rem 0.55rem",
                border: "1px solid",
                borderColor:
                  presetIndex === idx
                    ? "var(--color-accent)"
                    : "var(--color-border)",
                backgroundColor:
                  presetIndex === idx
                    ? "var(--color-accent-soft)"
                    : "transparent",
                color:
                  presetIndex === idx
                    ? "var(--color-accent-text)"
                    : "var(--color-ink-2)",
                cursor: "pointer",
                transition: "all 0.12s",
              }}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Playback Controls */}
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 600,
              padding: "0.25rem 0.6rem",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-ink)",
              cursor: "pointer",
            }}
          >
            {isPlaying ? "⏸ PAUSE" : "► RUN"}
          </button>
          <button
            onClick={handleNextStep}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              fontWeight: 600,
              padding: "0.25rem 0.6rem",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-ink)",
              cursor: "pointer",
            }}
          >
            STEP ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
