import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-black/10 bg-transparent">
      <div className="mx-auto flex max-w-5xl gap-6 px-6 py-4 font-bold">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <Link href="/about" className="hover:underline">
          About
        </Link>

        <Link href="/portfolio" className="hover:underline">
          Portfolio
        </Link>

        <Link href="/blog" className="hover:underline">
          Blog
        </Link>

        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </nav>
  );
}
