<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-copy">
        © {{ year }} Daedalus Coaching Ltd ·
        <a :href="companyUrl" class="footer-link" target="_blank" rel="noopener noreferrer">No. {{ companyNumber }}</a>
      </p>
      <nav aria-label="Footer navigation">
        <ul class="footer-links">
          <li>
            <a :href="linkedinPersonal" class="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a :href="linkedinCompany" class="footer-link" target="_blank" rel="noopener noreferrer">Daedalus Coaching</a>
          </li>
          <li>
            <NuxtLink to="/privacy" class="footer-link">Privacy policy</NuxtLink>
          </li>
        </ul>
      </nav>
      <p class="footer-about">
        About this site: statically generated with
        <a href="https://nuxt.com" class="footer-link" target="_blank" rel="noopener noreferrer">Nuxt</a>
        — a full-circle nod to the AppleScript pipelines of 1995. Built with
        <a href="https://nwave.ai" class="footer-link" target="_blank" rel="noopener noreferrer">NWave</a>
        and Claude.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const { linkedinPersonal, linkedinCompany, companyNumber, companyUrl } = useRuntimeConfig().public
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.footer-about {
  width: 100%;
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
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
