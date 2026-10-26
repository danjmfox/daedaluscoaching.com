<template>
  <div class="narrative-edge" aria-hidden="true">
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      class="narrative-edge__svg"
    >
      <path
        :d="`M ${fromX} 0 C ${fromX} 50, ${toX} 50, ${toX} 100`"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
// X positions as % of container width — approximated from 1fr/2fr grid
// with 48rem container, 2rem padding each side, 3rem gap:
// image-left  → text column centre ≈ 69%
// image-right → text column centre ≈ 31%
// no image    → text column centre = 50%
const POSITIONS = { left: 31, center: 50, right: 69 } as const

// DEFERRED — Fan-out / fan-in pattern:
// A future Services page may link one block → [Svc X, Svc Y, Svc Z] → one block.
// This requires: (1) a BlockGroup abstraction in useComposedPage (nested arrays in
// frontmatter resolved as { type: 'group', blocks: [] }), (2) a FanEdge variant
// where N bezier curves share a single origin or terminus point.
// The current 1:1 NarrativeEdge should not be changed to accommodate this —
// FanEdge is a separate component that renders alongside BlockGroup.
type Position = keyof typeof POSITIONS

const props = defineProps<{ from: Position; to: Position }>()

const fromX = POSITIONS[props.from]
const toX = POSITIONS[props.to]
</script>

<style scoped>
.narrative-edge {
  width: 100%;
  color: var(--color-border);
}

.narrative-edge__svg {
  display: block;
  width: 100%;
  height: var(--space-2xl);
}
</style>
