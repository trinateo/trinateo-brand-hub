"use client";

import { useActionState } from "react";
import type { ServiceFormState } from "./actions";
import type { ServiceOffer } from "@/lib/types";

const initialState: ServiceFormState = {};

export function ServiceForm({
  action,
  service,
}: {
  action: (prevState: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
  service?: ServiceOffer;
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
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={service?.title}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-1">
          Slug (optional — derived from title if left blank)
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          defaultValue={service?.slug}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium mb-1">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={2}
          defaultValue={service?.summary}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={service?.description ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="who_its_for" className="block text-sm font-medium mb-1">
          Who it&rsquo;s for
        </label>
        <textarea
          id="who_its_for"
          name="who_its_for"
          rows={2}
          defaultValue={service?.who_its_for ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="outcomes" className="block text-sm font-medium mb-1">
          Outcomes
        </label>
        <textarea
          id="outcomes"
          name="outcomes"
          rows={2}
          defaultValue={service?.outcomes ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="cta_label" className="block text-sm font-medium mb-1">
          CTA Label
        </label>
        <input
          id="cta_label"
          name="cta_label"
          type="text"
          defaultValue={service?.cta_label ?? "Enquire Now"}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={service?.published ?? false}
          className="rounded border-neutral-300"
        />
        <label htmlFor="published" className="text-sm font-medium">
          Published
        </label>
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
