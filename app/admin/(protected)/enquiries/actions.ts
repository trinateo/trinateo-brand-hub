"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { EnquiryStatus } from "@/lib/types";

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const supabase = await createClient();
  await supabase.from("enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/enquiries");
}

export interface NotesFormState {
  saved?: boolean;
}

export async function updateEnquiryNotes(
  id: string,
  _prevState: NotesFormState,
  formData: FormData,
): Promise<NotesFormState> {
  const admin_notes = String(formData.get("admin_notes") ?? "").trim() || null;
  const supabase = await createClient();
  await supabase.from("enquiries").update({ admin_notes }).eq("id", id);
  revalidatePath("/admin/enquiries");
  return { saved: true };
}
