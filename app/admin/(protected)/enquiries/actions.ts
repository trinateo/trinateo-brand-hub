"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { EnquiryStatus } from "@/lib/types";

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const supabase = await createClient();
  await supabase.from("enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/enquiries");
}
