import { defineTool } from "@lovable.dev/mcp-js";

const pricing = [
  { tier: "Starter", price_cad_monthly: 699, best_for: "Early-stage local businesses testing paid ads." },
  { tier: "Growth", price_cad_monthly: 2100, best_for: "Established businesses scaling lead flow across channels." },
  { tier: "Scale", price_cad_monthly: 4500, best_for: "Multi-location or high-volume operators." },
];

export default defineTool({
  name: "get_pricing",
  title: "Get pricing tiers",
  description: "Return AP Digital's monthly pricing tiers (CAD). Month-to-month, no long-term contracts.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(pricing, null, 2) }],
    structuredContent: { pricing, currency: "CAD", contract: "month-to-month" },
  }),
});
