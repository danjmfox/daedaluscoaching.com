<template>
  <div v-if="submitted">
    <p>Thank you — your message has been sent. I'll be in touch shortly.</p>
  </div>

  <form
    v-else
    data-netlify="true"
    name="contact"
    method="POST"
    novalidate
    @submit.prevent="submit"
  >
    <input type="hidden" name="form-name" value="contact" />

    <div>
      <label for="name">Name</label>
      <input
        id="name"
        v-model="fields.name"
        type="text"
        name="name"
        autocomplete="name"
      />
      <p v-if="errors.name" role="alert">{{ errors.name }}</p>
    </div>

    <div>
      <label for="email">Email</label>
      <input
        id="email"
        v-model="fields.email"
        type="email"
        name="email"
        autocomplete="email"
      />
      <p v-if="errors.email" role="alert">{{ errors.email }}</p>
    </div>

    <div>
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="fields.message"
        name="message"
        rows="5"
      />
      <p v-if="errors.message" role="alert">{{ errors.message }}</p>
    </div>

    <button type="submit" :disabled="submitting">
      {{ submitting ? "Sending…" : "Send message" }}
    </button>
  </form>
</template>

<script setup lang="ts">
const { fields, errors, submitted, submitting, submit } = useContact();
</script>
