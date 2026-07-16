import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, adminCookieOptions, createAdminSession, verifyAdminSession } from "./app/lib/adminAuth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const session = await verifyAdminSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
  const isAuthenticated = Boolean(session);

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginPage && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();

  if (isAuthenticated && session?.sub && process.env.ADMIN_SESSION_SECRET) {
    response.cookies.set({
      ...adminCookieOptions(),
      value: await createAdminSession(session.sub, process.env.ADMIN_SESSION_SECRET)
    });
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"]
};
