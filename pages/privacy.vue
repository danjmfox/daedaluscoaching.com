<template>
  <main>
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
</script>
