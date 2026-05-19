<template>
  <div v-if="submitted">
    <p>Thank you — your message has been sent. I'll be in touch shortly.</p>
  </div>

  <form
    v-else
    class="form"
    data-netlify="true"
    name="contact"
    method="POST"
    novalidate
    :data-hydrated="mounted ? 'true' : undefined"
    @submit.prevent="submit"
  >
    <input type="hidden" name="form-name" value="contact" />

    <div class="field">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="fields.name"
        type="text"
        name="name"
        autocomplete="name"
        required
      />
      <p v-if="errors.name" class="field-error" role="alert">{{ errors.name }}</p>
    </div>

    <div class="field">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="fields.email"
        type="email"
        name="email"
        autocomplete="email"
        required
      />
      <p v-if="errors.email" class="field-error" role="alert">{{ errors.email }}</p>
    </div>

    <div class="field">
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="fields.message"
        name="message"
        rows="5"
        required
      />
      <p v-if="errors.message" class="field-error" role="alert">{{ errors.message }}</p>
    </div>

    <button type="submit" :disabled="submitting">
      {{ submitting ? "Sending…" : "Send message" }}
    </button>
  </form>
</template>

<script setup lang="ts">
const { fields, errors, submitted, submitting, submit } = useContact();

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field label {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.field input,
.field textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  border-radius: 2px;
  appearance: none;
}

.field input:focus-visible,
.field textarea:focus-visible {
  border-color: var(--color-accent);
  outline: 2px solid var(--color-accent);
  outline-offset: 0;
}

.field-error {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  color: var(--color-error);
}

button[type="submit"] {
  background-color: var(--color-accent);
  color: var(--color-background);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  padding: var(--space-sm) var(--space-xl);
  border: none;
  cursor: pointer;
  align-self: flex-start;
}

button[type="submit"]:hover {
  background-color: var(--color-accent-hover);
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
