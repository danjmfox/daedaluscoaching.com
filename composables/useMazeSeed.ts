import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const SEED_PARAM = "maze"
const SEED_LENGTH = 6
const SEED_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789"

function randomSeed(): string {
  return Array.from(
    { length: SEED_LENGTH },
    () => SEED_CHARS[Math.floor(Math.random() * SEED_CHARS.length)],
  ).join("")
}

/**
 * Reads the `?maze=` URL param and returns it as a reactive seed.
 *
 * Resolution order:
 *   1. seedOverride prop (testing / Storybook)
 *   2. ?maze= URL param (shareable link)
 *   3. defaultSeed (page-level curator choice — e.g. homepage uses "23fc3a")
 *   4. random 6-char alphanumeric (written to URL via replaceState)
 *
 * The resolved seed is always written to the URL so the visitor can copy it.
 */
export function useMazeSeed(seedOverride?: string, defaultSeed?: string) {
  const route = useRoute()
  const seed = ref<string>(seedOverride ?? "")

  onMounted(() => {
    if (seedOverride) {
      seed.value = seedOverride
      return
    }

    const existing = route.query[SEED_PARAM]
    if (typeof existing === "string" && existing.length > 0) {
      seed.value = existing
    } else {
      const resolved = defaultSeed ?? randomSeed()
      seed.value = resolved
      const url = new URL(window.location.href)
      url.searchParams.set(SEED_PARAM, resolved)
      history.replaceState(null, "", url.toString())
    }
  })

  return { seed }
}
