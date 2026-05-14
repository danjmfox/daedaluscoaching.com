<template>
  <main>
    <section class="section">
      <div class="container">
        <template v-if="page">
          <h1>{{ page.title }}</h1>
        </template>
        <template v-if="rawDoc">
          <ContentRenderer :value="rawDoc" class="prose" />
        </template>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { page, rawDoc } = await usePageContent('/services')

useSeoMeta({
  title: () => page.value?.title ?? 'How I work',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? 'How I work',
  ogDescription: () => page.value?.description ?? '',
  ogUrl: 'https://daedaluscoaching.com/services',
})
</script>
