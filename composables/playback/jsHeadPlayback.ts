import type {
  PlaybackConfig,
  PlaybackHandle,
  ThreadPlayback,
} from "../../core/maze/types";

/**
 * JS-driven head adapter for the `ThreadPlayback` port (ADR-007).
 *
 * Advances the pure `step` on a fixed interval and emits each frame. When
 * `step` returns the same state by reference (the head has reached the exit),
 * the driver stops itself. The clock lives here, in the shell; the policy
 * (`step`) stays pure.
 *
 * Skeleton scope: discrete per-cell stepping. rAF interpolation between steps
 * is a later refinement behind the same port.
 */
export const jsHeadPlayback: ThreadPlayback = ({
  initial,
  step,
  onFrame,
  stepIntervalMs,
}: PlaybackConfig): PlaybackHandle => {
  let state = initial;
  onFrame(state);

  const timer = setInterval(() => {
    const next = step(state);
    if (next === state) {
      clearInterval(timer);
      return;
    }
    state = next;
    onFrame(state);
  }, stepIntervalMs);

  return { stop: () => clearInterval(timer) };
};
