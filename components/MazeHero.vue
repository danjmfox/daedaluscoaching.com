<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useMazeSeed } from "../composables/useMazeSeed"

const props = defineProps<{
  /** Fallback seed when no ?maze= param is present */
  defaultSeed?: string
}>()

// Shares the same seed as MazeLogo — both read the same URL param
const { seed } = useMazeSeed(undefined, props.defaultSeed)

// Living maze (ADR-007/008) is the default homepage experience.
// Opt out for debugging/screenshots via ?living=0 — the URL stays clean otherwise.
const route = useRoute()
const live = computed(() => route.query.living !== "0")
</script>

<template>
  <div class="maze-hero" role="presentation" aria-hidden="true">
    <MazeLogo
      v-if="seed"
      :seed="seed"
      :live="live"
      class="maze-hero__svg"
      style="animation-delay: 0.3s"
    />
  </div>
</template>

<style scoped>
.maze-hero {
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1;
  margin: 0 auto;
}

.maze-hero__svg {
  width: 100%;
  height: 100%;
}
</style>
