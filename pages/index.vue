<template>
  <main>
    <TrustSignals />
    <template v-if="page && rawDoc">
      <h1>{{ page.title }}</h1>
      <ContentRenderer :value="rawDoc" />
    </template>
    <p v-else>Content not found</p>
  </main>
</template>

<script setup lang="ts">
const { page, rawDoc } = await usePageContent('/home')
</script>
