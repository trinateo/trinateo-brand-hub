"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ProfileFormState {
  error?: string;
  success?: boolean;
}

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const headshot_url = String(formData.get("headshot_url") ?? "").trim() || null;
  const linkedin_url = String(formData.get("linkedin_url") ?? "").trim() || null;
  const expertise_tags = String(formData.get("expertise_tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!full_name) return { error: "Full name is required." };

  const supabase = await createClient();
  const { data: existing } = await supabase.from("profile").select("id").limit(1).maybeSingle();

  const fields = { full_name, tagline, bio, headshot_url, linkedin_url, expertise_tags };

  const { error } = existing
    ? await supabase.from("profile").update(fields).eq("id", existing.id)
    : await supabase.from("profile").insert(fields);

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/profile");
  revalidatePath("/about");
  revalidatePath("/");
  return { success: true };
}
