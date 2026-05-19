import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-black/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex gap-6 font-bold">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <Link href="/about" className="hover:underline">
          About
        </Link>

        <Link href="/portfolio" className="hover:underline">
          Portfolio
        </Link>

        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </nav>
  );
}
