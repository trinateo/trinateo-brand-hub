"use client";

import { useActionState } from "react";
import { updateEnquiryNotes, type NotesFormState } from "./actions";

const initialState: NotesFormState = {};

export function NotesForm({ id, adminNotes }: { id: string; adminNotes: string | null }) {
  const action = updateEnquiryNotes.bind(null, id);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-4">
      <label htmlFor={`admin_notes_${id}`} className="block text-xs font-medium text-neutral-500 mb-1">
        Admin notes
      </label>
      <textarea
        id={`admin_notes_${id}`}
        name="admin_notes"
        rows={2}
        defaultValue={adminNotes ?? ""}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={pending}
          className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save Notes"}
        </button>
        {state.saved && !pending && <span className="text-sm text-green-700">Saved.</span>}
      </div>
    </form>
  );
}
