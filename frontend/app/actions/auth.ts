"use server";

import { cookies } from "next/headers";

export default async function storeToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true, // Prevents client-side JavaScript from reading the token (XSS protection)
    secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS
    sameSite: "lax", // Protects against CSRF attacks
    maxAge: 60 * 60 * 24 * 7, // Cookie expires in 1 week (in seconds)
    path: "/", // Accessible across the entire site
  });
}
