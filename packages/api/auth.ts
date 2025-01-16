import { createClient } from "@openauthjs/openauth/client";

const AUTH_URL = process.env.AUTH_URL;

export const client = createClient({
  clientID:"api",
  issuer: AUTH_URL,
});
