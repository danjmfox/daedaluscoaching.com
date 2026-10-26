import { ref, computed, watch, onMounted, onUnmounted, type Ref } from "vue";
import { generateMaze } from "../../core/maze/generator";
import { solveMaze } from "../../core/maze/solver";
import { hashString, mulberry32 } from "../../core/maze/prng";
import { advanceThread } from "../../core/maze/mutate";
import {
  renderTrail,
  trailLength,
  wallRotationGeometry,
  TRAIL_STEP,
} from "../../core/maze/renderer";
import type { PlaybackHandle, ThreadState } from "../../core/maze/types";
import { jsHeadPlayback } from "./playback/jsHeadPlayback";

const STEP_INTERVAL_MS = 650;

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
export function useLivingMaze(
  seed: Ref<string | undefined>,
  live: Ref<boolean>,
) {
  const state = ref<ThreadState | null>(null);
  const tick = ref(0);
  let handle: PlaybackHandle | null = null;

  /** Entry → head only. The route ahead is never drawn — exploration, not solution. */
  const trailPoints = computed(() =>
    state.value ? renderTrail(state.value.path, state.value.headIndex) : "",
  );

  /** SVG geometry for the wall moving this frame; null on a no-op tick. */
  const rotation = computed(() =>
    state.value?.lastRotation
      ? wallRotationGeometry(state.value.lastRotation)
      : null,
  );

  /** Dash geometry so the newest cell draws in across the tick, not in one jump. */
  const trailDraw = computed(() => {
    const total = state.value ? trailLength(state.value.headIndex) : 0;
    return {
      total,
      step: Math.min(TRAIL_STEP, total),
      durationMs: STEP_INTERVAL_MS,
    };
  });

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
        tick.value += 1;
      },
      stepIntervalMs: STEP_INTERVAL_MS,
    });
  }

  onMounted(start);
  watch([seed, live], start);
  onUnmounted(stop);

  return { state, trailPoints, rotation, trailDraw, tick };
}
