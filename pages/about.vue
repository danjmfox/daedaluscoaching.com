<template>
  <main>
    <section class="section">
      <div class="container">
        <template v-if="data?.page">
          <h1>{{ data.page.title }}</h1>
          <div
            v-for="block in data.blocks"
            :key="block.stem"
            class="content-block"
          >
            <h2 v-if="block.heading !== false && block.title">
              {{ block.title }}
            </h2>
            <ContentRenderer :value="block" />
          </div>
        </template>
        <p v-else>Content not found</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { data } = await useComposedPage("/about");
</script>

<style scoped>
.content-block + .content-block {
  margin-top: var(--space-2xl);
}

.content-block h2 {
  margin-bottom: var(--space-md);
}
</style>
