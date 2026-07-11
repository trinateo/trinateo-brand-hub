"use client";

import { useState } from "react";

export function DeleteButton({
  action,
  confirmLabel = "Confirm delete?",
}: {
  action: () => Promise<void>;
  confirmLabel?: string;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <form action={action}>
          <button
            type="submit"
            className="text-sm rounded-md bg-red-600 text-white px-3 py-1.5 hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-sm rounded-md border border-red-200 text-red-600 px-3 py-1.5 hover:border-red-400"
    >
      Delete
    </button>
  );
}
