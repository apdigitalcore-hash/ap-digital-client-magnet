import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const locations = [
  "Vancouver", "Surrey", "Burnaby", "Richmond",
  "Langley", "Coquitlam", "Abbotsford",
].map((city) => ({
  city,
  url: `https://ap-digital.ca/${city.toLowerCase()}`,
}));

export default defineTool({
  name: "list_locations",
  title: "List service locations",
  description: "List the BC cities/regions AP Digital serves with dedicated pages.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(locations, null, 2) }],
    structuredContent: { locations },
  }),
});
