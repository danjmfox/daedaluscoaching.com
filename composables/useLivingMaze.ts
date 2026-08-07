import { ref, watch, onMounted, onUnmounted, type Ref } from "vue";
import { generateMaze } from "../core/maze/generator";
import { solveMaze } from "../core/maze/solver";
import { hashString, mulberry32 } from "../core/maze/prng";
import { advanceThread } from "../core/maze/mutate";
import type { Cell, PlaybackHandle, ThreadState } from "../core/maze/types";
import { jsHeadPlayback } from "./playback/jsHeadPlayback";

const STEP_INTERVAL_MS = 650;
const B = 20;
const S = 40;

/** Polyline points for a raw path: entry wall-point → cell centres → exit wall-point. */
export function pathToPoints(path: Cell[]): string {
  if (path.length === 0) return "";
  const cx = (c: Cell) => B + c.col * S + S / 2;
  const cy = (c: Cell) => B + c.row * S + S / 2;
  const pts = [`${cx(path[0]) + S / 2},${cy(path[0])}`];
  for (const c of path) pts.push(`${cx(c)},${cy(c)}`);
  const last = path[path.length - 1];
  pts.push(`${cx(last) + S / 2},${cy(last)}`);
  return pts.join(" ");
}

function freshState(seed: string): ThreadState {
  const graph = generateMaze(seed);
  return { graph, path: solveMaze(graph).solution, headIndex: 0 };
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Drives the living maze (ADR-007). Exposes the current `ThreadState`; null
 * until mounted or when disabled. Animation runs client-side only; reduced
 * motion gets a single static frame. Loop policy (restart on completion) lives
 * here in the shell — the engine stays a pure single pass.
 */
export function useLivingMaze(seed: Ref<string | undefined>, live: Ref<boolean>) {
  const state = ref<ThreadState | null>(null);
  let handle: PlaybackHandle | null = null;

  function stop() {
    handle?.stop();
    handle = null;
  }

  function start() {
    stop();
    const s = seed.value;
    if (!s || !live.value) {
      state.value = null;
      return;
    }
    let initial: ThreadState;
    try {
      initial = freshState(s);
    } catch {
      state.value = null;
      return;
    }
    if (prefersReducedMotion()) {
      state.value = initial; // static frame, no animation
      return;
    }
    const rng = mulberry32(hashString(`${s}:live`));
    handle = jsHeadPlayback({
      initial,
      step: (current) => {
        const next = advanceThread(current, rng);
        return next === current ? freshState(s) : next; // loop on completion
      },
      onFrame: (frame) => {
        state.value = frame;
      },
      stepIntervalMs: STEP_INTERVAL_MS,
    });
  }

  onMounted(start);
  watch([seed, live], start);
  onUnmounted(stop);

  return { state };
}
