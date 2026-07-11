"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitEnquiry, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm({
  services,
  defaultService,
}: {
  services: { slug: string; title: string }[];
  defaultService?: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-green-900">Thank you, {state.visitorName}!</h2>
        <p className="text-sm text-green-800 mt-2">
          Your enquiry has been received. Trina will personally review it and be in touch with
          you soon.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 text-sm font-medium text-green-900 hover:underline"
        >
          &larr; Back to home
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && state.message && (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="visitor_name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="visitor_name"
          name="visitor_name"
          type="text"
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
        {state.fieldErrors?.visitor_name && (
          <p className="text-sm text-red-600 mt-1">{state.fieldErrors.visitor_name}</p>
        )}
      </div>

      <div>
        <label htmlFor="visitor_email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="visitor_email"
          name="visitor_email"
          type="email"
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
        {state.fieldErrors?.visitor_email && (
          <p className="text-sm text-red-600 mt-1">{state.fieldErrors.visitor_email}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="visitor_company" className="block text-sm font-medium mb-1">
            Company
          </label>
          <input
            id="visitor_company"
            name="visitor_company"
            type="text"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <div>
          <label htmlFor="visitor_role" className="block text-sm font-medium mb-1">
            Role
          </label>
          <input
            id="visitor_role"
            name="visitor_role"
            type="text"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
      </div>

      <div>
        <label htmlFor="how_can_i_help" className="block text-sm font-medium mb-1">
          How can I help?
        </label>
        <select
          id="how_can_i_help"
          name="how_can_i_help"
          defaultValue={defaultService ?? ""}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
        >
          <option value="">Select a service (optional)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
        {state.fieldErrors?.message && (
          <p className="text-sm text-red-600 mt-1">{state.fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-md bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
