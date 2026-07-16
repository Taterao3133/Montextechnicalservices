import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/adminAuth";
import { addGalleryItem, deleteGalleryItem } from "../../../lib/content";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");
const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"]
]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function clean(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

async function safeDeleteUploadedImage(image) {
  if (!image?.startsWith("/uploads/gallery/")) {
    return;
  }

  const fileName = path.basename(image);
  await fs.rm(path.join(UPLOAD_DIR, fileName), { force: true }).catch(() => {});
}

export async function POST(request) {
  const auth = await requireAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return NextResponse.redirect(new URL("/admin?gallery=invalid", request.url), 303);
  }

  const action = clean(formData.get("action"), 20);

  if (action === "delete") {
    const id = clean(formData.get("id"), 80);

    if (!id) {
      return NextResponse.redirect(new URL("/admin?gallery=invalid", request.url), 303);
    }

    const deleted = await deleteGalleryItem(id);
    await safeDeleteUploadedImage(deleted?.image);
    revalidatePath("/gallery");
    revalidatePath("/admin");

    return NextResponse.redirect(new URL("/admin?gallery=deleted", request.url), 303);
  }

  const title = clean(formData.get("title"), 100);
  const category = clean(formData.get("category"), 40);
  const image = formData.get("image");

  if (!title || !category || !image || typeof image === "string") {
    return NextResponse.redirect(new URL("/admin?gallery=invalid", request.url), 303);
  }

  const extension = ALLOWED_TYPES.get(image.type);

  if (!extension || image.size > MAX_IMAGE_BYTES) {
    return NextResponse.redirect(new URL("/admin?gallery=invalid", request.url), 303);
  }

  const id = crypto.randomUUID();
  const fileName = `${id}.${extension}`;
  const bytes = Buffer.from(await image.arrayBuffer());

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, fileName), bytes);
  await addGalleryItem({
    id,
    title,
    category,
    image: `/uploads/gallery/${fileName}`
  });
  revalidatePath("/gallery");
  revalidatePath("/admin");

  return NextResponse.redirect(new URL("/admin?gallery=uploaded", request.url), 303);
}
