<template>
  <div v-if="config.photo.enabled" class="coach-photo">
    <img
      :src="config.photo.src"
      :alt="config.photo.alt"
      class="coach-photo__img"
      width="200"
      height="240"
    />
  </div>
</template>

<script setup lang="ts">
import { identityConfig } from "~/core/identity/config";

const config = identityConfig;
</script>

<style scoped>
.coach-photo {
  margin-bottom: var(--space-2xl);
}

.coach-photo__img {
  width: 10rem;
  height: auto;
  border-radius: 2px;
  display: block;
}
</style>
