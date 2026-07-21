import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import listLocations from "./tools/list-locations";
import getPricing from "./tools/get-pricing";
import getContact from "./tools/get-contact";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "ap-digital-mcp",
  title: "AP Digital MCP",
  version: "0.1.0",
  instructions:
    "Tools for AP Digital, a Vancouver, BC digital marketing agency. Use these tools to look up services, service locations, pricing tiers, and contact/booking info.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServices, listLocations, getPricing, getContact],
});
