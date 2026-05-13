import type { ContactFields } from "./contact-schema";

export type SubmissionResult =
  | { ok: true }
  | { ok: false; error: string };

export type SubmissionPort = (fields: ContactFields) => Promise<SubmissionResult>;
