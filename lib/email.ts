import { Resend } from "resend";

export async function sendEnquiryNotification(params: {
  visitorName: string;
  visitorEmail: string;
  visitorCompany: string | null;
  visitorRole: string | null;
  message: string;
  howCanIHelp: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.ENQUIRY_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyTo) {
    // Email notifications are optional in this environment — the enquiry is
    // already persisted, so we no-op rather than fail the submission.
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: notifyTo,
      subject: `New enquiry from ${params.visitorName}`,
      text: [
        `Name: ${params.visitorName}`,
        `Email: ${params.visitorEmail}`,
        params.visitorCompany ? `Company: ${params.visitorCompany}` : null,
        params.visitorRole ? `Role: ${params.visitorRole}` : null,
        params.howCanIHelp ? `Interested in: ${params.howCanIHelp}` : null,
        "",
        params.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch {
    // Best-effort — the enquiry itself has already been saved.
  }
}
