import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyForm } from "../../case-study-form";
import { updateCaseStudy } from "../../actions";

export const metadata: Metadata = { title: "Edit Case Study" };

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("case_studies").select("*").eq("id", id).maybeSingle();
  const caseStudy = data as CaseStudy | null;

  if (!caseStudy) notFound();

  const action = updateCaseStudy.bind(null, id);

  return (
    <div>
      <Link href="/admin/case-studies" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Case Studies
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">Edit Case Study</h1>
      <CaseStudyForm action={action} caseStudy={caseStudy} />
    </div>
  );
}
