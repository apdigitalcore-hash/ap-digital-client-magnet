import { defineTool } from "@lovable.dev/mcp-js";

const services = [
  {
    slug: "paid-ads",
    name: "Paid Ads (Meta & Google)",
    price_cad_monthly: 759,
    url: "https://ap-digital.ca/services/paid-ads",
  },
  {
    slug: "social-media",
    name: "Social Media Management",
    price_cad_monthly: 849,
    url: "https://ap-digital.ca/services/social-media",
  },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the digital marketing services AP Digital offers with monthly CAD pricing.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services, currency: "CAD" },
  }),
});
