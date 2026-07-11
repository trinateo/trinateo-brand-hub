import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trina Teo — Executive Coach & Leadership Strategist",
    template: "%s | Trina Teo",
  },
  description:
    "Trina Teo is an executive coach and leadership strategist helping CEOs and HR leaders build thriving organisations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-neutral-900">{children}</body>
    </html>
  );
}
