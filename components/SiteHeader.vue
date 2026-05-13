<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo-link" aria-label="Daedalus Coaching — home">
        <!-- TODO: replace inner span with <img> once SVG logo file is in public/ -->
        <span class="logo-wordmark">Daedalus Coaching</span>
      </NuxtLink>
      <nav aria-label="Main navigation">
        <ul class="nav-list">
          <li><NuxtLink to="/about" class="nav-link">About</NuxtLink></li>
          <li><NuxtLink to="/systems" class="nav-link">Systems</NuxtLink></li>
          <li><NuxtLink to="/contact" class="nav-link">Contact</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.header-inner {
  max-width: 48rem;
  margin-inline: auto;
  padding-inline: var(--space-xl);
  padding-block: var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  text-decoration: none;
  color: var(--color-text-primary);
}

.logo-wordmark {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  white-space: nowrap;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--space-xl);
}

.nav-link {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-accent);
}
</style>
