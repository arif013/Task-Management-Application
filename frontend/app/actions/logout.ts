"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_role");
  cookieStore.delete("refresh_token");
  redirect("/");
}
