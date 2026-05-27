import Link from "next/link";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "default" | "inverse";
};

export default function NavLink({
  href,
  children,
  variant = "default",
}: NavLinkProps) {
  const styles =
    variant === "inverse"
      ? "text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/40"
      : "text-black hover:bg-black/[0.06] hover:text-black focus-visible:ring-black/25";

  return (
    <Link
      href={href}
      className={`nav-link rounded-lg px-2.5 py-1.5 transition-[background-color,color,box-shadow] duration-200 ease-out focus:outline-none focus-visible:ring-2 ${styles}`}
    >
      {children}
    </Link>
  );
}
