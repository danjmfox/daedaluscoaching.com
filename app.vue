<template>
  <div class="site">
    <SiteHeader />
    <div class="site-content">
      <NuxtPage />
    </div>
    <SiteFooter />
  </div>
</template>

<style>
.site {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.site-content {
  flex: 1;
  max-width: 48rem;
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--space-xl);
  padding-block: var(--space-3xl);
}
</style>
