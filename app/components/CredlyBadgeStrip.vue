<template>
  <section class="credly-badge-strip content-block" aria-label="Professional certifications">
    <div
      v-for="group in grouped"
      :key="group.issuer"
      class="credly-badge-strip__group"
    >
      <p class="credly-badge-strip__issuer">{{ group.issuer }}</p>
      <ul class="credly-badge-strip__badges">
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
              width="80"
              height="80"
            />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { grouped } = useCredentials();
</script>

<style scoped>
.credly-badge-strip {
  margin-top: var(--space-xl);
  margin-bottom: var(--space-2xl);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--space-2xl);
}

.credly-badge-strip__group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
}

.credly-badge-strip__issuer {
  font-family: var(--font-family-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.credly-badge-strip__badges {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
  width: 100%;
}

.credly-badge-strip__link {
  display: block;
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
  width: 100%;
  height: auto;
}

@media (width <= 48rem) {
  .credly-badge-strip {
    flex-direction: column;
    align-items: center;
  }

  .credly-badge-strip__group {
    width: 100%;
  }
}
</style>
