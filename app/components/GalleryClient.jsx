"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const categories = ["All", "Air Conditioning", "Electrical", "Plumbing", "Painting", "Gypsum", "Cleaning", "AMC"];

function getImageSrc(image) {
  return image?.startsWith("/") ? image : `/assets/${image}`;
}

export default function GalleryClient({ items }) {
  const [active, setActive] = useState("All");
  const [preview, setPreview] = useState(null);

  const visibleItems = useMemo(() => {
    if (active === "All") {
      return items;
    }

    return items.filter((item) => item.category === active);
  }, [active, items]);

  return (
    <>
      <div className="filterBar" aria-label="Gallery categories">
        {categories.map((category) => (
          <button
            className={active === category ? "isActive" : undefined}
            type="button"
            key={category}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="galleryGrid">
        {visibleItems.map((item) => (
          <button className="galleryItem" type="button" key={`${item.title}-${item.image}`} onClick={() => setPreview(item)}>
            <Image src={getImageSrc(item.image)} alt={item.title} width={420} height={270} />
            <span>{item.category}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      {preview ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={preview.title} onClick={() => setPreview(null)}>
          <button className="lightboxClose" type="button" aria-label="Close gallery preview">×</button>
          <div className="lightboxPanel" onClick={(event) => event.stopPropagation()}>
            <Image src={getImageSrc(preview.image)} alt={preview.title} width={980} height={620} />
            <div>
              <span>{preview.category}</span>
              <strong>{preview.title}</strong>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
