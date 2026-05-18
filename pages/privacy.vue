<template>
  <main id="main" tabindex="-1">
    <section class="section">
      <div class="container">
        <template v-if="page && rawDoc">
          <h1>{{ page.title }}</h1>
          <ContentRenderer :value="rawDoc" />
        </template>
        <p v-else>Content not found</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { page, rawDoc } = await usePageContent('/privacy')

useSeoMeta({
  title: () => page.value?.title ?? 'Privacy policy',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? 'Privacy policy',
  ogDescription: () => page.value?.description ?? '',
  ogUrl: 'https://daedaluscoaching.com/privacy',
})
</script>
