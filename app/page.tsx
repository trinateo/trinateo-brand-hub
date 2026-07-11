import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Profile, ServiceOffer, Testimonial } from "@/lib/types";

export const revalidate = 0;

async function getHomeData() {
  const supabase = await createClient();

  const [profileRes, servicesRes, testimonialsRes] = await Promise.all([
    supabase.from("profile").select("*").limit(1).maybeSingle(),
    supabase
      .from("service_offers")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .limit(3),
    supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .limit(3),
  ]);

  return {
    profile: profileRes.data as Profile | null,
    services: (servicesRes.data ?? []) as ServiceOffer[],
    testimonials: (testimonialsRes.data ?? []) as Testimonial[],
    error: profileRes.error || servicesRes.error || testimonialsRes.error,
  };
}

export default async function Home() {
  const { profile, services, testimonials, error } = await getHomeData();

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-neutral-500">
          Something went wrong loading this page. Please try again shortly.
        </p>
      </main>
    );
  }

  return (
    <main>
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="text-sm font-medium text-blue-600 mb-3">
          {profile?.full_name ?? "Trina Teo"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl">
          {profile?.tagline ??
            "Executive coach and leadership strategist helping CEOs and HR leaders build thriving organisations."}
        </h1>
        <div className="mt-8 flex gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            Enquire Now
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:border-neutral-400 transition-colors"
          >
            View Services
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-neutral-200">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-xl font-semibold tracking-tight">Services</h2>
          <Link href="/services" className="text-sm text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        {services.length === 0 ? (
          <p className="text-neutral-500">No services listed yet.</p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="block rounded-lg border border-neutral-200 p-6 hover:border-neutral-400 transition-colors"
              >
                <h3 className="font-medium mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-500">{service.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {testimonials.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-neutral-200">
          <h2 className="text-xl font-semibold tracking-tight mb-8">What clients say</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.id} className="rounded-lg bg-neutral-50 p-6">
                <blockquote className="text-sm text-neutral-700">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-medium">
                  {t.author_name}
                  {t.author_role && (
                    <span className="block text-neutral-500 font-normal">
                      {t.author_role}
                      {t.author_company ? `, ${t.author_company}` : ""}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
