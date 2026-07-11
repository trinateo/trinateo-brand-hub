import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Enquiry, EnquiryStatus } from "@/lib/types";
import { updateEnquiryStatus } from "./actions";
import { NotesForm } from "./notes-form";

export const metadata: Metadata = { title: "Enquiries" };
export const revalidate = 0;

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-amber-100 text-amber-700",
  responded: "bg-green-100 text-green-700",
};

function sortEnquiries(enquiries: Enquiry[]): Enquiry[] {
  return [...enquiries].sort((a, b) => {
    if (a.status === "new" && b.status !== "new") return -1;
    if (a.status !== "new" && b.status === "new") return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

export default async function AdminEnquiriesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const enquiries = sortEnquiries((data ?? []) as Enquiry[]);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Enquiries</h1>

      {error ? (
        <p className="text-neutral-500">Something went wrong loading enquiries. Please try again shortly.</p>
      ) : enquiries.length === 0 ? (
        <p className="text-neutral-500">No enquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <article key={enquiry.id} className="rounded-lg border border-neutral-200 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-medium">{enquiry.visitor_name}</h2>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[enquiry.status]}`}
                    >
                      {enquiry.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">
                    {enquiry.visitor_email}
                    {enquiry.visitor_company ? ` · ${enquiry.visitor_company}` : ""}
                    {enquiry.visitor_role ? ` · ${enquiry.visitor_role}` : ""}
                  </p>
                  {enquiry.how_can_i_help && (
                    <p className="text-xs text-neutral-400 mt-1">Interested in: {enquiry.how_can_i_help}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {enquiry.status !== "reviewed" && (
                    <form action={updateEnquiryStatus.bind(null, enquiry.id, "reviewed")}>
                      <button
                        type="submit"
                        className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                      >
                        Mark Reviewed
                      </button>
                    </form>
                  )}
                  {enquiry.status !== "responded" && (
                    <form action={updateEnquiryStatus.bind(null, enquiry.id, "responded")}>
                      <button
                        type="submit"
                        className="text-sm rounded-md border border-neutral-300 px-3 py-1.5 hover:border-neutral-400"
                      >
                        Mark Responded
                      </button>
                    </form>
                  )}
                </div>
              </div>
              <p className="text-sm text-neutral-700 mt-4 whitespace-pre-line">{enquiry.message}</p>
              <p className="text-xs text-neutral-400 mt-3">
                {new Date(enquiry.created_at).toLocaleString()}
              </p>
              <NotesForm id={enquiry.id} adminNotes={enquiry.admin_notes} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
