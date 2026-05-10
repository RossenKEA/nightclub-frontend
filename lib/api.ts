const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEvents() {
    const res = await fetch(`${API_URL}/events`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch events");
    }

    return res.json();
}

export async function getEvent(id: string) {
    const res = await fetch(`${API_URL}/events/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch event");
    }

    return res.json();
}

export async function getFeaturedEvents() {
    const events = await getEvents();

    return events.filter((event: any) => event.isFeatured);
}