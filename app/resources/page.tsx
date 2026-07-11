import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides and downloads.",
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const resources = (data ?? []) as Resource[];

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Resources</h1>
      <p className="text-neutral-500 mb-12">Guides and downloads to support your leadership journey.</p>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading resources. Please try again shortly.</p>
      ) : resources.length === 0 ? (
        <p className="text-neutral-500">No resources listed yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {resources.map((resource) => {
            const href = resource.file_url || resource.external_url;
            return (
              <article key={resource.id} className="rounded-lg border border-neutral-200 p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600 mb-2">
                  {resource.resource_type}
                </p>
                <h2 className="font-medium mb-2">{resource.title}</h2>
                {resource.description && (
                  <p className="text-sm text-neutral-500 mb-4">{resource.description}</p>
                )}
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {resource.file_url ? "Download" : "View resource"} &rarr;
                  </a>
                ) : (
                  <span className="text-sm text-neutral-400">Coming soon</span>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
