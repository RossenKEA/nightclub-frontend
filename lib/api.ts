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

export async function getComments(eventId: string) {
    const res = await fetch(
        `${API_URL}/comments?eventId=${eventId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Could not fetch comments");
    }

    return res.json();
}

export async function postComment(data: any) {
    const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Could not post comment");
    }

    return res.json();
}

export async function getReservations(eventId?: string) {
    const url = eventId
        ? `${API_URL}/reservations?eventId=${eventId}`
        : `${API_URL}/reservations`;

    const res = await fetch(url, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch reservations");
    }

    return res.json();
}

export async function getGallery() {
    const res = await fetch(`${API_URL}/gallery`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Could not fetch gallery");
    }

    return res.json();
}