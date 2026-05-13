import { getFeaturedEvents } from "@/lib/api";
import EventCard from "@/components/EventCard";
import NewsletterForm from "@/components/NewsletterForm";
import Hero from "@/components/Hero";
import GallerySectionServer from "@/components/GallerySectionServer";
import MusicPlayer from "@/components/MusicPlayer";

export default async function Home() {
  const featuredEvents = await getFeaturedEvents();

  return (
  <main className="p-10">
      <Hero />
      <h1 className="text-5xl mb-10">Night Club</h1>

      <section>
        <h2 className="text-3xl mb-6">Featured Events</h2>

        <div className="grid gap-8">
          {featuredEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <GallerySectionServer />

      <MusicPlayer />

      <section className="px-6 py-20 text-center">
  <h2 className="mb-6 text-3xl font-bold uppercase tracking-wider">
    Join Our Mailing List
  </h2>

  <p className="mx-auto mb-8 max-w-xl text-white/70">
    Subscribe to receive news about upcoming events and club nights.
  </p>

  <NewsletterForm />
      </section>
  </main>
  );
}