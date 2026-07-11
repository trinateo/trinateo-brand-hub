import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, priority: 1 },
    { url: `${baseUrl}/services`, priority: 0.9 },
    { url: `${baseUrl}/about`, priority: 0.7 },
    { url: `${baseUrl}/proof`, priority: 0.7 },
    { url: `${baseUrl}/speaking`, priority: 0.5 },
    { url: `${baseUrl}/resources`, priority: 0.5 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
  ];

  const supabase = await createClient();
  const { data: services } = await supabase
    .from("service_offers")
    .select("slug")
    .eq("published", true);

  const serviceRoutes: MetadataRoute.Sitemap = (services ?? []).map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
