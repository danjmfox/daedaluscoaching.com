<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-copy">
        © {{ year }} Daedalus Coaching Ltd
      </p>
      <nav aria-label="Footer navigation">
        <ul class="footer-links">
          <li>
              <NuxtLink to="/privacy" class="footer-link">Privacy policy</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.footer-inner {
  max-width: 48rem;
  margin-inline: auto;
  padding-inline: var(--space-xl);
  padding-block: var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--space-lg);
}

.footer-link {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
  text-decoration: none;
}

.footer-link:hover {
  color: var(--color-accent);
}
</style>
