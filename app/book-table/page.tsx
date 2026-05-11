import { getEvents } from "@/lib/api";
import BookingForm from "@/components/BookingForm";

export default async function BookTablePage() {
  const events = await getEvents();

  return (
    <main className="p-10">
      <h1 className="mb-10 text-5xl font-bold uppercase">Book Table</h1>

      <BookingForm events={events} />
    </main>
  );
}