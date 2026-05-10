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