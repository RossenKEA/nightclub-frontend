import Image from "next/image";
import { getGallery } from "@/lib/api";

export default async function GallerySection() {
  const gallery = await getGallery();

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
        {gallery.map((item: any) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${item.asset.url}`;

          return (
            <article
              key={item.id}
              className="group relative h-72 overflow-hidden border border-white/10"
            >
              <Image
                src={imageUrl}
                alt={item.asset.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/50" />
            </article>
          );
        })}
      </div>
    </section>
  );
}