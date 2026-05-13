import { contactSchema } from "~/core/contact/contact-schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    throw createError({ statusCode: 400, message: "Invalid submission" });
  }

  // Netlify Forms processes the form via the static HTML data-netlify attribute.
  // This server route handles JS-enabled submissions as a progressive enhancement.
  // In production the form POST goes directly to Netlify; this route is a fallback.
  return { ok: true };
});
