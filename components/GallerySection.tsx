"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  id: number;
  asset: {
    url: string;
    alt: string;
  };
};

type GallerySectionProps = {
  gallery: GalleryItem[];
};

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? gallery[activeIndex] : null;

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === 0 ? gallery.length - 1 : activeIndex - 1
    );
  }

  function showNext() {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === gallery.length - 1 ? 0 : activeIndex + 1
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold uppercase tracking-[0.15em]">
          Night Club Gallery
        </h2>
        <p className="mt-4 text-white/70">
          Moments from events, concerts and club nights.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item, index) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${item.asset.url}`;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative h-72 overflow-hidden border border-white/10 text-left focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <Image
                src={imageUrl}
                alt={item.asset.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/50" />
            </button>
          );
        })}
      </div>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-8 top-8 text-4xl font-bold text-white hover:text-pink-500"
            aria-label="Close image"
          >
            ×
          </button>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-6 text-5xl font-bold text-white hover:text-pink-500"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="relative h-[75vh] w-full max-w-5xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${activeItem.asset.url}`}
              alt={activeItem.asset.alt}
              fill
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-6 text-5xl font-bold text-white hover:text-pink-500"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}