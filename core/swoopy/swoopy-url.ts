const BASE = "/swoopy/";

export function swoopyUrl(modelId?: string, graph?: string): string {
  if (!modelId && !graph) return BASE;
  const params = new URLSearchParams();
  if (modelId) params.set("m", modelId);
  if (graph) params.set("g", graph);
  return `${BASE}?${params.toString()}`;
}
