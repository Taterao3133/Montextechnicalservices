import { NextResponse } from "next/server";
import { adminCookieOptions } from "../../../lib/adminAuth";

export async function POST(request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);

  response.cookies.set({
    ...adminCookieOptions(0),
    value: "",
  });

  return response;
}
