import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About",
  description: "About Trina Teo — executive coach and leadership strategist.",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profile").select("*").limit(1).maybeSingle();
  const profile = data as Profile | null;

  if (error) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-neutral-500">Something went wrong loading this page. Please try again shortly.</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-neutral-500">Profile details are not available yet.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-10">
        {profile.headshot_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.headshot_url}
            alt={profile.full_name}
            className="w-32 h-32 rounded-full object-cover border border-neutral-200"
          />
        )}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{profile.full_name}</h1>
          <p className="text-neutral-600 mt-1">{profile.tagline}</p>
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-blue-600 hover:underline"
            >
              LinkedIn &rarr;
            </a>
          )}
        </div>
      </div>

      {profile.bio && (
        <p className="text-neutral-700 whitespace-pre-line leading-relaxed mb-10">{profile.bio}</p>
      )}

      {profile.expertise_tags?.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">
            Areas of expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.expertise_tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-neutral-100 rounded-full px-3 py-1 text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
