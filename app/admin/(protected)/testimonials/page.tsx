import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";
import { deleteTestimonial } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata: Metadata = { title: "Testimonials" };
export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  const testimonials = (data ?? []) as Testimonial[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center rounded-md bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-700"
        >
          New Testimonial
        </Link>
      </div>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading testimonials. Please try again shortly.</p>
      ) : testimonials.length === 0 ? (
        <p className="text-neutral-500">No testimonials yet. Create your first one.</p>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4"
            >
              <div className="min-w-0">
                <p className="font-medium">{t.author_name}</p>
                <p className="text-sm text-neutral-500 truncate">{t.quote}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    t.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {t.published ? "Published" : "Draft"}
                </span>
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteTestimonial.bind(null, t.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
