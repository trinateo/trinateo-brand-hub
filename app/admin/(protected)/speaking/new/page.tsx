import type { Metadata } from "next";
import Link from "next/link";
import { SpeakingForm } from "../speaking-form";
import { createSpeaking } from "../actions";

export const metadata: Metadata = { title: "New Speaking Engagement" };

export default function NewSpeakingPage() {
  return (
    <div>
      <Link href="/admin/speaking" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Speaking
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">New Speaking Engagement</h1>
      <SpeakingForm action={createSpeaking} />
    </div>
  );
}
