"use client";

import { useActionState } from "react";
import type { SpeakingFormState } from "./actions";
import type { SpeakingEngagement } from "@/lib/types";

const initialState: SpeakingFormState = {};

export function SpeakingForm({
  action,
  event,
}: {
  action: (prevState: SpeakingFormState, formData: FormData) => Promise<SpeakingFormState>;
  event?: SpeakingEngagement;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="event_name" className="block text-sm font-medium mb-1">
          Event Name
        </label>
        <input
          id="event_name"
          name="event_name"
          type="text"
          defaultValue={event?.event_name}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="event_date" className="block text-sm font-medium mb-1">
            Event Date
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            defaultValue={event?.event_date ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            defaultValue={event?.location ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-medium mb-1">
          Topic
        </label>
        <textarea
          id="topic"
          name="topic"
          rows={2}
          defaultValue={event?.topic ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="audience_type" className="block text-sm font-medium mb-1">
            Audience Type
          </label>
          <input
            id="audience_type"
            name="audience_type"
            type="text"
            defaultValue={event?.audience_type ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="event_url" className="block text-sm font-medium mb-1">
            Event URL
          </label>
          <input
            id="event_url"
            name="event_url"
            type="url"
            defaultValue={event?.event_url ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <input
            id="is_upcoming"
            name="is_upcoming"
            type="checkbox"
            defaultChecked={event?.is_upcoming ?? false}
            className="rounded border-neutral-300"
          />
          <label htmlFor="is_upcoming" className="text-sm font-medium">
            Upcoming
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={event?.published ?? true}
            className="rounded border-neutral-300"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>
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
