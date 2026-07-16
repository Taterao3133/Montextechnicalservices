import { promises as fs } from "fs";
import path from "path";
import { company as fallbackCompany, galleryItems as fallbackGalleryItems } from "../data/siteData";

const DATA_PATH = path.join(process.cwd(), "app", "data", "content.json");

const defaultContent = {
  company: {
    ...fallbackCompany,
    maps: "",
    instagram: "",
    linkedin: ""
  },
  galleryItems: fallbackGalleryItems
};

export function getGalleryItemId(item) {
  if (item.id) {
    return item.id;
  }

  return `${item.image}-${item.title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function ensureContentFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, `${JSON.stringify(defaultContent, null, 2)}\n`, "utf8");
  }
}

export async function getContent() {
  await ensureContentFile();

  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw);

    const galleryItems = Array.isArray(parsed.galleryItems) ? parsed.galleryItems : defaultContent.galleryItems;

    return {
      company: { ...defaultContent.company, ...parsed.company },
      galleryItems: galleryItems.map((item) => ({ ...item, id: getGalleryItemId(item) }))
    };
  } catch {
    return {
      ...defaultContent,
      galleryItems: defaultContent.galleryItems.map((item) => ({ ...item, id: getGalleryItemId(item) }))
    };
  }
}

export async function updateCompany(company) {
  const content = await getContent();
  const nextContent = {
    ...content,
    company: {
      ...content.company,
      ...company
    }
  };

  await fs.writeFile(DATA_PATH, `${JSON.stringify(nextContent, null, 2)}\n`, "utf8");
  return nextContent.company;
}

export async function addGalleryItem(item) {
  const content = await getContent();
  const nextItem = {
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image
  };
  const nextContent = {
    ...content,
    galleryItems: [nextItem, ...content.galleryItems]
  };

  await fs.writeFile(DATA_PATH, `${JSON.stringify(nextContent, null, 2)}\n`, "utf8");
  return nextItem;
}

export async function deleteGalleryItem(id) {
  const content = await getContent();
  const item = content.galleryItems.find((galleryItem) => getGalleryItemId(galleryItem) === id);
  const nextContent = {
    ...content,
    galleryItems: content.galleryItems.filter((galleryItem) => getGalleryItemId(galleryItem) !== id)
  };

  await fs.writeFile(DATA_PATH, `${JSON.stringify(nextContent, null, 2)}\n`, "utf8");
  return item;
}

export function getImageSrc(image) {
  if (image?.startsWith("/")) {
    return image;
  }

  return `/assets/${image}`;
}
