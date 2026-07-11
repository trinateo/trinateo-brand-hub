"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  visitorName?: string;
  fieldErrors?: Partial<Record<"visitor_name" | "visitor_email" | "message", string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const visitor_name = String(formData.get("visitor_name") ?? "").trim();
  const visitor_email = String(formData.get("visitor_email") ?? "").trim();
  const visitor_company = String(formData.get("visitor_company") ?? "").trim();
  const visitor_role = String(formData.get("visitor_role") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const how_can_i_help = String(formData.get("how_can_i_help") ?? "").trim();

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!visitor_name) fieldErrors.visitor_name = "Name is required.";
  if (!visitor_email) {
    fieldErrors.visitor_email = "Email is required.";
  } else if (!EMAIL_RE.test(visitor_email)) {
    fieldErrors.visitor_email = "Please enter a valid email address.";
  }
  if (!message) fieldErrors.message = "Message is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("enquiries").insert({
      visitor_name,
      visitor_email,
      visitor_company: visitor_company || null,
      visitor_role: visitor_role || null,
      message,
      how_can_i_help: how_can_i_help || null,
      status: "new",
    });

    if (error) {
      return { status: "error", message: "Something went wrong. Please try again." };
    }

    return { status: "success", visitorName: visitor_name };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
