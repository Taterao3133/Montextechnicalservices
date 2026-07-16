import { NextResponse } from "next/server";
import { adminCookieOptions, createAdminSession, isSameOriginPost, safeEqual } from "../../../lib/adminAuth";

function getSafeRedirect(value) {
  if ((value === "/admin" || value?.startsWith("/admin/")) && value !== "/admin/login") {
    return value;
  }

  return "/admin";
}

export async function POST(request) {
  if (!isSameOriginPost(request)) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
  }

  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  const formData = await request.formData().catch(() => new FormData());
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = getSafeRedirect(String(formData.get("next") ?? ""));

  if (!configuredUsername || !configuredPassword || !sessionSecret) {
    return NextResponse.redirect(new URL("/admin/login?setup=required", request.url), 303);
  }

  const validCredentials =
    safeEqual(username, configuredUsername) && safeEqual(password, configuredPassword);

  if (!validCredentials) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
  }

  const sessionValue = await createAdminSession(configuredUsername, sessionSecret);
  const response = NextResponse.redirect(new URL(next, request.url), 303);

  response.cookies.set({
    ...adminCookieOptions(),
    value: sessionValue
  });

  return response;
}
