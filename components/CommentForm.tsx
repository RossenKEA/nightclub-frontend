"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const commentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  content: z.string().min(5, "Comment must be at least 5 characters"),
});

type CommentFormData = z.infer<typeof commentSchema>;

type CommentFormProps = {
  eventId: number;
};

export default function CommentForm({ eventId }: CommentFormProps) {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  async function onSubmit(data: CommentFormData) {
    setMessage("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        name: data.name,
        content: data.content,
        date: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      setMessage("Could not post comment. Please try again.");
      return;
    }

    reset();
    setMessage("Comment posted.");
  }

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold uppercase">Leave a comment</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register("name")}
            placeholder="Your Name"
            className="w-full border border-white/30 bg-black p-4 text-white"
          />
          {errors.name && (
            <p className="mt-2 text-pink-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("content")}
            placeholder="Your Comment"
            rows={8}
            className="w-full border border-white/30 bg-black p-4 text-white"
          />
          {errors.content && (
            <p className="mt-2 text-pink-500">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="border-y border-white px-8 py-3 font-bold uppercase hover:text-pink-500 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {message && <p className="text-pink-500">{message}</p>}
      </form>
    </section>
  );
}