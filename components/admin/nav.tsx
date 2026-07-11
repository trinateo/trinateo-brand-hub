import Link from "next/link";
import { logout } from "@/app/admin/(protected)/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/speaking", label: "Speaking" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/profile", label: "Profile" },
];

export function AdminNav() {
  return (
    <header className="border-b border-neutral-200 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-semibold tracking-tight">
            Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm text-neutral-600 flex-wrap">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-neutral-900 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm text-neutral-500 hover:text-neutral-900">
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
