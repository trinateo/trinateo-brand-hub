import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { SpeakingEngagement } from "@/lib/types";
import { SpeakingForm } from "../../speaking-form";
import { updateSpeaking } from "../../actions";

export const metadata: Metadata = { title: "Edit Speaking Engagement" };

export default async function EditSpeakingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("speaking_engagements").select("*").eq("id", id).maybeSingle();
  const event = data as SpeakingEngagement | null;

  if (!event) notFound();

  const action = updateSpeaking.bind(null, id);

  return (
    <div>
      <Link href="/admin/speaking" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Speaking
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">Edit Speaking Engagement</h1>
      <SpeakingForm action={action} event={event} />
    </div>
  );
}
