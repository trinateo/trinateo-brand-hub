"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/admin/auth";

export interface ResourceFormState {
  error?: string;
}

function readFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    resource_type: String(formData.get("resource_type") ?? "guide").trim() || "guide",
    file_url: String(formData.get("file_url") ?? "").trim() || null,
    external_url: String(formData.get("external_url") ?? "").trim() || null,
    published: formData.get("published") === "on",
  };
}

export async function createResource(
  _prevState: ResourceFormState,
  formData: FormData,
): Promise<ResourceFormState> {
  const fields = readFields(formData);
  if (!fields.title) return { error: "Title is required." };

  const supabase = await createClient();
  const user = await getAdminUser();
  const { data: maxRow } = await supabase
    .from("resources")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("resources")
    .insert({ ...fields, user_id: user?.id, sort_order: (maxRow?.sort_order ?? 0) + 1 });

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  redirect("/admin/resources");
}

export async function updateResource(
  id: string,
  _prevState: ResourceFormState,
  formData: FormData,
): Promise<ResourceFormState> {
  const fields = readFields(formData);
  if (!fields.title) return { error: "Title is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("resources").update(fields).eq("id", id);

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  redirect("/admin/resources");
}

export async function toggleResourcePublished(id: string, published: boolean) {
  const supabase = await createClient();
  await supabase.from("resources").update({ published: !published }).eq("id", id);
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
}
