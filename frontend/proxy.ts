import { NextRequest, NextResponse } from "next/server";
import path from "path";

const protectedRoutes = ["/dashboard", "/my-tasks", "/settings"];
const adminRoutes = ["/admin", "/admin/manage-users", "/admin/manage-tasks"];

export function proxy(request: NextRequest) {
  const role = request.cookies.get("user_role")?.value;
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAdmin = adminRoutes.some((route) => pathname.startsWith(route));

  if (!token) {
    if (isProtected || isAdmin) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    NextResponse.next();
  }
  if (isAdmin && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
