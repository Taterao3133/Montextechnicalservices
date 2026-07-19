import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { NextResponse } from "next/server";
import { company as fallbackCompany, services } from "../../data/siteData";

export const runtime = "nodejs";

const SUBMISSIONS_PATH = path.join(process.cwd(), "app", "data", "contactSubmissions.json");
const FALLBACK_SUBMISSIONS_PATH = path.join(os.tmpdir(), "montex-contactSubmissions.json");
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map();
const allowedServices = new Set([...services.map((service) => service.title), "Other Technical Service"]);

function clean(value, maxLength) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

async function writeSubmission(filePath, submission) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  let existing = [];

  try {
    existing = JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    existing = [];
  }

  existing.push(submission);
  await fs.writeFile(filePath, `${JSON.stringify(existing.slice(-500), null, 2)}\n`, "utf8");
}

async function saveSubmission(submission) {
  try {
    await writeSubmission(SUBMISSIONS_PATH, submission);
  } catch (error) {
    console.error("Unable to save contact submission in app data directory.", error);
    await writeSubmission(FALLBACK_SUBMISSIONS_PATH, submission);
  }
}

async function sendSubmissionEmail(submission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || fallbackCompany.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Montex Technical Services <onboarding@resend.dev>";

  if (!apiKey || !to || !from) {
    throw new Error("Contact email is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
  }

  const html = `
    <h2>New Montex enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
    <p><strong>Service:</strong> ${escapeHtml(submission.service)}</p>
    <p><strong>Submitted:</strong> ${escapeHtml(submission.createdAt)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(submission.message).replaceAll("\n", "<br>")}</p>
  `;
  const text = [
    "New Montex enquiry",
    `Name: ${submission.name}`,
    `Phone: ${submission.phone}`,
    `Service: ${submission.service}`,
    `Submitted: ${submission.createdAt}`,
    "",
    submission.message
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "montex-website"
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New enquiry: ${submission.service}`,
      text,
      html
    })
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Email provider rejected contact submission. Status: ${response.status}. ${errorBody}`);
  }
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

  try {
    await sendSubmissionEmail(submission);
  } catch (error) {
    console.error("Unable to send contact submission email.", error);
    return NextResponse.redirect(new URL("/?contact=email#contact", request.url), 303);
  }

  return NextResponse.redirect(new URL("/?contact=sent#contact", request.url), 303);
}
