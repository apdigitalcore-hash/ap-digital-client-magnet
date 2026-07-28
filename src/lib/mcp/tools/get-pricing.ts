import { defineTool } from "@lovable.dev/mcp-js";

const pricing = [
  {
    service: "Paid Ads",
    price_cad_monthly: 759,
    description: "Meta & Google ad campaigns — built, managed, and optimized. Ad spend billed separately by Google/Meta.",
    url: "https://ap-digital.ca/services/paid-ads",
  },
  {
    service: "Social Media Management",
    price_cad_monthly: 849,
    description: "2 platforms managed, 12 custom posts/month, captions, scheduling, and community management.",
    url: "https://ap-digital.ca/services/social-media",
  },
];

export default defineTool({
  name: "get_pricing",
  title: "Get pricing",
  description: "Return AP Digital's per-service monthly pricing (CAD). Month-to-month, no long-term contracts, 90-day results guarantee.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(pricing, null, 2) }],
    structuredContent: {
      pricing,
      currency: "CAD",
      contract: "month-to-month",
      guarantee: "90-day results guarantee",
      pricing_page: "https://ap-digital.ca/pricing",
    },
  }),
});
