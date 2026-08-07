# ADR-007: Living Maze — Time-Evolving Homepage Logo (Fork-Ahead Engine behind a ThreadPlayback Port)

status: Proposed
date: 2026-06-19
deciders: Daniel Osborne (owner/developer)
wave: SPIKE → DESIGN

---

## Context

The homepage maze (`MazeLogo.vue`, derived from the pure `core/maze` pipeline) is a static
structure computed once from a seed. The goal is for it to **change over time so it
*demonstrates* complexity and emergence** — the coaching brand themes — rather than merely
depicting a maze.

The mechanism was validated through an nWave SPIKE: three throwaway probes run over the real
`generateMaze`/`solveMaze` pure functions (measurement code in `tests/`, deleted after). The
findings forced the design:

- The generator produces a **perfect maze** (spanning tree), so the entry→exit route is
  structurally **stable**. A single-wall mutation re-routes the thread only **~7%** of the time
  (random) / **~38%** (frontier, averaged across seeds) — and just **~5%** on the homepage seed
  `23fc3a`.
- The carrying visual signal is therefore **not** re-routing but **fork-ahead**: a wall
  *opening* just ahead of the draw-head, visible **~50–68%** of the time. Combined "something
  visible changes at the frontier" ≈ **89%**.
- **Closing** a wall ahead disconnects head→exit **~44%** of the time. `solveMaze` already
  throws (fewer than 2 backtrack excursions) on **~1%** of *unmutated* seeds — a fragility that
  live mutation amplifies.
- Routes that are simultaneously **long and well-composed** (perimeter-framing, full-width, low
  central-occlusion) are rare: **2 of 6000** seeds. Route length and composition are in tension.

Pressure to decide now: before writing implementation, lock the mechanism and the draw-model
boundary so the build is not a guess, and **capture the fork-ahead pivot** — a non-obvious
finding that is not recoverable from the code once written.

## Decision

Build a "living maze" with five committed choices:

1. **Mechanism — fork-ahead-primary.** Openings appear just ahead of the head; the path
   re-routes only occasionally (punctuation). Framing: *"the landscape keeps opening ahead of
   you; occasionally that changes your route."* Honest about complexity — most perturbations do
   not change your path.
2. **Substrate — keep seed `23fc3a`.** Chosen for composition (thread frames the full width,
   perimeter ~73%, central-occlusion 0%, fork-ahead 68%). Liveliness comes from the **engine**,
   not a busy pre-baked route.
3. **Mutation engine — dual locus weighting:** **frontier** (cells 2–5 ahead of the head, for
   legible change) × **perimeter** (bias openings outward so the evolving thread keeps framing
   the wings instead of collapsing to one side). Bias to **opens**; closes mostly disconnect.
4. **Guards:** test-then-commit connectivity (reuse the BFS guard pattern in
   `core/maze/generator.ts`); graceful degradation when backtracks < 2 (render the route without
   backtracks — never blank); re-solve **from the head**, keeping the drawn-behind prefix fixed.
5. **Draw model behind a pure `ThreadPlayback` port** in `core/`. Build the `jsHeadPlayback`
   adapter first; defer `cssDashPlayback` and `staticPlayback` (reduced-motion) behind the same
   port. The pure routing/mutation policy (`mutateAhead`, `solveFromHead`) lives in `core/` and
   is shared by every adapter; the clock lives in the shell.

## Alternatives Considered

### Option A: Reseed on a timer (swap the whole seed periodically)
Crude variety, not emergence; an abrupt total change reads as "a different maze," not an evolving
one. Low brand fit. Rejected.

### Option B: Random single-wall mutation on a timer
~82% of random toggles are invisible to the thread; "walls twitch, thread inert" reads as broken.
Pays the full cost of live mutation for a ~7% payoff. Rejected.

### Option C (chosen): Frontier×perimeter fork-ahead engine on a fixed composed seed, behind a `ThreadPlayback` port
~89% of frontier mutations produce a visible change; preserves the owner-chosen composition;
keeps the draw-model choice reversible; shares one pure policy across adapters.

### Option D: Pick a long, lively seed instead of an engine
Long + well-composed seeds are rare (2/6000), and a busy seed fights the wings-framing
composition. Static, not emergent. Rejected.

### On the draw model: keep both vs pick one
Chose **port + one adapter now** (`jsHeadPlayback`), the rest deferred. The port is justified on
**separation of concerns** (pure evolution policy vs impure playback mechanism); swappability is a
bonus, not the justification. The `ThreadPlayback` interface is **not frozen** until the first
adapter proves it — avoids a premature/speculative abstraction.

## Consequences

**Positive**

- The logo *demonstrates* the brand idea instead of depicting it.
- Pure core grows testable, mutation-testable policy (`mutateAhead`, `solveFromHead`).
- The draw-model choice is reversible; reduced-motion is a trivial third adapter, not an `if`.
- Dependency-cruiser core/shell boundary preserved: types + policy in `core/`, clock in the shell.

**Negative / accepted trade-offs**

- More moving parts than a static SVG.
- Re-routes are rare — accepted; fork-ahead carries the effect.
- The head must be reified as a value, nudging off the elegant CSS dash one-liner toward JS.
- A second playback adapter, if ever built, is maintenance cost — mitigated: deferred and
  deletable behind the port.

**Risks / guards**

- Live mutation raises the backtracks < 2 throw rate → graceful degradation is mandatory.
- Connectivity must be guarded per mutation (test-then-commit).
- Accessibility: gate all motion behind `prefers-reduced-motion`.

**Follow-ups**

- A walking skeleton (port + `jsHeadPlayback` + both guards on the real `MazeLogo`, seed
  `23fc3a`) proves the port shape before it is frozen; the `ThreadPlayback` interface is
  provisional until then.
