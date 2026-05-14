import { describe, it, expect } from "vitest";
import { identityConfig } from "./config";

describe("identityConfig", () => {
  it("photo is disabled by default", () => {
    expect(identityConfig.photo.enabled).toBe(false);
  });

  it("photo src points to the headshot path", () => {
    expect(identityConfig.photo.src).toBe("/images/headshot.jpg");
  });

  it("photo alt text is non-empty", () => {
    expect(identityConfig.photo.alt.length).toBeGreaterThan(0);
  });
});
