"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { getData } from "@/service/Api-service/apiProducts";

export default function ProductItem({ 
  id,
  onProductSelected,
  selectedSearch,
  inputValue,
  selectedFilter,
}) {
  const [Dataproduct, setDataproduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData(id);

        setDataproduct(res.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const onSelected = (productId) => {
    toast.success("Choose successful products!");
    onProductSelected(productId);
  };
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
  return (
    <div className="w-full flex flex-col gap-y-3 max-h-[300px] lg:max-h-[450px] 2xl:max-h-[600px] overflow-y-scroll">
      {Dataproduct.map((item) => (
        <div key={item.productId} className="w-full flex items-center justify-between float-left border p-4 rounded-sm">
          <Link href={item.href || "#"} className="w-20 h-20 overflow-hidden rounded-md">
            <Image
              src={
                item.imageLink ||
                "https://maytinh.sharekhoahoc.vn/wp-content/uploads/2021/12/8530d87af9fc1bf1a3617728d8954b16_63b594ba72d04e3bb9688047fa42ab2f_master-400x400.jpg"
              }
              unoptimized
              alt={item.productName || "Product Image"}
              width={100}
              height={100}
              className="w-full h-full bg-center bg-contain"
            />
          </Link>
          <div className="w-full flex flex-col flex-1 py-2 px-3 text-sm gap-y-2">
            <h4 className="font-bold text-[#222] uppercase">
              {item.productName || "Product Name"}
            </h4>
            <div>
              <span className="text-[#026db5] bg-[#0093623d] font-semibold p-1 rounded-sm">
                {"Available"}
              </span>
            </div>
            <span className="text-red-600 font-semibold">
                {item.price ? formatVND(item.price) : formatVND(240000)}
            </span>
          </div>
          <div className="flex items-center justify-end py-4" onClick={() => onSelected(item)}>
            <Button className="bg-red-600 hover:bg-red-500">Select</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
