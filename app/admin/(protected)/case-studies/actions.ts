"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface CaseStudyFormState {
  error?: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readFields(formData: FormData) {
  const tagsRaw = String(formData.get("tags") ?? "");
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: slugify(String(formData.get("slug") ?? formData.get("title") ?? "")),
    client_sector: String(formData.get("client_sector") ?? "").trim() || null,
    challenge: String(formData.get("challenge") ?? "").trim() || null,
    approach: String(formData.get("approach") ?? "").trim() || null,
    outcome: String(formData.get("outcome") ?? "").trim() || null,
    tags: tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    published: formData.get("published") === "on",
  };
}

export async function createCaseStudy(
  _prevState: CaseStudyFormState,
  formData: FormData,
): Promise<CaseStudyFormState> {
  const fields = readFields(formData);
  if (!fields.title) return { error: "Title is required." };

  const supabase = await createClient();
  const { data: maxRow } = await supabase
    .from("case_studies")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("case_studies")
    .insert({ ...fields, sort_order: (maxRow?.sort_order ?? 0) + 1 });

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/case-studies");
  revalidatePath("/proof");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(
  id: string,
  _prevState: CaseStudyFormState,
  formData: FormData,
): Promise<CaseStudyFormState> {
  const fields = readFields(formData);
  if (!fields.title) return { error: "Title is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("case_studies").update(fields).eq("id", id);

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/case-studies");
  revalidatePath("/proof");
  redirect("/admin/case-studies");
}

export async function toggleCaseStudyPublished(id: string, published: boolean) {
  const supabase = await createClient();
  await supabase.from("case_studies").update({ published: !published }).eq("id", id);
  revalidatePath("/admin/case-studies");
  revalidatePath("/proof");
}
