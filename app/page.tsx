import { getFeaturedEvents } from "@/lib/api";
import EventCard from "@/components/EventCard";

export default async function Home() {
  const featuredEvents = await getFeaturedEvents();

  return (
    <main className="p-10">
      <h1 className="text-5xl mb-10">Night Club</h1>

      <section>
        <h2 className="text-3xl mb-6">Featured Events</h2>

        <div className="grid gap-8">
          {featuredEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}