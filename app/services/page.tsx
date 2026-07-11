import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ServiceOffer } from "@/lib/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Services",
  description: "Coaching and advisory services for CEOs, executives, and HR leaders.",
};

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_offers")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const services = (data ?? []) as ServiceOffer[];

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Services</h1>
      <p className="text-neutral-500 mb-12">
        Coaching and advisory work for leaders navigating complexity and change.
      </p>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading services. Please try again shortly.</p>
      ) : services.length === 0 ? (
        <p className="text-neutral-500">No services listed yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="block rounded-lg border border-neutral-200 p-6 hover:border-neutral-400 transition-colors"
            >
              <h2 className="font-medium mb-2">{service.title}</h2>
              <p className="text-sm text-neutral-500 mb-4">{service.summary}</p>
              <span className="text-sm text-blue-600">{service.cta_label} &rarr;</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
