import type { Metadata } from "next";
import Link from "next/link";
import { ServiceForm } from "../service-form";
import { createService } from "../actions";

export const metadata: Metadata = { title: "New Service" };

export default function NewServicePage() {
  return (
    <div>
      <Link href="/admin/services" className="text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Services
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-8">New Service</h1>
      <ServiceForm action={createService} />
    </div>
  );
}
