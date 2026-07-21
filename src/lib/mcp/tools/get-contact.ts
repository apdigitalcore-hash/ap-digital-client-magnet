import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description: "Return AP Digital's contact channels and booking link.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: "Email: apdigital.core@gmail.com\nPhone: +1-778-682-5772\nBook a call: https://calendly.com/apdigital-core/20min" }],
    structuredContent: {
      email: "apdigital.core@gmail.com",
      phone: "+1-778-682-5772",
      booking_url: "https://calendly.com/apdigital-core/20min",
      website: "https://ap-digital.ca",
    },
  }),
});
