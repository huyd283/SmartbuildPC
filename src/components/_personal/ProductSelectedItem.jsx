import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";

export default function ProductSelectedItem({ item, onRemove }) {
  if (!item) {
    return <div>There are no products selected</div>;
  }
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  return (
    <div className="w-full flex items-center justify-between float-left border p-4 rounded-sm">
    <Link href={item?.href || ""} className="w-20 h-20 overflow-hidden rounded-md">
      <Image
        src={
          item?.imageLink ||
          "https://maytinh.sharekhoahoc.vn/wp-content/uploads/2021/12/8530d87af9fc1bf1a3617728d8954b16_63b594ba72d04e3bb9688047fa42ab2f_master-400x400.jpg"
        }
        unoptimized
        alt={item?.name || "Vỏ Máy Tính XIGMATEK XM-10 (EN44252) M-ATX"}
        width={100}
        height={100}
        className="w-full h-full bg-center bg-contain"
      />
    </Link>
    <div className="w-full flex flex-col flex-1 py-2 px-3 text-sm gap-y-2">
      <h4 className="font-bold text-[#222] uppercase">
        {item?.productName || "Vỏ Máy Tính XIGMATEK XM-10 (EN44252) M-ATX"}
      </h4>
      <div className="max-w-14">
        <Input
          className="border font-semibold px-2"
          defaultValue={1}
          type="number"
          min={1}
          step="1"
        />
      </div>
      <span className="text-red-600 font-semibold">
      {formatCurrency(item.price) || "240.000đ"} 
      </span>
      <p className="text-xs text-gray-500">
      Product code: {item?.productId || "SP001"}
      </p>
      <p className="text-xs">
      Warranty period: {item?.warranty || "12 tháng"}
      </p>
      <p className={`text-xs font-semibold ${item?.stock ? 'text-red-600' : 'text-green-600'}`}>
      Warehouse: {item?.stock ? "Sold out" : "Available"}
      </p>
     
    </div>
    <div className="flex items-center justify-end py-4">
      <Button onClick={() => onRemove(item)}>Delete</Button>
    </div>
  </div>
  
  );
}
