import { getEvents } from "@/lib/api";
import Link from "next/link";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-10">Events</h1>

      <div className="grid gap-8">
        {events.map((event: any) => (
        <Link key={event.id} href={`/events/${event.id}`}>
            <article className="border border-white/10 p-6 rounded-xl">
            <h2 className="text-2xl">{event.title || event.name}</h2>

            <p>ID: {event.id}</p>
            <p>Slug: {event.slug}</p>

            <p>{event.excerpt}</p>
            <p>{event.date}</p>
            </article>
        </Link>
        ))}
      </div>
    </main>
  );
}