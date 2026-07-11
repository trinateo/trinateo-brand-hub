import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudy } from "@/lib/types";
import { toggleCaseStudyPublished } from "./actions";

export const metadata: Metadata = { title: "Case Studies" };
export const revalidate = 0;

export default async function AdminCaseStudiesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("sort_order", { ascending: true });

  const caseStudies = (data ?? []) as CaseStudy[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Case Studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center rounded-md bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-700"
        >
          New Case Study
        </Link>
      </div>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading case studies. Please try again shortly.</p>
      ) : caseStudies.length === 0 ? (
        <p className="text-neutral-500">No case studies yet. Create your first one.</p>
      ) : (
        <div className="space-y-3">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4"
            >
              <div>
                <p className="font-medium">{cs.title}</p>
                <p className="text-sm text-neutral-500">{cs.client_sector}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    cs.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {cs.published ? "Published" : "Draft"}
                </span>
                <form action={toggleCaseStudyPublished.bind(null, cs.id, cs.published)}>
                  <button
                    type="submit"
                    className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                  >
                    {cs.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <Link
                  href={`/admin/case-studies/${cs.id}/edit`}
                  className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
