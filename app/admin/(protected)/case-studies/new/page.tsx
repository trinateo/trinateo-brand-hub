import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyForm } from "../case-study-form";
import { createCaseStudy } from "../actions";

export const metadata: Metadata = { title: "New Case Study" };

export default function NewCaseStudyPage() {
  return (
    <div>
      <Link href="/admin/case-studies" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Case Studies
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">New Case Study</h1>
      <CaseStudyForm action={createCaseStudy} />
    </div>
  );
}
