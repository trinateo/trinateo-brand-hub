import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/types";
import { ResourceForm } from "../../resource-form";
import { updateResource } from "../../actions";

export const metadata: Metadata = { title: "Edit Resource" };

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("resources").select("*").eq("id", id).maybeSingle();
  const resource = data as Resource | null;

  if (!resource) notFound();

  const action = updateResource.bind(null, id);

  return (
    <div>
      <Link href="/admin/resources" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Resources
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">Edit Resource</h1>
      <ResourceForm action={action} resource={resource} />
    </div>
  );
}
