import { getEventsPaginated } from "@/lib/api";
import EventCard, { type Event } from "@/components/EventCard";
import Pagination from "@/components/Pagination";

const EVENTS_PER_PAGE = 3;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EventsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const { events, total } = await getEventsPaginated(currentPage, EVENTS_PER_PAGE);
  const totalPages = Math.ceil(total / EVENTS_PER_PAGE);

  return (
    <main className="bg-black text-white">
      <section className="relative flex h-36 items-center justify-center">
        <h1 className="text-center text-4xl font-bold uppercase tracking-[0.15em]">
          Events
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-8">
          {events.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </main>
  );
}