import React from "react";
import Link from "next/link";
import { NavLinkList } from "@/app/_utils/data/data";
import { NavLinkItem, SearchInput } from "@/components/_personal";
import { Home } from "lucide-react";
export default function Navigation() {
  return (
    <div className="block sticky top-0 w-full bg-white lg:py-2 xl:py-3 z-30">
      <nav className="hidden lg:flex container items-center gap-x-4">
        <ul className="w-full flex items-center justify-between gap-x-2 text-[#005995] font-medium text-sm">
          <li className="flex items-center justify-center ml-2 px-5 ">
            <Link href={"/"}>
              <Home size={28} color="#026db5" />
            </Link>
          </li>
          {NavLinkList?.map((item, index) => (
            <li key={index} className="flex items-center justify-center px-5">
              <NavLinkItem item={item} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full flex items-center justify-center py-2 lg:hidden">
        <SearchInput placeholder="Hôm nay bạn muốn mua gì?" />
      </div>
    </div>
  );
}
