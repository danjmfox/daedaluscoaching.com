<template>
  <section aria-label="Certifications and credentials">
    <ul v-if="signals.length">
      <li v-for="signal in signals" :key="signal.key">
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
