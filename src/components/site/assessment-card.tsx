import { useCallback, useEffect, useRef, useState } from "react";

type Tone = "pass" | "accent" | "muted";
type RowState = { state: "idle" | "checking" | "done"; text?: string; tone?: Tone };

const ROWS = [
  { name: "Authentication", detail: "login, password reset, MFA" },
  { name: "Access control", detail: "can user A see user B's data?" },
  { name: "APIs", detail: "14 endpoints" },
  { name: "Cloud config", detail: "AWS account" },
  { name: "Secrets", detail: "repository history" },
  { name: "AI features", detail: "prompt injection, data leakage" },
];

const RESULTS: { text: string; tone: Tone }[] = [
  { text: "PASS", tone: "pass" },
  { text: "FIXED ✓", tone: "pass" },
  { text: "PASS", tone: "pass" },
  { text: "2 LOW · noted", tone: "muted" },
  { text: "PASS", tone: "pass" },
  { text: "PASS", tone: "pass" },
];

const FINAL: RowState[] = RESULTS.map((r) => ({ state: "done", ...r }));
const IDLE: RowState[] = ROWS.map(() => ({ state: "idle" }));

const TONE: Record<Tone, string> = {
  pass: "text-success",
  accent: "text-amber",
  muted: "text-muted-foreground",
};

// Rope / tag geometry (unscaled)
const SEG = 9;
const CORD = 70;
const TAG_W = 44;
const TAG_H = 180;
const GROMMET_Y = 10;
const PIN_Y = 8;

