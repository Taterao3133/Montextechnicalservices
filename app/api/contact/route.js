import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { services } from "../../data/siteData";

const SUBMISSIONS_PATH = path.join(process.cwd(), "app", "data", "contactSubmissions.json");
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map();
const allowedServices = new Set([...services.map((service) => service.title), "Other Technical Service"]);

function clean(value, maxLength) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function getIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, recent);
    return true;
  }

  submissionsByIp.set(ip, [...recent, now]);
  return false;
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return origin === new URL(request.url).origin;
}

async function saveSubmission(submission) {
  await fs.mkdir(path.dirname(SUBMISSIONS_PATH), { recursive: true });

  let existing = [];

  try {
    existing = JSON.parse(await fs.readFile(SUBMISSIONS_PATH, "utf8"));
  } catch {
    existing = [];
  }

  existing.push(submission);
  await fs.writeFile(SUBMISSIONS_PATH, `${JSON.stringify(existing.slice(-500), null, 2)}\n`, "utf8");
}

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return NextResponse.redirect(new URL("/?contact=invalid#contact", request.url), 303);
  }

  const ip = getIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.redirect(new URL("/?contact=limited#contact", request.url), 303);
  }

  const formData = await request.formData().catch(() => null);

  if (!formData || clean(formData.get("website"), 80)) {
    return NextResponse.redirect(new URL("/?contact=invalid#contact", request.url), 303);
  }

  const submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: clean(formData.get("name"), 80),
    phone: clean(formData.get("phone"), 40),
    service: clean(formData.get("service"), 80),
    message: clean(formData.get("message"), 1000)
  };

  if (!submission.name || !submission.phone || !submission.message || !allowedServices.has(submission.service)) {
    return NextResponse.redirect(new URL("/?contact=invalid#contact", request.url), 303);
  }

  await saveSubmission(submission);

  return NextResponse.redirect(new URL("/?contact=sent#contact", request.url), 303);
}
