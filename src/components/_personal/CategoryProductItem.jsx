"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
export default function CategoryProductItem({ item }) {
  return (
    <Link
      className="bg-transparent w-full h-full flex justify-between items-center"
      href={`/danh-muc-san-pham/${item?.href}`}>
      <span className="text-sm font-semibold">{item?.name}</span>
      {item?.categoryList?.length > 0 && <ChevronRight size={20} />}
    </Link>
  );
}
