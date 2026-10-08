import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
];

export function proxy(request: NextRequest) {
  const hasAccessToken = Boolean(request.cookies.get("accessToken")?.value);
  const isAuthRoute = AUTH_ROUTES.includes(request.nextUrl.pathname);

  if (hasAccessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-otp",
  ],
};
