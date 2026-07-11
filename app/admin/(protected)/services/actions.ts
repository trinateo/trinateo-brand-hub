"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ServiceOffer } from "@/lib/types";

export interface ServiceFormState {
  error?: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readServiceFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: slugify(String(formData.get("slug") ?? formData.get("title") ?? "")),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    who_its_for: String(formData.get("who_its_for") ?? "").trim() || null,
    outcomes: String(formData.get("outcomes") ?? "").trim() || null,
    cta_label: String(formData.get("cta_label") ?? "").trim() || "Enquire Now",
    published: formData.get("published") === "on",
  };
}

export async function createService(
  _prevState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  const fields = readServiceFields(formData);
  if (!fields.title) return { error: "Title is required." };
  if (!fields.summary) return { error: "Summary is required." };

  const supabase = await createClient();
  const { data: maxRow } = await supabase
    .from("service_offers")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("service_offers").insert({
    ...fields,
    sort_order: (maxRow?.sort_order ?? 0) + 1,
  });

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prevState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  const fields = readServiceFields(formData);
  if (!fields.title) return { error: "Title is required." };
  if (!fields.summary) return { error: "Summary is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("service_offers").update(fields).eq("id", id);

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${fields.slug}`);
  redirect("/admin/services");
}

export async function toggleServicePublished(id: string, published: boolean) {
  const supabase = await createClient();
  await supabase.from("service_offers").update({ published: !published }).eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function reorderService(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("service_offers")
    .select("id,sort_order")
    .order("sort_order", { ascending: true });

  if (!rows) return;
  const list = rows as Pick<ServiceOffer, "id" | "sort_order">[];
  const index = list.findIndex((r) => r.id === id);
  if (index === -1) return;
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= list.length) return;

  const current = list[index];
  const swap = list[swapIndex];

  await Promise.all([
    supabase.from("service_offers").update({ sort_order: swap.sort_order }).eq("id", current.id),
    supabase.from("service_offers").update({ sort_order: current.sort_order }).eq("id", swap.id),
  ]);

  revalidatePath("/admin/services");
  revalidatePath("/services");
}
