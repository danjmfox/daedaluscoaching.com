<template>
  <section class="credly-badge-strip" aria-label="Professional certifications">
    <ul class="credly-badge-strip__badges">
      <template v-for="group in grouped" :key="group.issuer">
        <li
          v-for="badge in group.badges"
          :key="badge.name"
          class="credly-badge-strip__item"
        >
          <a
            :href="badge.shareUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Verify ${badge.name} certification on Credly (opens in new tab)`"
            class="credly-badge-strip__link"
          >
            <img
              :src="badge.imageUrl"
              :alt="`${badge.name} badge`"
              class="credly-badge-strip__image"
              width="64"
              height="64"
            />
          </a>
        </li>
      </template>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { grouped } = useCredentials();
</script>

<style scoped>
.credly-badge-strip {
  margin-top: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.credly-badge-strip__badges {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.credly-badge-strip__item {
  display: contents;
}

.credly-badge-strip__link {
  display: inline-block;
  border-radius: var(--radius-sm, 4px);
  transition: opacity 0.15s ease;
}

.credly-badge-strip__link:hover {
  opacity: 0.8;
}

.credly-badge-strip__link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.credly-badge-strip__image {
  display: block;
  width: 64px;
  height: 64px;
}
</style>
