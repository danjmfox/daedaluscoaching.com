<template>
  <main>
    <template v-if="page && rawDoc">
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="page-body">
        <ContentRenderer :value="rawDoc" />
      </div>
    </template>
    <p v-else>Content not found</p>
  </main>
</template>

<script setup lang="ts">
const { page, rawDoc } = await usePageContent('/privacy')
</script>

<style scoped>
.page-title {
  margin-bottom: var(--space-xl);
}

.page-body {
  margin-bottom: var(--space-2xl);
}
</style>
