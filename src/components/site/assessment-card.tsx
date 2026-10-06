import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "untested" | "running" | "verified";
type RowStatus = "idle" | "checking" | "pass" | "high" | "fixed" | "low";

const ROWS = [
  { name: "Authentication", detail: "login, password reset, MFA", result: "pass" as RowStatus },
  { name: "Access control", detail: "can user A see user B's data?", result: "high" as RowStatus },
  { name: "APIs", detail: "14 endpoints", result: "pass" as RowStatus },
  { name: "Cloud config", detail: "AWS account", result: "low" as RowStatus },
  { name: "Secrets", detail: "repository history", result: "pass" as RowStatus },
  { name: "AI features", detail: "prompt injection, data leakage", result: "pass" as RowStatus },
];
const FINAL: RowStatus[] = ROWS.map((r) => (r.result === "high" ? "fixed" : r.result));

const SEGMENTS = 9;
const CORD = 70;
const SEG = CORD / SEGMENTS;
const STAGE_H = 300;

type Pt = { x: number; y: number; px: number; py: number };

function StatusLabel({ s }: { s: RowStatus }) {
  switch (s) {
    case "checking":
      return (
        <span className="text-muted-foreground">
          checking…<span className="animate-caret">▍</span>
        </span>
      );
    case "pass":
      return <span className="text-teal">PASS</span>;
    case "high":
      return <span className="text-amber">1 HIGH</span>;
    case "fixed":
      return <span className="text-teal">FIXED ✓</span>;
    case "low":
      return <span className="text-muted-foreground">2 LOW · noted</span>;
    default:
      return <span className="text-muted-foreground">—</span>;
  }
}

