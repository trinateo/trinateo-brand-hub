import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { SpeakingEngagement } from "@/lib/types";
import { deleteSpeaking } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata: Metadata = { title: "Speaking" };
export const revalidate = 0;

export default async function AdminSpeakingPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("speaking_engagements")
    .select("*")
    .order("event_date", { ascending: false });

  const events = (data ?? []) as SpeakingEngagement[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Speaking</h1>
        <Link
          href="/admin/speaking/new"
          className="inline-flex items-center rounded-md bg-neutral-900 text-white px-4 py-2 text-sm font-medium hover:bg-neutral-700"
        >
          New Event
        </Link>
      </div>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading speaking events. Please try again shortly.</p>
      ) : events.length === 0 ? (
        <p className="text-neutral-500">No speaking events yet. Create your first one.</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4"
            >
              <div className="min-w-0">
                <p className="font-medium">{event.event_name}</p>
                <p className="text-sm text-neutral-500">
                  {event.event_date} {event.location ? `· ${event.location}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {event.is_upcoming && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Upcoming
                  </span>
                )}
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    event.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {event.published ? "Published" : "Draft"}
                </span>
                <Link
                  href={`/admin/speaking/${event.id}/edit`}
                  className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteSpeaking.bind(null, event.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
