import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminNav } from "@/components/admin/nav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
