<template>
  <iframe
    :src="src"
    :title="title"
    width="100%"
    height="600"
    style="border: none"
  />
</template>

<script setup lang="ts">
import { swoopyUrl } from "~/core/swoopy/swoopy-url";

const props = defineProps<{
  modelId?: string;
  graph?: string;
  title?: string;
}>();

const src = computed(() => swoopyUrl(props.modelId, props.graph));
const title = computed(() => props.title ?? "Systems diagram");
</script>
