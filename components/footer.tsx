export function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-neutral-500 flex items-center justify-between">
        <span>&copy; {new Date().getFullYear()} Trina Teo. All rights reserved.</span>
        <a href="/contact" className="hover:text-neutral-900 transition-colors">
          Get in touch
        </a>
      </div>
    </footer>
  );
}