type Pt = { x: number; y: number; px: number; py: number };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function AssessmentCard() {
  const [hydrated, setHydrated] = useState(false);
  const [rows, setRows] = useState<RowState[]>(FINAL);
  const [detail, setDetail] = useState(2);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("done");
  const [tagVisible, setTagVisible] = useState(false);
  const [tagFading, setTagFading] = useState(false);
  const [scale, setScale] = useState(1);
  const [reduced, setReduced] = useState(false);

  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const runId = useRef(0);
  const sim = useRef({
    pts: [] as Pt[],
    anchored: true,
    dragging: false,
    pointer: { x: -999, y: -999, inside: false },
    down: { x: 0, y: 0, moved: false },
    spin: 0,
    angle: 0,
    width: 420,
    visible: true,
    active: false,
  });

  const s = scale;
  const segLen = (CORD * s) / SEG;
  const layerH = PIN_Y + CORD * s + TAG_H * s + 56;
  const pinX = () => sim.current.width * 0.6;

  // ---------- assessment sequence ----------
  const runChecks = useCallback(async (instant: boolean) => {
    const id = ++runId.current;
    if (instant) {
      setRows(FINAL);
      setDetail(2);
      setPhase("done");
      return;
    }
    setPhase("running");
    const alive = () => runId.current === id;
    for (let i = 0; i < ROWS.length; i++) {
      setRows((r) => r.map((x, k) => (k === i ? { state: "checking" } : x)));
      await sleep(400);
      if (!alive()) return;
      if (i === 1) {
        setRows((r) => r.map((x, k) => (k === i ? { state: "done", text: "1 HIGH", tone: "accent" } : x)));
        setDetail(1);
        await sleep(1100);
        if (!alive()) return;
        setDetail(2);
        await sleep(700);
        if (!alive()) return;
      }
      setRows((r) => r.map((x, k) => (k === i ? { state: "done", ...RESULTS[i] } : x)));
    }
    setPhase("done");
  }, []);

  // ---------- rope ----------
  const hang = useCallback(
    (dropIn: boolean) => {
      const px = pinX();
      const st = sim.current;
      st.pts = Array.from({ length: SEG + 1 }, (_, i) => {
        const x = px + i * segLen * (dropIn ? 0.9 : 0.35);
        const y = PIN_Y + i * segLen * (dropIn ? -0.2 : 0.93);
        return { x, y, px: x, py: y };
      });
      st.anchored = true;
      st.dragging = false;
      st.spin = 0;
      st.angle = 0;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [segLen],
  );

  const pull = useCallback(() => {
    const st = sim.current;
    if (!st.anchored || phase === "running") return;
    if (reduced) {
      setTagFading(true);
      setTimeout(() => setTagVisible(false), 300);
      runChecks(true);
      return;
    }
    st.anchored = false;
    st.dragging = false;
    st.spin = (Math.random() > 0.5 ? 1 : -1) * 0.04;
    const last = st.pts[SEG];
    if (last) last.py = last.y + 2;
    runChecks(false);
  }, [phase, reduced, runChecks]);

  const rehang = useCallback(() => {
    runId.current++;
    setRows(IDLE);
    setDetail(0);
    setPhase("idle");
    setTagFading(false);
    hang(!reduced);
    setTagVisible(true);
  }, [hang, reduced]);

  // initial mount: reset to interactive state
  useEffect(() => {
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqM = window.matchMedia("(max-width: 1023px)");
    setReduced(mqR.matches);
    setScale(mqM.matches ? 0.8 : 1);
    const onM = () => setScale(mqM.matches ? 0.8 : 1);
    mqM.addEventListener("change", onM);
    setRows(IDLE);
    setDetail(0);
    setPhase("idle");
    setTagVisible(true);
    setHydrated(true);
    return () => mqM.removeEventListener("change", onM);
  }, []);

  // size tracking
  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const old = sim.current.width;
      sim.current.width = w;
      const dx = w * 0.6 - old * 0.6;
      sim.current.pts.forEach((p) => {
        p.x += dx;
        p.px += dx;
      });
      const c = canvasRef.current;
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        c.width = w * dpr;
        c.height = layerH * dpr;
        c.style.width = `${w}px`;
        c.style.height = `${layerH}px`;
      }
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => (sim.current.visible = e.isIntersecting));
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [layerH, hydrated]);

  // physics loop
  useEffect(() => {
    if (!hydrated || !tagVisible) return;
    const st = sim.current;
    if (!st.pts.length || st.pts.length !== SEG + 1) hang(false);
    if (!reduced) {
      // gentle initial swing
      const last = st.pts[SEG];
      if (st.anchored && Math.abs(last.x - pinX()) < 30 && st.pts[1].y > PIN_Y) last.px -= 3;
    }
    let raf = 0;
    const g = 0.35;

    const step = () => {
      const pts = st.pts;
      const pin = { x: pinX(), y: PIN_Y };
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i === 0 && st.anchored) {
          p.x = p.px = pin.x;
          p.y = p.py = pin.y;
          continue;
        }
        if (i === SEG && st.dragging) {
          p.px = p.x;
          p.py = p.y;
          p.x += (st.pointer.x - p.x) * 0.5;
          p.y += (st.pointer.y - p.y) * 0.5;
          continue;
        }
        const vx = (p.x - p.px) * 0.985;
        const vy = (p.y - p.py) * 0.985;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + g;
        if (st.anchored && !st.dragging && st.pointer.inside) {
          const dx = p.x - st.pointer.x;
          const dy = p.y - st.pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 50 && d > 0.1) p.x += (dx / d) * 0.25;
        }
      }
      for (let k = 0; k < 14; k++) {
        for (let i = 0; i < SEG; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.001;
          const diff = (d - segLen) / d;
          const fixA = i === 0 && st.anchored;
          const fixB = i + 1 === SEG && st.dragging;
          if (fixA && fixB) continue;
          const wa = fixA ? 0 : fixB ? 1 : i + 1 === SEG ? 0.8 : 0.5;
          const wb = 1 - wa;
          a.x += dx * diff * wa;
          a.y += dy * diff * wa;
          b.x -= dx * diff * wb;
          b.y -= dy * diff * wb;
        }
      }
      if (st.dragging && st.anchored) {
        const d = Math.hypot(st.pointer.x - pin.x, st.pointer.y - pin.y);
        if (d > CORD * s + 60) pull();
      }
      const a = pts[SEG - 1];
      const b = pts[SEG];
      if (st.anchored) st.angle = -Math.atan2(b.x - a.x, b.y - a.y) * 0.9;
      else st.angle += st.spin;
    };

    const draw = () => {
      const c = canvasRef.current;
      const tag = tagRef.current;
      const pts = st.pts;
      if (c) {
        const ctx = c.getContext("2d");
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, c.width, c.height);
          const metal = getComputedStyle(c).getPropertyValue("--metal").trim() || "#9A9C92";
          ctx.strokeStyle = metal;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
          ctx.fillStyle = metal;
          ctx.beginPath();
          ctx.arc(pinX(), PIN_Y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (tag) {
        const end = pts[SEG];
        tag.style.transform = `translate(${end.x - (TAG_W * s) / 2}px, ${end.y - GROMMET_Y * s}px) rotate(${st.angle}rad)`;
      }
      if (!st.anchored && pts[SEG].y > layerH + window.innerHeight) {
        setTagVisible(false);
        return false;
      }
      return true;
    };

    const loop = () => {
      if (st.visible) {
        if (!reduced || !st.anchored) step();
        if (!draw()) return;
      }
      raf = requestAnimationFrame(loop);
    };
    if (reduced) {
      // static hang
      hang(false);
      st.pts.forEach((p, i) => {
        p.x = p.px = pinX();
        p.y = p.py = PIN_Y + i * segLen;
      });
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const toLocal = (e: PointerEvent) => {
      const r = layerRef.current?.getBoundingClientRect();
      if (!r) return;
      st.pointer.x = e.clientX - r.left;
      st.pointer.y = e.clientY - r.top;
      st.pointer.inside = st.pointer.y > -40 && st.pointer.y < layerH && st.pointer.x > 0 && st.pointer.x < r.width;
      if (Math.hypot(st.pointer.x - st.down.x, st.pointer.y - st.down.y) > 6) st.down.moved = true;
    };
    const onUp = () => {
      if (!st.dragging) return;
      st.dragging = false;
      if (!st.down.moved) pull();
    };
    window.addEventListener("pointermove", toLocal, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", toLocal);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, tagVisible, reduced, s, pull]);

  const onTagDown = (e: React.PointerEvent) => {
    const st = sim.current;
    if (!st.anchored) return;
    const r = layerRef.current?.getBoundingClientRect();
    if (!r) return;
    st.pointer.x = e.clientX - r.left;
    st.pointer.y = e.clientY - r.top;
    st.down = { x: st.pointer.x, y: st.pointer.y, moved: false };
    if (reduced || e.pointerType === "touch") {
      // simple tap-to-pull on touch / reduced motion
      st.dragging = !reduced && e.pointerType !== "touch" ? true : false;
      if (!st.dragging) {
        e.preventDefault();
        pull();
      }
      return;
    }
    st.dragging = true;
    e.preventDefault();
  };

  const pulled = !tagVisible || !sim.current.anchored || phase !== "idle";
  const verified = phase === "done";

  return (
    <div className="w-full font-mono lg:max-w-[420px]">
      <div className="rounded-md border border-border bg-surface text-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-xs">
          <span className="truncate text-muted-foreground">ASSESSMENT · example-app.com</span>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] ${
              verified ? "border-success/40 text-success" : "border-tag/50 text-tag"
            }`}
          >
            ● {verified ? "VERIFIED" : "UNTESTED"}
          </span>
        </div>
        <div className="flex justify-end px-4 pt-2">
          <button
            type="button"
            disabled={!hydrated || phase === "running"}
            onClick={() => (phase === "idle" ? pull() : rehang())}
            className="text-xs text-amber underline-offset-4 hover:underline disabled:opacity-40"
          >
            {phase === "idle" ? "Pull tag" : "Re-hang tag"}
          </button>
        </div>
        <ul className="px-4 pb-2">
          {ROWS.map((row, i) => {
            const st = rows[i];
            return (
              <li key={row.name} className="border-b border-border/70 py-2.5 last:border-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-foreground">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.detail}</p>
                  </div>
                  <span
                    className={`shrink-0 pt-0.5 text-xs ${
                      st.state === "done" && st.tone ? TONE[st.tone] : "text-muted-foreground"
                    } ${st.state === "checking" ? "animate-pulse" : ""}`}
                  >
                    {st.state === "idle" ? "—" : st.state === "checking" ? "checking…" : st.text}
                  </span>
                </div>
                {i === 1 && (
                  <div className="mt-1 h-[3.25rem] text-xs" aria-live="polite">
                    <p className={`text-amber transition-all duration-300 ${detail >= 1 ? "opacity-100" : "-translate-y-1 opacity-0"}`}>
                      User A could read User B's invoices by changing the ID.
                    </p>
                    <p className={`mt-1 text-success transition-all duration-300 ${detail >= 2 ? "opacity-100" : "-translate-y-1 opacity-0"}`}>
                      Fix guidance sent → retested
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
          <span className="text-[10px] text-muted-foreground">Example engagement · details changed</span>
          <span
            className={`shrink-0 -rotate-2 rounded-sm border-2 border-success px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-success transition-opacity duration-500 ${
              verified ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!verified}
          >
            RETEST PASSED · CH-2026-014
          </span>
        </div>
      </div>

      {/* Physics layer: reserves its height so nothing shifts */}
      <div ref={layerRef} className="relative -mt-2" style={{ height: layerH }} aria-hidden={!tagVisible}>
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
        {hydrated && tagVisible && (
          <div
            ref={tagRef}
            role="button"
            tabIndex={0}
            aria-label="Untested tag. Activate to pull it and run the example assessment."
            onPointerDown={onTagDown}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                pull();
              }
            }}
            className={`absolute top-0 left-0 cursor-grab touch-none rounded-[4px] bg-tag outline-none select-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-background active:cursor-grabbing ${
              tagFading ? "opacity-0 transition-opacity duration-300" : ""
            }`}
            style={{
              width: TAG_W * s,
              height: TAG_H * s,
              transformOrigin: `${(TAG_W * s) / 2}px ${GROMMET_Y * s}px`,
              transform: `translate(${sim.current.width * 0.6 - (TAG_W * s) / 2}px, ${PIN_Y + CORD * s - GROMMET_Y * s}px)`,
              willChange: "transform",
            }}
          >
            <span className="pointer-events-none absolute inset-1 rounded-[3px] border border-dashed border-tag-foreground/80" />
            <span
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full border-2 border-metal bg-background"
              style={{ top: (GROMMET_Y - 5) * s, width: 10 * s, height: 10 * s }}
            />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center font-sans font-extrabold tracking-tight text-tag-foreground uppercase"
              style={{ top: 22 * s, writingMode: "vertical-rl", fontSize: 13 * s, letterSpacing: "0.04em" }}
            >
              UNTESTED · DO NOT DEPLOY
            </span>
          </div>
        )}
        {hydrated && !pulled && (
          <div
            className="pointer-events-none absolute flex items-end gap-1 text-xs text-muted-foreground"
            style={{ top: PIN_Y + CORD * s + TAG_H * s - 40, left: `calc(60% + ${(TAG_W * s) / 2 + 10}px)` }}
          >
            <svg width="34" height="30" viewBox="0 0 34 30" fill="none" className="-mb-1 stroke-current">
              <path d="M30 26 C 20 26, 10 22, 5 6" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M2 11 L5 5 L10 9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="whitespace-nowrap">Pull the tag</span>
          </div>
        )}
      </div>
    </div>
  );
}
