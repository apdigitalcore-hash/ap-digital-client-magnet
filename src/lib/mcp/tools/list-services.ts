import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const services = [
  { slug: "paid-ads", name: "Paid Ads (Meta & Google)", url: "https://ap-digital.ca/services/paid-ads" },
  { slug: "social-media", name: "Social Media Management", url: "https://ap-digital.ca/services/social-media" },
  { slug: "content-creation", name: "Short-form Content Creation", url: "https://ap-digital.ca/services/content-creation" },
  { slug: "seo", name: "Local SEO", url: "https://ap-digital.ca/services/seo" },
  { slug: "lead-generation", name: "Lead Generation Funnels", url: "https://ap-digital.ca/services/lead-generation" },
  { slug: "web-design", name: "Web Design", url: "https://ap-digital.ca/services/web-design" },
];

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the digital marketing services AP Digital offers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
