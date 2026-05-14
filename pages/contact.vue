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
        <ContactForm />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { page, rawDoc } = await usePageContent('/contact')

useSeoMeta({
  title: () => page.value?.title ?? 'Get in touch',
  description: () => page.value?.description ?? '',
  ogTitle: () => page.value?.title ?? 'Get in touch',
  ogDescription: () => page.value?.description ?? '',
  ogUrl: 'https://daedaluscoaching.com/contact',
})
</script>
