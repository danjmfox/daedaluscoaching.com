<template>
  <main>
    <section class="section">
      <div class="container">
        <template v-if="data?.page">
          <h1>{{ data.page.title }}</h1>
          <template v-for="(block, i) in data.blocks" :key="block.stem">
            <div class="content-block">
              <h2 v-if="block.meta?.heading !== false && block.title">
                {{ block.title }}
              </h2>
              <ContentRenderer :value="block" />
            </div>
            <NarrativeEdge
              v-if="i < data.blocks.length - 1"
              from="center"
              to="center"
            />
          </template>
        </template>
        <p v-else>Content not found</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { data } = await useComposedPage("/services");

useSeoMeta({
  title: () => data.value?.page?.title ?? "How I work",
  description: () =>
    (data.value?.page as { description?: string } | null)?.description ?? "",
  ogTitle: () => data.value?.page?.title ?? "How I work",
  ogDescription: () =>
    (data.value?.page as { description?: string } | null)?.description ?? "",
  ogUrl: "https://daedaluscoaching.com/services",
});
</script>

<style scoped>
.content-block h2 {
  margin-bottom: var(--space-md);
}
</style>
