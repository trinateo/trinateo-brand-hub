import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/types";
import { toggleResourcePublished } from "./actions";

export const metadata: Metadata = { title: "Resources" };
export const revalidate = 0;

export default async function AdminResourcesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("sort_order", { ascending: true });

  const resources = (data ?? []) as Resource[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
        <Link
          href="/admin/resources/new"
          className="inline-flex items-center rounded-md bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-700"
        >
          New Resource
        </Link>
      </div>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading resources. Please try again shortly.</p>
      ) : resources.length === 0 ? (
        <p className="text-neutral-500">No resources yet. Create your first one.</p>
      ) : (
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4"
            >
              <div>
                <p className="font-medium">{resource.title}</p>
                <p className="text-sm text-neutral-500">{resource.resource_type}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    resource.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {resource.published ? "Published" : "Draft"}
                </span>
                <form action={toggleResourcePublished.bind(null, resource.id, resource.published)}>
                  <button
                    type="submit"
                    className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                  >
                    {resource.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <Link
                  href={`/admin/resources/${resource.id}/edit`}
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
