import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudy, Testimonial } from "@/lib/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Proof",
  description: "Case studies and client testimonials.",
};

export default async function ProofPage() {
  const supabase = await createClient();
  const [caseStudiesRes, testimonialsRes] = await Promise.all([
    supabase
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true }),
  ]);

  const caseStudies = (caseStudiesRes.data ?? []) as CaseStudy[];
  const testimonials = (testimonialsRes.data ?? []) as Testimonial[];
  const error = caseStudiesRes.error || testimonialsRes.error;

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-neutral-500">Something went wrong loading this page. Please try again shortly.</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Proof</h1>
      <p className="text-neutral-500 mb-12">Case studies and client testimonials.</p>

      <section className="mb-16">
        <h2 className="text-xl font-semibold tracking-tight mb-6">Case Studies</h2>
        {caseStudies.length === 0 ? (
          <p className="text-neutral-500">No case studies listed yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <article key={cs.id} className="rounded-lg border border-neutral-200 p-6">
                <p className="text-xs font-medium text-blue-600 mb-2">{cs.client_sector}</p>
                <h3 className="font-medium mb-3">{cs.title}</h3>
                {cs.challenge && (
                  <p className="text-sm text-neutral-500 mb-2">
                    <span className="font-medium text-neutral-700">Challenge: </span>
                    {cs.challenge}
                  </p>
                )}
                {cs.outcome && (
                  <p className="text-sm text-neutral-500">
                    <span className="font-medium text-neutral-700">Outcome: </span>
                    {cs.outcome}
                  </p>
                )}
                {cs.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-neutral-100 rounded-full px-2.5 py-1 text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-6">Testimonials</h2>
        {testimonials.length === 0 ? (
          <p className="text-neutral-500">No testimonials listed yet.</p>
        ) : (
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
        )}
      </section>
    </main>
  );
}
