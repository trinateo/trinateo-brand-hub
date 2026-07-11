import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { SpeakingEngagement } from "@/lib/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Speaking",
  description: "Past and upcoming speaking engagements.",
};

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EventCard({ event }: { event: SpeakingEngagement }) {
  return (
    <article className="rounded-lg border border-neutral-200 p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium">{event.event_name}</h3>
        {event.event_date && (
          <span className="text-sm text-neutral-500 whitespace-nowrap">
            {formatDate(event.event_date)}
          </span>
        )}
      </div>
      {event.topic && <p className="text-sm text-neutral-700 mt-2">{event.topic}</p>}
      <div className="text-sm text-neutral-500 mt-2 flex gap-3 flex-wrap">
        {event.location && <span>{event.location}</span>}
        {event.audience_type && <span>&middot; {event.audience_type}</span>}
      </div>
      {event.event_url && (
        <a
          href={event.event_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-blue-600 hover:underline"
        >
          Event details &rarr;
        </a>
      )}
    </article>
  );
}

export default async function SpeakingPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("speaking_engagements")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: false });

  const events = (data ?? []) as SpeakingEngagement[];
  const upcoming = events.filter((e) => e.is_upcoming);
  const past = events.filter((e) => !e.is_upcoming);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Speaking</h1>
      <p className="text-neutral-500 mb-12">Past and upcoming speaking engagements.</p>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading this page. Please try again shortly.</p>
      ) : events.length === 0 ? (
        <p className="text-neutral-500">No speaking events listed yet.</p>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold tracking-tight mb-6">Upcoming</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold tracking-tight mb-6">Past</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {past.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
