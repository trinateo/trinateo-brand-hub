import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Admin Dashboard" };
export const revalidate = 0;

async function getCounts() {
  const supabase = await createClient();
  const [enquiries, newEnquiries, services, caseStudies, testimonials, speaking, resources] =
    await Promise.all([
      supabase.from("enquiries").select("id", { count: "exact", head: true }),
      supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("service_offers").select("id", { count: "exact", head: true }),
      supabase.from("case_studies").select("id", { count: "exact", head: true }),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
      supabase.from("speaking_engagements").select("id", { count: "exact", head: true }),
      supabase.from("resources").select("id", { count: "exact", head: true }),
    ]);

  return {
    enquiries: enquiries.count ?? 0,
    newEnquiries: newEnquiries.count ?? 0,
    services: services.count ?? 0,
    caseStudies: caseStudies.count ?? 0,
    testimonials: testimonials.count ?? 0,
    speaking: speaking.count ?? 0,
    resources: resources.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: "New Enquiries", value: counts.newEnquiries, href: "/admin/enquiries" },
    { label: "Total Enquiries", value: counts.enquiries, href: "/admin/enquiries" },
    { label: "Services", value: counts.services, href: "/admin/services" },
    { label: "Case Studies", value: counts.caseStudies, href: "/admin/case-studies" },
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials" },
    { label: "Speaking Events", value: counts.speaking, href: "/admin/speaking" },
    { label: "Resources", value: counts.resources, href: "/admin/resources" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-neutral-200 p-6 hover:border-neutral-400 transition-colors"
          >
            <p className="text-3xl font-semibold">{card.value}</p>
            <p className="text-sm text-neutral-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
