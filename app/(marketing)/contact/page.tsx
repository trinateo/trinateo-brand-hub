import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ContactForm } from "./contact-form";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to discuss coaching and advisory services.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("service_offers")
    .select("slug,title")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Get in touch</h1>
      <p className="text-neutral-500 mb-10">
        Tell me a bit about what you&rsquo;re looking for and I&rsquo;ll be in touch.
      </p>
      <ContactForm services={data ?? []} defaultService={service} />
    </main>
  );
}
