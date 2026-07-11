import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="max-w-sm mx-auto px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Admin</h1>
      <p className="text-neutral-500 mb-8 text-sm">Enter the admin passphrase to continue.</p>
      <LoginForm />
    </main>
  );
}
