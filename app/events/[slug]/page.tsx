type Props = {
  params: {
    slug: string;
  };
};

async function getEvent(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not fetch event");
  }

  return res.json();
}

export default async function EventPage({ params }: Props) {
  const event = await getEvent(params.slug);

  return (
    <main className="p-10">
      <h1 className="text-5xl mb-6">
        {event.title || event.name}
      </h1>

      <p>{event.description}</p>
    </main>
  );
}