import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ServiceOffer } from "@/lib/types";
import { toggleServicePublished, reorderService } from "./actions";

export const metadata: Metadata = { title: "Services" };
export const revalidate = 0;

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_offers")
    .select("*")
    .order("sort_order", { ascending: true });

  const services = (data ?? []) as ServiceOffer[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center rounded-md bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-700"
        >
          New Service
        </Link>
      </div>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading services. Please try again shortly.</p>
      ) : services.length === 0 ? (
        <p className="text-neutral-500">No services yet. Create your first one.</p>
      ) : (
        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <form action={reorderService.bind(null, service.id, "up")}>
                    <button
                      type="submit"
                      disabled={index === 0}
                      className="text-neutral-400 hover:text-neutral-900 disabled:opacity-30 text-xs leading-none px-1"
                    >
                      &uarr;
                    </button>
                  </form>
                  <form action={reorderService.bind(null, service.id, "down")}>
                    <button
                      type="submit"
                      disabled={index === services.length - 1}
                      className="text-neutral-400 hover:text-neutral-900 disabled:opacity-30 text-xs leading-none px-1"
                    >
                      &darr;
                    </button>
                  </form>
                </div>
                <div>
                  <p className="font-medium">{service.title}</p>
                  <p className="text-sm text-neutral-500">{service.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    service.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {service.published ? "Published" : "Draft"}
                </span>
                <form action={toggleServicePublished.bind(null, service.id, service.published)}>
                  <button
                    type="submit"
                    className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                  >
                    {service.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <Link
                  href={`/admin/services/${service.id}/edit`}
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
