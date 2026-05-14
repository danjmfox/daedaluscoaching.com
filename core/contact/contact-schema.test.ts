import { describe, it, expect } from "vitest";
import { contactSchema } from "./contact-schema";

describe("contactSchema", () => {
  it("passes with valid data", () => {
    const result = contactSchema.safeParse({
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "I would like to discuss coaching.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "alex@example.com",
      message: "Hello.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a whitespace-only name", () => {
    const result = contactSchema.safeParse({
      name: "   ",
      email: "alex@example.com",
      message: "Hello.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email format", () => {
    const result = contactSchema.safeParse({
      name: "Alex Rivera",
      email: "not-an-email",
      message: "Hello.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty message", () => {
    const result = contactSchema.safeParse({
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});