export function AssessmentCard() {
  // SSR / no-JS: final verified state, tag hidden.
  const [hydrated, setHydrated] = useState(false);
  const [phase, setPhase] = useState<Phase>("verified");
  const [rows, setRows] = useState<RowStatus[]>(FINAL);
  const [finding, setFinding] = useState(2); // 0 none, 1 first line, 2 both
  const [tagState, setTagState] = useState<"hanging" | "falling" | "gone">("gone");
  const [reduced, setReduced] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRef = useRef<HTMLButtonElement>(null);
  const pts = useRef<Pt[]>([]);
  const attached = useRef(true);
  const drag = useRef<{ active: boolean; x: number; y: number; moved: number }>({ active: false, x: 0, y: 0, moved: 0 });
  const mouse = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const timers = useRef<number[]>([]);
  const scale = useRef(1);
  const tagStateRef = useRef(tagState);
  tagStateRef.current = tagState;

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

  const pinX = () => (stageRef.current?.clientWidth ?? 420) * 0.58;

  const hang = useCallback((swing: boolean) => {
    const x0 = pinX();
    const angle = swing ? 0.55 : 0;
    const arr: Pt[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const x = x0 + Math.sin(angle) * SEG * i;
      const y = Math.cos(angle) * SEG * i - (swing ? 40 : 0);
      arr.push({ x, y, px: x, py: y });
    }
    pts.current = arr;
    attached.current = true;
  }, []);

  // hydrate → interactive initial state
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    scale.current = window.innerWidth < 640 ? 0.8 : 1;
    setPhase("untested");
    setRows(ROWS.map(() => "idle"));
    setFinding(0);
    hang(!mq.matches);
    setTagState("hanging");
    setHydrated(true);
    return clearTimers;
  }, [hang]);

  const runChecks = useCallback(() => {
    setPhase("running");
    let t = 300;
    ROWS.forEach((r, i) => {
      later(t, () => setRows((p) => p.map((s, j) => (j === i ? "checking" : s))));
      t += 400;
      later(t, () => setRows((p) => p.map((s, j) => (j === i ? r.result : s))));
      if (r.result === "high") {
        later(t, () => setFinding(1));
        t += 900;
        later(t, () => {
          setFinding(2);
          setRows((p) => p.map((s, j) => (j === i ? "fixed" : s)));
        });
        t += 300;
      }
    });
    later(t + 200, () => setPhase("verified"));
  }, []);

  const pull = useCallback(() => {
    if (phase !== "untested" || tagStateRef.current !== "hanging") return;
    if (reduced) {
      setTagState("gone");
      setRows(FINAL);
      setFinding(2);
      setPhase("verified");
      return;
    }
    attached.current = false;
    const last = pts.current[SEGMENTS];
    if (last) last.px = last.x - 3;
    setTagState("falling");
    runChecks();
  }, [phase, reduced, runChecks]);

  const rehang = () => {
    clearTimers();
    setRows(ROWS.map(() => "idle"));
    setFinding(0);
    setPhase("untested");
    hang(!reduced);
    setTagState("hanging");
  };

  // physics loop
  useEffect(() => {
    if (!hydrated || reduced || tagState === "gone") return;
    let raf = 0;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const step = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const w = stage.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(STAGE_H * dpr);
      }
      const p = pts.current;
      const g = attached.current ? 0.35 : 0.6;
      for (let i = 0; i < p.length; i++) {
        const pt = p[i]!;
        const vx = (pt.x - pt.px) * 0.985;
        const vy = (pt.y - pt.py) * 0.985;
        pt.px = pt.x;
        pt.py = pt.y;
        pt.x += vx;
        pt.y += vy + g;
      }
      // mouse breeze
      const m = mouse.current;
      if (m && attached.current && !drag.current.active) {
        const last = p[SEGMENTS]!;
        const d = Math.hypot(m.x - last.x, m.y - (last.y + 90 * scale.current));
        if (d < 120) last.x += Math.max(-1.5, Math.min(1.5, m.vx * 0.08));
        m.vx *= 0.8;
      }
      if (drag.current.active) {
        const last = p[SEGMENTS]!;
        last.x = drag.current.x;
        last.y = drag.current.y;
      }
      for (let k = 0; k < 14; k++) {
        if (attached.current) {
          p[0]!.x = pinX();
          p[0]!.y = 0;
        }
        for (let i = 0; i < SEGMENTS; i++) {
          const a = p[i]!, b = p[i + 1]!;
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - SEG) / dist / 2;
          const fixA = attached.current && i === 0;
          const fixB = drag.current.active && i + 1 === SEGMENTS;
          if (fixA && !fixB) { b.x -= dx * diff * 2; b.y -= dy * diff * 2; }
          else if (fixB && !fixA) { a.x += dx * diff * 2; a.y += dy * diff * 2; }
          else if (!fixA && !fixB) { a.x += dx * diff; a.y += dy * diff; b.x -= dx * diff; b.y -= dy * diff; }
        }
      }
      // detach when overstretched
      if (attached.current && drag.current.active) {
        const last = p[SEGMENTS]!;
        if (Math.hypot(last.x - pinX(), last.y) > CORD + 60) {
          drag.current.active = false;
          pull();
        }
      }
      // draw cord
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, STAGE_H);
      ctx.strokeStyle = getComputedStyle(stage).getPropertyValue("--cord").trim() || "#9BA6B5";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(p[0]!.x, p[0]!.y);
      for (let i = 1; i < p.length; i++) ctx.lineTo(p[i]!.x, p[i]!.y);
      ctx.stroke();
      // tag transform
      const last = p[SEGMENTS]!, prev = p[SEGMENTS - 1]!;
      const ang = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;
      const spin = attached.current ? 0 : (last.y - 0) * 0.004;
      if (tagRef.current) {
        tagRef.current.style.transform = `translate(${last.x - 22}px, ${last.y - 6}px) rotate(${ang + spin}rad) scale(${scale.current})`;
      }
      if (!attached.current && last.y > STAGE_H + 900) {
        setTagState("gone");
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hydrated, reduced, tagState, pull]);

  const local = (e: { clientX: number; clientY: number }) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const verified = phase === "verified";
  const showTag = hydrated && tagState !== "gone";

  return (
    <div className="relative mx-auto w-full max-w-[420px] overflow-visible font-mono lg:mx-0 lg:ml-auto">
      <div className="rounded-lg border border-border bg-card text-xs">
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <span className="truncate text-muted-foreground">ASSESSMENT · example-app.com</span>
          <div className="flex shrink-0 items-center gap-2">
            {hydrated && (
              <button
                type="button"
                onClick={verified ? rehang : pull}
                disabled={phase === "running"}
                className="rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-teal hover:text-teal focus-visible:outline-2 focus-visible:outline-teal disabled:opacity-40"
              >
                {verified ? "Re-hang tag" : "Pull tag"}
              </button>
            )}
            <span
              className={`rounded-full border px-2 py-0.5 text-[11px] ${
                verified ? "border-teal/40 text-teal" : "border-[color:var(--tag-red)]/40 text-[color:var(--tag-red)]"
              }`}
              aria-live="polite"
            >
              ● {verified ? "VERIFIED" : "UNTESTED"}
            </span>
          </div>
        </div>
        <ul>
          {ROWS.map((r, i) => (
            <li key={r.name} className="border-b border-border px-4 py-2.5 last:border-b-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-foreground">{r.name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{r.detail}</p>
                </div>
                <span className="shrink-0 pt-0.5 text-[11px]">
                  <StatusLabel s={rows[i]!} />
                </span>
              </div>
              {r.result === "high" && (
                <div
                  className="grid text-[11px] text-muted-foreground transition-[grid-template-rows] duration-500"
                  style={{ gridTemplateRows: finding > 0 ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="mt-1.5">User A could read User B's invoices by changing the ID.</p>
                    <p className={`mt-0.5 transition-opacity duration-300 ${finding > 1 ? "opacity-100" : "opacity-0"}`}>
                      Fix guidance sent → retested
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex min-h-11 items-center justify-between gap-2 border-t border-border px-4 py-2">
          <span className="truncate text-[10px] text-muted-foreground">Example engagement · details changed</span>
          <span
            className={`-rotate-2 shrink-0 whitespace-nowrap rounded-sm border border-teal px-1.5 py-0.5 text-[10px] text-teal transition-opacity duration-500 ${
              verified ? "opacity-100" : "opacity-0"
            }`}
          >
            RETEST PASSED · CH-2026-014
          </span>
        </div>
      </div>

      {/* Tag stage */}
      <div
        ref={stageRef}
        className="relative h-[220px] sm:h-[300px] lg:absolute lg:inset-x-0 lg:top-full [--cord:#9BA6B5]"
        onPointerMove={(e) => {
          const p = local(e);
          const prev = mouse.current;
          mouse.current = { x: p.x, y: p.y, vx: prev ? p.x - prev.x : 0, vy: prev ? p.y - prev.y : 0 };
          if (drag.current.active) {
            drag.current.moved += Math.hypot(p.x - drag.current.x, p.y - drag.current.y);
            drag.current.x = p.x;
            drag.current.y = p.y;
          }
        }}
        onPointerLeave={() => (mouse.current = null)}
        style={{ visibility: showTag ? "visible" : "hidden" }}
      >
        {!reduced && <canvas ref={canvasRef} className="pointer-events-none absolute inset-x-0 top-0 h-[300px] w-full" />}
        {/* pin */}
        <span
          className="absolute -top-1.5 h-3 w-3 rounded-full border-2 border-[color:var(--metal-dark)] bg-[color:var(--metal)]"
          style={{ left: "calc(58% - 6px)" }}
          aria-hidden="true"
        />
        {reduced && showTag && (
          <span className="absolute top-0 h-[70px] w-px bg-[color:var(--cord)]" style={{ left: "58%" }} aria-hidden="true" />
        )}
        {showTag && (
          <button
            ref={tagRef}
            type="button"
            aria-label="Untested tag. Activate to pull it and run the example assessment."
            onClick={() => {
              if (drag.current.moved < 6) pull();
            }}
            onPointerDown={(e) => {
              if (reduced || !attached.current) return;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              const p = local(e);
              drag.current = { active: true, x: p.x, y: p.y, moved: 0 };
            }}
            onPointerMove={(e) => {
              if (!drag.current.active) return;
              const p = local(e);
              drag.current.moved += Math.hypot(p.x - drag.current.x, p.y - drag.current.y);
              drag.current.x = p.x;
              drag.current.y = p.y;
            }}
            onPointerUp={() => (drag.current.active = false)}
            className={`absolute top-0 left-0 h-[200px] w-[44px] origin-[22px_6px] touch-none cursor-grab rounded-[4px] bg-[color:var(--tag-red)] shadow-[0_10px_18px_-6px_rgb(0_0_0/0.55)] transition-opacity duration-500 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:cursor-grabbing ${
              tagState === "hanging" ? "opacity-100" : ""
            }`}
            style={
              reduced
                ? { transform: `translate(calc(${pinX()}px - 22px), 64px) scale(${scale.current})` }
                : { transform: "translate(-999px,-999px)" }
            }
          >
            <span className="pointer-events-none absolute inset-1 rounded-[2px] border border-dashed border-white/80" />
            <span className="pointer-events-none absolute top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-[color:var(--metal)] bg-background" />
            <span className="pointer-events-none absolute inset-x-0 top-9 bottom-3 flex items-center justify-center">
              <span
                className="pointer-events-none block whitespace-nowrap font-sans text-[15px] font-bold uppercase leading-none tracking-[0.1em] text-white"
                style={{ writingMode: "vertical-rl", transform: "scaleY(0.78)", transformOrigin: "center" }}
              >
                UNTESTED · DO NOT DEPLOY
              </span>
            </span>
          </button>
        )}
        {showTag && tagState === "hanging" && (
          <div
            className="pointer-events-none absolute bottom-3 flex items-end gap-1 text-[11px] text-muted-foreground sm:bottom-6"
            style={{ right: "calc(42% + 34px)" }}
            aria-hidden="true"
          >
            <span>Pull the tag</span>
            <svg width="38" height="30" viewBox="0 0 38 30" fill="none" className="mb-2">
              <path d="M2 26 C 12 28, 26 22, 32 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M27 9 L32 5 L34 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
