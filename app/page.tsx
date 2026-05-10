import { getEvents } from "@/lib/api";

export default async function Home() {
  const events = await getEvents();
  const featuredEvents = events.filter((event: any) => event.isFeatured);

  return (
    <main>
      <h1>Night Club</h1>

      <section>
        <h2>Featured Events</h2>

        {featuredEvents.map((event: any) => (
          <article key={event.id}>
            <h3>{event.title || event.name}</h3>
            <p>{event.excerpt}</p>
            <p>{event.date}</p>
          </article>
        ))}
      </section>
    </main>
  );
}