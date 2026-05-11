"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [feedback, setFeedback] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setFeedback("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contact_messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      setFeedback("Your message could not be sent. Please try again.");
      return;
    }

    reset();
    setFeedback("Your message has been sent.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register("name")}
          placeholder="Your Name"
          className="w-full border border-white/30 bg-black p-4 text-white outline-none focus:border-pink-500"
        />
        {errors.name && (
          <p className="mt-2 text-pink-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Your Email"
          className="w-full border border-white/30 bg-black p-4 text-white outline-none focus:border-pink-500"
        />
        {errors.email && (
          <p className="mt-2 text-pink-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Your Message"
          rows={8}
          className="w-full border border-white/30 bg-black p-4 text-white outline-none focus:border-pink-500"
        />
        {errors.message && (
          <p className="mt-2 text-pink-500">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="border-y border-white px-8 py-3 font-bold uppercase tracking-widest hover:text-pink-500 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {feedback && <p className="font-bold text-pink-500">{feedback}</p>}
    </form>
  );
}