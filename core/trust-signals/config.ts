export interface TrustSignalsConfig {
  bcorp: { enabled: boolean; label: string };
  onePercentPlanet: { enabled: boolean; label: string };
  accreditations: { enabled: boolean; items: string[] };
}

export const trustSignalsConfig: TrustSignalsConfig = {
  bcorp: { enabled: true, label: "B Corp Certified" },
  onePercentPlanet: { enabled: true, label: "1% for the Planet" },
  accreditations: {
    enabled: true,
    items: [
      "ICAgile Enterprise Coach (ICP-ENT)",
      "The Art of Professional Coaching (AWA Global)",
      "ORSC Foundation (CRRUK)",
    ],
  },
};

export function enabledSignals(config: TrustSignalsConfig) {
  return [
    config.bcorp.enabled && { key: "bcorp", label: config.bcorp.label },
    config.onePercentPlanet.enabled && {
      key: "onePercentPlanet",
      label: config.onePercentPlanet.label,
    },
    ...(config.accreditations.enabled
      ? config.accreditations.items.map((item) => ({
          key: item,
          label: item,
        }))
      : []),
  ].filter(Boolean) as { key: string; label: string }[];
}
