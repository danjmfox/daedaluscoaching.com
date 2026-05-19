<template>
  <header class="site-header">
    <a href="#main" class="skip-link">Skip to content</a>
    <div class="header-inner">
      <NuxtLink to="/" class="logo-link" aria-label="Daedalus Coaching — home">
        <ClientOnly>
          <MazeLogo class="logo-mark" />
          <template #fallback>
            <img src="/logo.svg" alt="" aria-hidden="true" class="logo-mark" width="32" height="32" />
          </template>
        </ClientOnly>
        <span class="logo-wordmark">Daedalus Coaching</span>
      </NuxtLink>
      <nav aria-label="Main navigation">
        <ul class="nav-list">
          <li><NuxtLink to="/about" class="nav-link">About</NuxtLink></li>
          <li><NuxtLink to="/services" class="nav-link">Services</NuxtLink></li>
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
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.logo-mark {
  display: block;
  height: 2rem;
  width: 2rem;  /* square for maze */
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

@media (width <= 600px) {
  .header-inner {
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }

  .nav-list {
    justify-content: center;
    gap: var(--space-md);
  }

  .nav-link {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}
</style>
