"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileFormState } from "./actions";
import type { Profile } from "@/lib/types";

const initialState: ProfileFormState = {};

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700" role="status">
          Saved.
        </p>
      )}

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          defaultValue={profile?.full_name ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="tagline" className="block text-sm font-medium mb-1">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          defaultValue={profile?.tagline ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={6}
          defaultValue={profile?.bio ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="headshot_url" className="block text-sm font-medium mb-1">
            Headshot URL
          </label>
          <input
            id="headshot_url"
            name="headshot_url"
            type="url"
            defaultValue={profile?.headshot_url ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="linkedin_url" className="block text-sm font-medium mb-1">
            LinkedIn URL
          </label>
          <input
            id="linkedin_url"
            name="linkedin_url"
            type="url"
            defaultValue={profile?.linkedin_url ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="expertise_tags" className="block text-sm font-medium mb-1">
          Expertise Tags (comma-separated)
        </label>
        <input
          id="expertise_tags"
          name="expertise_tags"
          type="text"
          defaultValue={profile?.expertise_tags?.join(", ") ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-md bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
