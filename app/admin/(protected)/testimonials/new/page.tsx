import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "../testimonial-form";
import { createTestimonial } from "../actions";

export const metadata: Metadata = { title: "New Testimonial" };

export default async function NewTestimonialPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("service_offers").select("id,title").order("sort_order");

  return (
    <div>
      <Link href="/admin/testimonials" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Testimonials
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">New Testimonial</h1>
      <TestimonialForm action={createTestimonial} services={data ?? []} />
    </div>
  );
}
