<template>
  <main>
    <section class="section">
      <div class="container">
        <TrustSignals />
        <template v-if="page">
          <h1>{{ page.title }}</h1>
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
</script>

<style scoped>
.section--surface {
  background-color: var(--color-surface);
}

.cta-link {
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent);
}
</style>
