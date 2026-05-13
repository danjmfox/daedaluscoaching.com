import { contactSchema, type ContactFields } from "~/core/contact/contact-schema";

type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export function useContact() {
  const fields = reactive<ContactFields>({ name: "", email: "", message: "" });
  const errors = reactive<FieldErrors>({});
  const submitted = ref(false);
  const submitting = ref(false);

  function validate(): boolean {
    const result = contactSchema.safeParse(fields);
    Object.assign(errors, { name: undefined, email: undefined, message: undefined });
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFields;
        if (!errors[key]) errors[key] = issue.message;
      }
      return false;
    }
    return true;
  }

  async function submit() {
    if (!validate()) return;
    submitting.value = true;
    try {
      await $fetch("/api/contact", { method: "POST", body: { ...fields } });
      submitted.value = true;
    } finally {
      submitting.value = false;
    }
  }

  return { fields, errors, submitted, submitting, submit };
}
