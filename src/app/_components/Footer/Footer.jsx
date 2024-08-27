"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const showHeader =
    pathname === "/sign-in" ||
    pathname === "/create-account" ||
    pathname === "/login"
      ? false
      : true;
  return (
    <footer
      className={`${!showHeader && "hidden"} bg-[#e4e8ec] flex flex-col w-full`}
    >
      <div className="container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 pt-8 mb-10 gap-y-4">
        <div className="flex flex-col gap-y-4 lg:gap-y-8 px-4 text-left text-sm">
          <h3 className="text-base font-semibold uppercase">INTRODUCTION</h3>
          <p>
            Specializing in buying and selling all kinds of genuine PC
            components in Hanoi. Providing support for all kinds of CO, CQ
            documents, sales certificates.
          </p>
          <p>Sale Supports </p>
          <p>Best Price</p>
          <p>Best Customer Supports</p>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-8 px-4 text-left text-sm">
          <h3 className="text-base font-semibold uppercase">CONTACTS</h3>
            <span>
              <strong>Zalo:</strong> 0123.456.789
            </span>
            <span>
              <strong>Hotline:</strong> 0123.456.789
            </span>
            <span>
              <strong>Address:</strong> FPT University, Hoa Lac High-tech Park,
              Thach That, Hanoi
            </span>
          
            <span>
              <strong>Facebook:</strong> fb.com
            </span>
            <span>
              <strong>Gmail:</strong> daihocfpt@fpt.edu.vn
            </span>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-8 px-4 text-left text-sm">
          <h3 className="text-base font-semibold uppercase">
            CUSTOMER SUPPORTS
          </h3>
          <Link href={"/xay-dung-cau-hinh"} className="hover:text-red-500">
            <span>SmartBuild</span>
          </Link>
          <Link href={"/orders-manager"} className="hover:text-red-500">
            <span>Order Tracking</span>
          </Link>
          <Link href={"/profile"} className="hover:text-red-500">
            <span>Account</span>
          </Link>
          <Link href={"/cart"} className="hover:text-red-500">
            <span>Cart</span>
          </Link>
          <Link href={"/"} className="hover:text-red-500">
            <span>Home</span>
          </Link>
        </div>
      </div>
      <div className="w-full text-center py-2 lg:py-4 text-sm text-[#df4b4b]">
        <strong>Copyright 2024 © Build PC Smart</strong>
      </div>
    </footer>
  );
}
