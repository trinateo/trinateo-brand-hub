"use client";

import { useActionState } from "react";
import type { CaseStudyFormState } from "./actions";
import type { CaseStudy } from "@/lib/types";

const initialState: CaseStudyFormState = {};

export function CaseStudyForm({
  action,
  caseStudy,
}: {
  action: (prevState: CaseStudyFormState, formData: FormData) => Promise<CaseStudyFormState>;
  caseStudy?: CaseStudy;
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
          defaultValue={caseStudy?.title}
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
          defaultValue={caseStudy?.slug}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="client_sector" className="block text-sm font-medium mb-1">
          Client Sector
        </label>
        <input
          id="client_sector"
          name="client_sector"
          type="text"
          defaultValue={caseStudy?.client_sector ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="challenge" className="block text-sm font-medium mb-1">
          Challenge
        </label>
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          defaultValue={caseStudy?.challenge ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="approach" className="block text-sm font-medium mb-1">
          Approach
        </label>
        <textarea
          id="approach"
          name="approach"
          rows={3}
          defaultValue={caseStudy?.approach ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="outcome" className="block text-sm font-medium mb-1">
          Outcome
        </label>
        <textarea
          id="outcome"
          name="outcome"
          rows={3}
          defaultValue={caseStudy?.outcome ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-1">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={caseStudy?.tags?.join(", ") ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={caseStudy?.published ?? false}
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
