import type { Metadata } from "next";
import Link from "next/link";
import { ResourceForm } from "../resource-form";
import { createResource } from "../actions";

export const metadata: Metadata = { title: "New Resource" };

export default function NewResourcePage() {
  return (
    <div>
      <Link href="/admin/resources" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Resources
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">New Resource</h1>
      <ResourceForm action={createResource} />
    </div>
  );
}
