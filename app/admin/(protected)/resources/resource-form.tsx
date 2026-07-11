"use client";

import { useActionState } from "react";
import type { ResourceFormState } from "./actions";
import type { Resource } from "@/lib/types";

const initialState: ResourceFormState = {};

const RESOURCE_TYPES = ["guide", "template", "video"];

export function ResourceForm({
  action,
  resource,
}: {
  action: (prevState: ResourceFormState, formData: FormData) => Promise<ResourceFormState>;
  resource?: Resource;
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
          defaultValue={resource?.title}
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
          rows={3}
          defaultValue={resource?.description ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="resource_type" className="block text-sm font-medium mb-1">
          Type
        </label>
        <select
          id="resource_type"
          name="resource_type"
          defaultValue={resource?.resource_type ?? "guide"}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white"
        >
          {RESOURCE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="file_url" className="block text-sm font-medium mb-1">
            File URL
          </label>
          <input
            id="file_url"
            name="file_url"
            type="url"
            defaultValue={resource?.file_url ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="external_url" className="block text-sm font-medium mb-1">
            External URL
          </label>
          <input
            id="external_url"
            name="external_url"
            type="url"
            defaultValue={resource?.external_url ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={resource?.published ?? false}
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
