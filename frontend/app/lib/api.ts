"use server"

import { cookies } from "next/headers";
import { refreshAccessToken } from "../actions/auth";
// import { refreshAccessToken } from "@/app/actions/auth";

export async function fetchWithAuth(url: string, options?: RequestInit) {
  const cookieStore = await cookies();
  let token = cookieStore.get("auth_token")?.value;
  if (!token) {
    token = await refreshAccessToken();
    if (!token) return null;
  }
  const res = await fetch(url, {
    ...options,
    headers: { ...options?.headers, Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    token = await refreshAccessToken();
    console.log("refresh token called");
    if (!token) return null; // redirect to login
    return fetch(url, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${token}` },
    });
  }
  return res;
}
