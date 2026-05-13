<template>
  <section aria-label="Certifications and credentials">
    <ul v-if="signals.length" class="signals">
      <li v-for="signal in signals" :key="signal.key" class="signal">
        {{ signal.label }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import {
  trustSignalsConfig,
  enabledSignals,
} from "~/core/trust-signals/config";

const signals = enabledSignals(trustSignalsConfig);
</script>

<style scoped>
section {
  margin-bottom: var(--space-2xl);
}

.signals {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-md);
}

.signal {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}

.signal + .signal {
  padding-left: var(--space-md);
  border-left: 1px solid var(--color-border);
}
</style>
