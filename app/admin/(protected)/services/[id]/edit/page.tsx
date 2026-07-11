import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ServiceOffer } from "@/lib/types";
import { ServiceForm } from "../../service-form";
import { updateService } from "../../actions";

export const metadata: Metadata = { title: "Edit Service" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("service_offers").select("*").eq("id", id).maybeSingle();
  const service = data as ServiceOffer | null;

  if (!service) notFound();

  const action = updateService.bind(null, id);

  return (
    <div>
      <Link href="/admin/services" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Services
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">Edit Service</h1>
      <ServiceForm action={action} service={service} />
    </div>
  );
}
