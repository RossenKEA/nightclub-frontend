import Link from "next/link";

type EventCardProps = {
  event: any;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link key={event.id} href={`/events/${event.id}`}>
      <article className="border border-white/10 p-6 rounded-xl hover:border-pink-500 transition">
        <h2 className="text-2xl">
          {event.title || event.name}
        </h2>

        <p>{event.excerpt}</p>

        <p>{event.date}</p>
      </article>
    </Link>
  );
}