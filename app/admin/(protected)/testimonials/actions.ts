"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/admin/auth";

export interface TestimonialFormState {
  error?: string;
}

function readFields(formData: FormData) {
  const relatedServiceId = String(formData.get("related_service_id") ?? "").trim();
  return {
    author_name: String(formData.get("author_name") ?? "").trim(),
    author_role: String(formData.get("author_role") ?? "").trim() || null,
    author_company: String(formData.get("author_company") ?? "").trim() || null,
    quote: String(formData.get("quote") ?? "").trim(),
    related_service_id: relatedServiceId || null,
    published: formData.get("published") === "on",
  };
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const fields = readFields(formData);
  if (!fields.author_name) return { error: "Author name is required." };
  if (!fields.quote) return { error: "Quote is required." };

  const supabase = await createClient();
  const user = await getAdminUser();
  const { data: maxRow } = await supabase
    .from("testimonials")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("testimonials")
    .insert({ ...fields, user_id: user?.id, sort_order: (maxRow?.sort_order ?? 0) + 1 });

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/testimonials");
  revalidatePath("/proof");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const fields = readFields(formData);
  if (!fields.author_name) return { error: "Author name is required." };
  if (!fields.quote) return { error: "Quote is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(fields).eq("id", id);

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/testimonials");
  revalidatePath("/proof");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/proof");
  revalidatePath("/");
}
