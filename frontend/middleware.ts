import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard","/my-tasks","/settings", "/admin", "/admin/manage-users", "/admin/manage-tasks"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  NextResponse.next();
}
