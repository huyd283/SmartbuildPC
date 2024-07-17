"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinkItem({ item }) {
  const pathname = usePathname();
  const { href, name } = item;
  return (
    <Link
      className={`${
        pathname === "/" + href ? "text-red-500 underline font-semibold" : ""
      } text-center`}
      href={`/${href}`}>
      {name}
    </Link>
  );
}
