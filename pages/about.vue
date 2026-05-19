<template>
  <main id="main" tabindex="-1">
    <section class="section">
      <div class="container">
        <template v-if="data?.page">
          <h1>{{ data.page.title }}</h1>
          <p class="coach-role">{{ coachRole }}</p>
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
            <CredlyBadgeStrip v-if="block.stem?.endsWith('about-certifications')" />
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
const { coachRole } = useRuntimeConfig().public;

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
.coach-role {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  margin-top: calc(-1 * var(--space-md));
  margin-bottom: var(--space-2xl);
}

.content-block h2 {
  margin-bottom: var(--space-md);
}
</style>
