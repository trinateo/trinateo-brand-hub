import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Profile" };
export const revalidate = 0;

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").limit(1).maybeSingle();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Profile</h1>
      <ProfileForm profile={data as Profile | null} />
    </div>
  );
}
