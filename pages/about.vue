<template>
  <main>
    <section class="section">
      <div class="container">
        <template v-if="data?.page">
          <h1>{{ data.page.title }}</h1>
          <CoachPhoto />
          <template v-for="(block, i) in data.blocks" :key="block.stem">
            <div
              :class="[
                'content-block',
                block.meta?.image && block.meta?.image_position === 'left' && 'content-block--image-left',
                block.meta?.image && block.meta?.image_position === 'right' && 'content-block--image-right',
              ]"
            >
              <div v-if="block.meta?.image && block.meta?.image_position === 'left'" class="content-block__image">
                <img :src="`/images/diagrams/${block.meta.image}.svg`" :alt="block.meta.image_alt || ''" :aria-hidden="!block.meta.image_alt" />
              </div>
              <div :class="block.meta?.image ? 'content-block__text' : undefined">
                <h2 v-if="block.meta?.heading !== false && block.title">
                  {{ block.title }}
                </h2>
                <ContentRenderer :value="block" />
              </div>
              <div v-if="block.meta?.image && block.meta?.image_position === 'right'" class="content-block__image">
                <img :src="`/images/diagrams/${block.meta.image}.svg`" :alt="block.meta.image_alt || ''" :aria-hidden="!block.meta.image_alt" />
              </div>
            </div>
            <NarrativeEdge
              v-if="i < data.blocks.length - 1"
              :from="textPosition(block)"
              :to="textPosition(data.blocks[i + 1])"
            />
          </template>
        </template>
        <p v-else>Content not found</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { data } = await useComposedPage("/about");

useSeoMeta({
  title: () => data.value?.page?.title ?? 'About',
  description: () => (data.value?.page as { description?: string } | null)?.description ?? '',
  ogTitle: () => data.value?.page?.title ?? 'About',
  ogDescription: () => (data.value?.page as { description?: string } | null)?.description ?? '',
  ogUrl: 'https://daedaluscoaching.com/about',
})

type Position = "left" | "center" | "right";

function textPosition(block: { meta?: { image_position?: string } }): Position {
  if (block.meta?.image_position === "left") return "right";
  if (block.meta?.image_position === "right") return "left";
  return "center";
}
</script>

<style scoped>
.content-block h2 {
  margin-bottom: var(--space-md);
}
</style>
