<template>
  <div class="site">
    <SiteHeader />
    <div class="site-content">
      <NuxtPage />
    </div>
    <SiteFooter />
    <CookieNotice />
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
}
</style>
