import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";
import { TestimonialForm } from "../../testimonial-form";
import { updateTestimonial } from "../../actions";

export const metadata: Metadata = { title: "Edit Testimonial" };

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const [testimonialRes, servicesRes] = await Promise.all([
    supabase.from("testimonials").select("*").eq("id", id).maybeSingle(),
    supabase.from("service_offers").select("id,title").order("sort_order"),
  ]);

  const testimonial = testimonialRes.data as Testimonial | null;
  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <div>
      <Link href="/admin/testimonials" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Testimonials
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">Edit Testimonial</h1>
      <TestimonialForm action={action} testimonial={testimonial} services={servicesRes.data ?? []} />
    </div>
  );
}
