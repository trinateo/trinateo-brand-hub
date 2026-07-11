"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  isPassphraseConfigured,
  verifyPassphrase,
} from "@/lib/admin/auth";

export interface LoginState {
  error?: string;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  if (!isPassphraseConfigured()) {
    return { error: "Admin passphrase is not configured. Set ADMIN_PASSPHRASE in Vercel." };
  }

  const passphrase = String(formData.get("passphrase") ?? "");
  if (!passphrase) {
    return { error: "Passphrase is required." };
  }

  if (!verifyPassphrase(passphrase)) {
    return { error: "Incorrect passphrase." };
  }

  await createAdminSession();
  redirect("/admin");
}
