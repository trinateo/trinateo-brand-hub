import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ServiceOffer } from "@/lib/types";

export const revalidate = 0;

async function getService(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("service_offers")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data as ServiceOffer | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("headshot_url")
    .limit(1)
    .maybeSingle();

  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: service.title,
      description: service.summary,
      images: profile?.headshot_url ? [{ url: profile.headshot_url }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/services" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; All services
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight mt-4 mb-4">{service.title}</h1>
      <p className="text-lg text-neutral-600 mb-10">{service.summary}</p>

      {service.description && (
        <section className="mb-8">
          <p className="text-neutral-700 whitespace-pre-line">{service.description}</p>
        </section>
      )}

      {service.who_its_for && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-2">
            Who it&rsquo;s for
          </h2>
          <p className="text-neutral-700">{service.who_its_for}</p>
        </section>
      )}

      {service.outcomes && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-2">
            Outcomes
          </h2>
          <p className="text-neutral-700">{service.outcomes}</p>
        </section>
      )}

      <Link
        href={{ pathname: "/contact", query: { service: service.slug } }}
        className="inline-flex items-center rounded-md bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-700 transition-colors"
      >
        {service.cta_label || "Enquire Now"}
      </Link>
    </main>
  );
}
