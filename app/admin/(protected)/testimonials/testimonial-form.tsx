"use client";

import { useActionState } from "react";
import type { TestimonialFormState } from "./actions";
import type { ServiceOffer, Testimonial } from "@/lib/types";

const initialState: TestimonialFormState = {};

export function TestimonialForm({
  action,
  testimonial,
  services,
}: {
  action: (prevState: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  testimonial?: Testimonial;
  services: Pick<ServiceOffer, "id" | "title">[];
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
        <label htmlFor="author_name" className="block text-sm font-medium mb-1">
          Author Name
        </label>
        <input
          id="author_name"
          name="author_name"
          type="text"
          defaultValue={testimonial?.author_name}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="author_role" className="block text-sm font-medium mb-1">
            Author Role
          </label>
          <input
            id="author_role"
            name="author_role"
            type="text"
            defaultValue={testimonial?.author_role ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="author_company" className="block text-sm font-medium mb-1">
            Author Company
          </label>
          <input
            id="author_company"
            name="author_company"
            type="text"
            defaultValue={testimonial?.author_company ?? ""}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote" className="block text-sm font-medium mb-1">
          Quote
        </label>
        <textarea
          id="quote"
          name="quote"
          rows={4}
          defaultValue={testimonial?.quote}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="related_service_id" className="block text-sm font-medium mb-1">
          Related Service
        </label>
        <select
          id="related_service_id"
          name="related_service_id"
          defaultValue={testimonial?.related_service_id ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white"
        >
          <option value="">None</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={testimonial?.published ?? true}
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
