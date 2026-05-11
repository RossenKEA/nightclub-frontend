import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative flex h-36 items-center justify-center bg-black">
        <h1 className="text-center text-4xl font-bold uppercase tracking-[0.15em]">
          Contact Us
        </h1>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold uppercase text-pink-500">
            Get in touch
          </h2>

          <p className="mb-10 max-w-md leading-7 text-white/80">
            Send us a message if you have questions about events, table
            reservations, opening hours, or private bookings.
          </p>

          <div className="space-y-6 font-bold">
            <p>
              <span className="text-pink-500">Location:</span>
              <br />
              Kompagnistræde 278
              <br />
              1265 København K
            </p>

            <p>
              <span className="text-pink-500">Opening Hours:</span>
              <br />
              Wed - Thu 10:30 PM to 3 AM
              <br />
              Sat - Sun 11 PM to 5 AM
            </p>
          </div>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}