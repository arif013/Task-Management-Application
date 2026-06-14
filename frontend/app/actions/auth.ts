"use server";

import { cookies } from "next/headers";

export default async function storeToken(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", accessToken, {
    httpOnly: true, // Prevents client-side JavaScript from reading the token (XSS protection)
    secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS
    sameSite: "lax", // Protects against CSRF attacks
    maxAge: 60 * 30, // Cookie expires in 30 mins (in seconds)
    path: "/", // Accessible across the entire site
  });
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true, // Prevents client-side JavaScript from reading the token (XSS protection)
    secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS
    sameSite: "lax", // Protects against CSRF attacks
    maxAge: 60 * 60 * 24 * 30, // Cookie expires in 30 days (in seconds)
    path: "/", // Accessible across the entire site
  });
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    },
  );
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  cookieStore.set("auth_token", data.accessToken, {
    httpOnly: true, // Prevents client-side JavaScript from reading the token (XSS protection)
    secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS
    sameSite: "lax", // Protects against CSRF attacks
    maxAge: 60 * 30, // Cookie expires in 30 mins (in seconds)
    path: "/", // Accessible across the entire site
  });
  return data.accessToken;
}
