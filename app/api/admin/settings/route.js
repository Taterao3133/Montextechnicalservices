import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/adminAuth";
import { updateCompany } from "../../../lib/content";

const FIELD_LIMITS = {
  name: 100,
  phone: 30,
  whatsapp: 30,
  email: 120,
  address: 240,
  maps: 500,
  hours: 80,
  instagram: 500,
  linkedin: 500
};

function clean(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function isSafeUrl(value) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function POST(request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return NextResponse.redirect(new URL("/admin?settings=invalid", request.url), 303);
  }

  const company = Object.fromEntries(
    Object.entries(FIELD_LIMITS).map(([field, limit]) => [field, clean(formData.get(field), limit)])
  );

  if (!company.name || !company.phone || !company.whatsapp || !company.email || !company.address || !company.hours) {
    return NextResponse.redirect(new URL("/admin?settings=invalid", request.url), 303);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.email)) {
    return NextResponse.redirect(new URL("/admin?settings=invalid", request.url), 303);
  }

  if (![company.maps, company.instagram, company.linkedin].every(isSafeUrl)) {
    return NextResponse.redirect(new URL("/admin?settings=invalid", request.url), 303);
  }

  await updateCompany(company);
  revalidatePath("/", "layout");

  return NextResponse.redirect(new URL("/admin?settings=saved", request.url), 303);
}
