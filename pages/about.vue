<template>
  <main>
    <template v-if="data?.page">
      <h1>{{ data.page.title }}</h1>
      <ContentRenderer
        v-for="block in data.blocks"
        :key="block.stem"
        :value="block"
      />
    </template>
    <p v-else>Content not found</p>
  </main>
</template>

<script setup lang="ts">
const { data } = await useComposedPage("/about");
</script>
