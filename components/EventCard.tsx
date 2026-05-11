import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  event: any;
};

export default function EventCard({ event }: EventCardProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${event.asset.url}`;

  return (
    <Link href={`/events/${event.id}`}>
      <article className="border border-white/10 p-6 rounded-xl">
        <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={event.asset.alt}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-2xl">{event.title}</h2>
        <p>{event.excerpt}</p>
        <p>{event.date}</p>
      </article>
    </Link>
  );
}