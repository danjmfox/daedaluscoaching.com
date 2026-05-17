<template>
  <div
    v-if="visible"
    data-testid="cookie-notice"
    class="cookie-notice"
    role="region"
    aria-label="Cookie notice"
  >
    <p class="cookie-notice__text">
      This site uses no cookies and doesn't track you.
      <NuxtLink to="/privacy" class="cookie-notice__link">Privacy policy</NuxtLink>
    </p>
    <button
      data-testid="cookie-notice-dismiss"
      class="cookie-notice__dismiss"
      aria-label="Dismiss cookie notice"
      @click="dismiss"
    >
      Got it
    </button>
  </div>
</template>

<script setup lang="ts">
const STORAGE_KEY = "cookie-notice-dismissed";

const visible = ref(false);

onMounted(() => {
  visible.value = localStorage.getItem(STORAGE_KEY) !== "true";
});

function dismiss() {
  localStorage.setItem(STORAGE_KEY, "true");
  visible.value = false;
}
</script>

<style scoped>
.cookie-notice {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-xl);
  background-color: var(--color-text-primary);
  color: var(--color-background);
  font-size: var(--font-size-sm);
}

.cookie-notice__text {
  margin: 0;
}

.cookie-notice__link {
  color: var(--color-background);
  text-underline-offset: 3px;
}

.cookie-notice__dismiss {
  flex-shrink: 0;
  padding: var(--space-xs) var(--space-md);
  border: 1px solid var(--color-background);
  border-radius: 2px;
  background: transparent;
  color: var(--color-background);
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  cursor: pointer;
  white-space: nowrap;
}

.cookie-notice__dismiss:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 480px) {
  .cookie-notice {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-md);
  }
}
</style>
