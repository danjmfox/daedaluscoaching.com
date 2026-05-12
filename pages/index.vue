<template>
  <main>
    <template v-if="page">
      <h1>{{ page.title }}</h1>
      <ContentRenderer :value="rawPage" />
    </template>
    <p v-else>Content not found</p>
  </main>
</template>

<script setup lang="ts">
const { data: rawPage } = await useAsyncData('home', () =>
  queryCollection('content').path('/home').first()
)

const page = computed(() =>
  rawPage.value
    ? { title: rawPage.value.title as string, body: rawPage.value.body as string }
    : null
)
</script>
