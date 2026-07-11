"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/admin/auth";

export interface SpeakingFormState {
  error?: string;
}

function readFields(formData: FormData) {
  return {
    event_name: String(formData.get("event_name") ?? "").trim(),
    event_date: String(formData.get("event_date") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    topic: String(formData.get("topic") ?? "").trim() || null,
    audience_type: String(formData.get("audience_type") ?? "").trim() || null,
    event_url: String(formData.get("event_url") ?? "").trim() || null,
    is_upcoming: formData.get("is_upcoming") === "on",
    published: formData.get("published") === "on",
  };
}

export async function createSpeaking(
  _prevState: SpeakingFormState,
  formData: FormData,
): Promise<SpeakingFormState> {
  const fields = readFields(formData);
  if (!fields.event_name) return { error: "Event name is required." };

  const supabase = await createClient();
  const user = await getAdminUser();
  const { error } = await supabase.from("speaking_engagements").insert({ ...fields, user_id: user?.id });

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/speaking");
  revalidatePath("/speaking");
  redirect("/admin/speaking");
}

export async function updateSpeaking(
  id: string,
  _prevState: SpeakingFormState,
  formData: FormData,
): Promise<SpeakingFormState> {
  const fields = readFields(formData);
  if (!fields.event_name) return { error: "Event name is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("speaking_engagements").update(fields).eq("id", id);

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/speaking");
  revalidatePath("/speaking");
  redirect("/admin/speaking");
}

export async function deleteSpeaking(id: string) {
  const supabase = await createClient();
  await supabase.from("speaking_engagements").delete().eq("id", id);
  revalidatePath("/admin/speaking");
  revalidatePath("/speaking");
}
