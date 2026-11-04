import Link from "next/link";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          فروشگاه من
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 transition hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/cart" className="text-gray-700 transition hover:text-indigo-600">
            سبد خرید
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            ورود
          </Link>
        </div>
      </div>
    </header>
  );
}
