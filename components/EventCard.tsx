import Image from "next/image";
import Link from "next/link";

export type Event = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  doorsOpen: string;
  location: string;
  asset: { url: string; alt: string };
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${event.asset.url}`;
  const date = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const doorsOpen = new Date(event.doorsOpen).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link href={`/events/${event.slug}`}>
      <article className="group border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-pink-500/50">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={event.asset.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold uppercase tracking-wider">
            {event.title}
          </h2>

          <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold uppercase tracking-wider text-pink-500">
            <span>{date}</span>
            <span>Doors: {doorsOpen}</span>
            <span>{event.location}</span>
          </div>

          <p className="mb-6 text-white/70">{event.excerpt}</p>

          <span className="inline-block border-y border-white px-6 py-2 text-sm font-bold uppercase tracking-widest transition-colors group-hover:text-pink-500">
            Read More
          </span>
        </div>
      </article>
    </Link>
  );
}