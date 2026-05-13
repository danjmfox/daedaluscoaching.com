<template>
  <main>
    <TrustSignals />
    <template v-if="page && rawDoc">
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="page-body">
        <ContentRenderer :value="rawDoc" />
      </div>
    </template>
    <p v-else>Content not found</p>
    <div class="page-cta">
      <NuxtLink to="/contact" class="cta-link">Get in touch →</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const { page, rawDoc } = await usePageContent('/home')
</script>

<style scoped>
.page-title {
  margin-bottom: var(--space-xl);
}

.page-body {
  margin-bottom: var(--space-2xl);
}

.page-cta {
  margin-top: var(--space-xl);
}

.cta-link {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-accent);
}
</style>
