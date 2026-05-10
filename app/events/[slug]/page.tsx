import { getEvent } from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);

  return (
    <main className="p-10">
      <h1 className="text-5xl mb-6">
        {event.title || event.name}
      </h1>

      <p>{event.description}</p>
    </main>
  );
}