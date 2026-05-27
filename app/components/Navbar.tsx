import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-black/10 bg-transparent">
      <div className="mx-auto flex max-w-5xl flex-wrap gap-1 px-6 py-4 font-bold">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/portfolio">Portfolio</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}
