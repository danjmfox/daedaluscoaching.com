<template>
  <main>
    <section class="section">
      <div class="container">
        <TrustSignals />
        <template v-if="page">
          <h1>{{ page.title }}</h1>
          <p class="coach-byline">{{ coachName }} — {{ coachRole }}</p>
        </template>
      </div>
    </section>

    <section class="section section--surface">
      <div class="container">
        <template v-if="rawDoc">
          <ContentRenderer :value="rawDoc" />
        </template>
        <p v-else>Content not found</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <NuxtLink to="/contact" class="cta-link">Get in touch →</NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { page, rawDoc } = await usePageContent('/home')
const { coachName, coachRole } = useRuntimeConfig().public

useSeoMeta({
  title: () => page.value?.title ?? 'Daedalus Coaching',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? 'Daedalus Coaching',
  ogDescription: () => page.value?.description ?? '',
  ogUrl: 'https://daedaluscoaching.com/',
})
</script>

<style scoped>
.section--surface {
  background-color: var(--color-surface);
}

.coach-byline {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  margin-top: calc(-1 * var(--space-md));
  margin-bottom: 0;
}

.cta-link {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent);
}
</style>
