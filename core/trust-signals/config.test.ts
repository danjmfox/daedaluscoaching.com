import { describe, it, expect } from "vitest";
import {
  enabledSignals,
  trustSignalsConfig,
  type TrustSignalsConfig,
} from "./config";

describe("enabledSignals", () => {
  it("returns only enabled signals", () => {
    const config: TrustSignalsConfig = {
      bcorp: { enabled: true, label: "B Corp Certified" },
      onePercentPlanet: { enabled: false, label: "1% for the Planet" },
      accreditations: { enabled: false, items: ["ICAgile"] },
    };

    const result = enabledSignals(config);

    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("B Corp Certified");
  });

  it("returns nothing when all signals are disabled", () => {
    const config: TrustSignalsConfig = {
      bcorp: { enabled: false, label: "B Corp Certified" },
      onePercentPlanet: { enabled: false, label: "1% for the Planet" },
      accreditations: { enabled: false, items: ["ICAgile"] },
    };

    expect(enabledSignals(config)).toHaveLength(0);
  });

  it("returns one entry per accreditation item when enabled", () => {
    const config: TrustSignalsConfig = {
      bcorp: { enabled: false, label: "B Corp Certified" },
      onePercentPlanet: { enabled: false, label: "1% for the Planet" },
      accreditations: { enabled: true, items: ["ICAgile", "ORSC"] },
    };

    const result = enabledSignals(config);

    expect(result).toHaveLength(2);
    expect(result.map((s) => s.label)).toEqual(["ICAgile", "ORSC"]);
  });

  it("returns no accreditation items when accreditations are disabled", () => {
    const config: TrustSignalsConfig = {
      bcorp: { enabled: false, label: "B Corp Certified" },
      onePercentPlanet: { enabled: false, label: "1% for the Planet" },
      accreditations: { enabled: false, items: ["ICAgile", "ORSC"] },
    };

    expect(enabledSignals(config)).toHaveLength(0);
  });

  it("matches the live config — only ICAgile is currently enabled", () => {
    const result = enabledSignals(trustSignalsConfig);

    const labels = result.map((s) => s.label);
    expect(labels).toContain("ICAgile Enterprise Coach (ICP-ENT)");
    expect(labels).not.toContain("B Corp Certified");
    expect(labels).not.toContain("1% for the Planet");
  });
});
