import { createClient } from "@openauthjs/openauth/client";
import { cookies as getCookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL;
const APP_DOMAIN = process.env.APP_DOMAIN;

export const client = createClient({
  clientID: "web",
  issuer: AUTH_URL,
})

export const setTokens = async (access: string, refresh: string) => {
  const cookies = await getCookies()

  cookies.set({
    name: "access_token",
    value: access,
    httpOnly: true,
    sameSite: "lax",
    domain: `.${APP_DOMAIN}`,
    path: "/",
    maxAge: 34560000,
  })
  cookies.set({
    name: "refresh_token",
    value: refresh,
    httpOnly: true,
    sameSite: "lax",
    domain: `.${APP_DOMAIN}`,
    path: "/",
    maxAge: 34560000,
  })
}
