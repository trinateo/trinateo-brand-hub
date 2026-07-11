import Link from "next/link";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/proof", label: "Proof" },
  { href: "/speaking", label: "Speaking" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-neutral-900">
          Trina Teo
        </Link>
        <nav className="flex items-center gap-6 text-sm text-neutral-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-neutral-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
