"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const bookingSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  guests: z.string().min(1, "Enter number of guests"),
  table: z.string().min(1, "Choose a table"),
  eventId: z.string().min(1, "Choose an event"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

type Event = {
  id: number;
  title: string;
  date: string;
};

type BookingFormProps = {
  events: Event[];
};

export default function BookingForm({ events }: BookingFormProps) {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedTable = watch("table");

  async function onSubmit(data: BookingFormData) {
    setMessage("");

    const selectedEvent = events.find(
      (event) => event.id.toString() === data.eventId
    );

    if (!selectedEvent) {
      setMessage("Please choose a valid event.");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        guests: data.guests,
        table: data.table,
        eventId: Number(data.eventId),
        date: selectedEvent.date,
      }),
    });

    if (!res.ok) {
      setMessage("This table may already be booked. Please choose another.");
      return;
    }

    reset();
    setMessage("Your table has been reserved.");
  }

  return (
    <section className="grid gap-12 lg:grid-cols-2">
      <div>
        <h2 className="mb-6 text-2xl font-bold uppercase">Choose a table</h2>

        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, index) => {
            const tableNumber = String(index + 1);

            return (
              <button
                key={tableNumber}
                type="button"
                onClick={() => setValue("table", tableNumber)}
                className={`aspect-square border text-xl font-bold ${
                  selectedTable === tableNumber
                    ? "border-pink-500 text-pink-500"
                    : "border-white/30 text-white"
                }`}
              >
                {tableNumber}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <select
            {...register("eventId")}
            className="w-full border border-white/30 bg-black p-4 text-white"
          >
            <option value="">Choose event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
          {errors.eventId && (
            <p className="mt-2 text-pink-500">{errors.eventId.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("table")}
            placeholder="Table number"
            readOnly
            className="w-full border border-white/30 bg-black p-4 text-white"
          />
          {errors.table && (
            <p className="mt-2 text-pink-500">{errors.table.message}</p>
          )}
        </div>

        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border border-white/30 bg-black p-4 text-white"
        />
        {errors.name && <p className="text-pink-500">{errors.name.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border border-white/30 bg-black p-4 text-white"
        />
        {errors.email && <p className="text-pink-500">{errors.email.message}</p>}

        <input
          {...register("phone")}
          placeholder="Phone"
          className="w-full border border-white/30 bg-black p-4 text-white"
        />
        {errors.phone && <p className="text-pink-500">{errors.phone.message}</p>}

        <input
          {...register("guests")}
          placeholder="Guests"
          className="w-full border border-white/30 bg-black p-4 text-white"
        />
        {errors.guests && (
          <p className="text-pink-500">{errors.guests.message}</p>
        )}

        <button
          disabled={isSubmitting}
          className="border-y border-white px-8 py-3 font-bold uppercase hover:text-pink-500 disabled:opacity-50"
        >
          {isSubmitting ? "Reserving..." : "Reserve"}
        </button>

        {message && <p className="text-pink-500">{message}</p>}
      </form>
    </section>
  );
}