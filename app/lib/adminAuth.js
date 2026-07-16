import { NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "montex_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 2 * 60;
export const ADMIN_SESSION_TTL_MS = ADMIN_SESSION_TTL_SECONDS * 1000;

function base64UrlEncode(value) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return atob(padded);
}

export function safeEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

async function sign(value, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

export async function createAdminSession(username, secret) {
  const payload = base64UrlEncode(JSON.stringify({
    sub: username,
    exp: Date.now() + ADMIN_SESSION_TTL_MS
  }));
  const signature = await sign(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifyAdminSession(cookieValue, secret = process.env.ADMIN_SESSION_SECRET) {
  if (!secret || !cookieValue) {
    return null;
  }

  const [payload, signature] = cookieValue.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = await sign(payload, secret);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload));
    const now = Date.now();

    if (!session?.sub || session.exp <= now || now + ADMIN_SESSION_TTL_MS < session.exp) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function adminCookieOptions(maxAge = ADMIN_SESSION_TTL_SECONDS) {
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge
  };
}

export function isSameOriginPost(request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return origin === new URL(request.url).origin;
}

export async function requireAdmin(request) {
  if (!isSameOriginPost(request)) {
    return {
      authorized: false,
      response: NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303)
    };
  }

  const session = await verifyAdminSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value);

  if (!session) {
    return {
      authorized: false,
      response: NextResponse.redirect(new URL("/admin/login?next=/admin", request.url), 303)
    };
  }

  return { authorized: true, session };
}
