import {
  contactSchema,
  type ContactFields,
} from "~/core/contact/contact-schema";

type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export function useContact() {
  const fields = reactive<ContactFields>({ name: "", email: "", message: "" });
  const errors = reactive<FieldErrors>({});
  const submitted = ref(false);
  const submitting = ref(false);

  function validate(): boolean {
    const result = contactSchema.safeParse(fields);
    Object.assign(errors, {
      name: undefined,
      email: undefined,
      message: undefined,
    });
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
      const body = new URLSearchParams({
        "form-name": "contact",
        name: fields.name,
        email: fields.email,
        message: fields.message,
      });
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      submitted.value = true;
    } finally {
      submitting.value = false;
    }
  }

  return { fields, errors, submitted, submitting, submit };
}
