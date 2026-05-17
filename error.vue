<template>
  <div class="site">
    <SiteHeader />
    <div id="main" class="site-content">
      <main>
        <section class="section">
          <div class="container error-page">
            <h1>Page not found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <NuxtLink to="/" class="error-page__home-link">Back to home</NuxtLink>
          </div>
        </section>
      </main>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";

useHead({
  title: "Page not found | Daedalus Coaching",
});

defineProps<{ error: Record<string, unknown> }>();
</script>

<style scoped>
.site {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.site-content {
  flex: 1;
}

.error-page {
  padding-top: var(--space-4xl);
  padding-bottom: var(--space-4xl);
}

.error-page__home-link {
  display: inline-block;
  margin-top: var(--space-lg);
  color: var(--color-accent);
  text-underline-offset: 3px;
}
</style>
