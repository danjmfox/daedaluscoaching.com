import { describe, it, expect } from "vitest";
import { hashString, mulberry32 } from "../../../core/maze/prng";

describe("hashString", () => {
  it("returns a non-negative integer (uint32 range)", () => {
    const h = hashString("labyrinth");
    expect(h).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(h)).toBe(true);
  });

  it("is deterministic", () => {
    expect(hashString("same")).toBe(hashString("same"));
  });

  it("produces different values for different inputs", () => {
    expect(hashString("abc")).not.toBe(hashString("xyz"));
    expect(hashString("abc")).not.toBe(hashString("ABC"));
  });

  it("handles empty string", () => {
    expect(() => hashString("")).not.toThrow();
    expect(hashString("")).toBeGreaterThanOrEqual(0);
  });
});

describe("mulberry32", () => {
  it("returns a callable", () => {
    expect(typeof mulberry32(42)).toBe("function");
  });

  it("produces values in [0, 1)", () => {
    const rng = mulberry32(42);
    for (let i = 0; i < 50; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("is deterministic — same seed reproduces same sequence", () => {
    const a = mulberry32(99);
    const b = mulberry32(99);
    for (let i = 0; i < 20; i++) {
      expect(a()).toBe(b());
    }
  });

  it("different seeds produce different sequences", () => {
    const s1 = Array.from({ length: 5 }, mulberry32(1));
    const s2 = Array.from({ length: 5 }, mulberry32(2));
    expect(s1).not.toEqual(s2);
  });
});
