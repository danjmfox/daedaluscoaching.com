# ADR-008: Rotate-into-free-edge mutation + animated wall movement

status: Accepted (implemented & browser-verified 2026-06-23)
date: 2026-06-23
deciders: Daniel Osborne (owner/developer)
wave: DESIGN → DELIVER
relates-to: ADR-007 (STANDS — extended, not superseded)

---

## Context

ADR-007 established the living maze (fork-ahead engine, **past route fixed**, seed `23fc3a`,
`ThreadPlayback` port). Building the WIP surfaced two gaps that this ADR resolves:

1. **The past-route-fixed invariant is not actually enforced.** `mutateAhead` (`core/maze/mutate.ts`)
   draws candidate walls from _any_ neighbour of a frontier cell — including cells **behind** the
   head — and `solveFromHead` is a free BFS that can re-route the thread back **through** travelled
   cells. The past visibly rewrites itself, reading as a glitch (DISCUSS US-LM-001).
2. **The mutation reads as a wall vanishing, and it snaps.** ADR-007's primitive _opens_ a wall
   (removes it). The owner requirement is that walls **move** — pivot about one endpoint into a
   free edge — so the evolution reads as living, not broken (US-LM-002 / US-LM-003).

The data model matters: `MazeGraph` encodes **cell-to-cell passages** (`hasPassage(a,b)`); a _wall_
is the absence of a passage. A wall _segment rotating about a vertex_ is a wall/vertex concept that
must be layered over the passage graph and kept consistent with it. Rotation **removes-and-adds** a
wall, which re-introduces the disconnection risk that open-only structurally avoided (ADR-007 noted
opening can never disconnect).

## Decision

1. **Past-route invariant = hard guarantee.** Mutation candidates and the re-solve both **exclude
   cells at/behind the head**; `solveFromHead` excludes the fixed prefix so the re-solved path
   cannot re-enter a travelled cell. Property-tested (US-LM-001).
2. **Mutation primitive = rotate-into-free-edge.** A wall segment pivots ~90° about a shared
   lattice **vertex** from its current edge `E_src` (wall present, `hasPassage=false`) onto a
   perpendicular edge sharing that vertex that is currently **open** `E_dst` (`hasPassage=true`).
   Apply = open `E_src` + close `E_dst` (wall count conserved). Replaces open-a-wall. Frontier
   (cells 2–5 ahead) × perimeter bias retained from ADR-007.
3. **Connectivity = test-then-commit.** Tentatively apply, run `solveFromHead(head)`; if the head
   cannot reach the exit, reject and try another candidate or no-op (never blank). Reuses ADR-007's
   graceful-degradation rule.
4. **Animation = one clock.** Reuse `jsHeadPlayback`'s single interval; the rotation animates
   **declaratively in the renderer** (SVG transform about the pivot vertex) over **~400 ms
   ease-out**, completing before the next step (650 ms). The core stays pure — it emits _what_
   moved, the renderer owns _how_ it animates. rAF sub-step interpolation is deferred behind the
   same port (consistent with `jsHeadPlayback`'s own note).
5. **Data flow = rotation rides inside `ThreadState`** (optional `lastRotation`). The
   `ThreadPlayback` port shape (`step: State→State`, `onFrame: State→void`) is **UNCHANGED** — this
   **validates** ADR-007's provisional port without reshaping it. The renderer reads
   `state.lastRotation`.
6. **Reduced motion** → static frame, no rotation (existing branch, `useLivingMaze.ts`).
7. **Pure Core / Shell holds.** Candidate enumeration, rotation apply, connectivity guard, and
   `solveFromHead` live in `core/maze/` (pure). The clock and the SVG transform live in the
   shell/presentation. dependency-cruiser stays green.

## Alternatives Considered

- **Clock — two clocks (decoupled wall cadence):** richer "aliveness" but more moving parts and
  visual-overload risk on a small logo. Rejected for v1; revisit if liveliness is low.
- **Clock — rAF interpolation now:** most polished, biggest change; deferred behind the same port.
- **Data flow — reshape the port to emit `{ state, rotation }`:** bigger change; rejected because
  `lastRotation`-in-state suffices and preserves the provisional port.
- **Keep open-a-wall and fade it in:** does not satisfy "walls move, not snap" — reads as
  vanishing. Rejected.

## Consequences

**Positive**

- Walls demonstrably move; the past stays fixed; the effect reads as deliberate (JOB-MZ-002).
- ADR-007's provisional `ThreadPlayback` port is validated **without** reshape.
- Core grows pure, testable rotation policy + connectivity guard.

**Negative / accepted**

- Rotation can disconnect → the connectivity guard is **mandatory** (vs open-only's structural
  safety).
- Rotatable candidates may be scarcer than open candidates → **liveliness must be measured**
  (US-LM-002 AC3, target ≥60% of ticks show a visible change); if it fails, revisit the primitive.
- The renderer must track pivot geometry (transform-origin) per moved wall.

## Amendment — DELIVER (2026-06-23)

Implemented and browser-verified. Refinements/deviations from the decision above:

- **Pacing — `MUTATION_CHANCE = 0.25`.** A wall rotates on only ~¼ of ticks. An every-tick
  rotation (the original ≥60% target) read as _frantic_ on the real logo and could trap the head
  in a two-cell cycle. **Liveliness retargeted from ≥60% to 15–35%** (test in
  `tests/unit/maze/mutate.test.ts`). This supersedes the "liveliness ≥60%" consequence above.
- **Draw-to-head.** `renderer.ts:renderTrail` draws only entry→head; the route ahead is never
  drawn, so a re-route ahead cannot rewrite the visible past. Fixed the "orange past route
  changes" report; reads as _explored, not solved_.
- **Performance.** The mutation uses a flat `Set<string>` of passage keys (O(1) `hasPassage`) —
  the nested-closure graph wrapping timed out over long runs.
- **Perimeter bias** (Decision 2) **not implemented** — frontier candidates are chosen uniformly.
- **Animation** shipped as a `.wall-pivot <line>` (400 ms ease-out `rotate` about the vacated
  edge, static twin dropped) plus a per-tick trail dash; `prefers-reduced-motion` disables both.

## Follow-ups (future — owner-raised 2026-06-23)

- **Explore, not solve.** `solveMaze` / `solveFromHead` / "solution" frame the thread as
  _omniscient_ — it computes a full shortest path it already "knows". The intent is
  **exploration**: finding a way through unknowns. A future model would have the head discover the
  maze as it moves rather than pre-solving it. Naming + algorithm change; draw-to-head already
  leans this way visually.
- **Discover blocks by hitting them.** Today the guard / re-solve pre-empts a blocked route, so the
  head can "stop dead" when the way is blocked ~3 steps ahead. Ideally the head advances _into_ the
  block and discovers it by hitting the wall (then backtracks) — the exploration reading. Pairs
  with the item above.
- rAF interpolation behind `ThreadPlayback` if 650 ms discrete stepping reads as choppy.
- Hybrid (occasional open) or two-clock, only if the rotate-only primitive proves too sparse.
