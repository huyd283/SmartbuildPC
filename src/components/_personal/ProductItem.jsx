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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số phần tử mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        cate_id: id,
        filters: selectedFilter,
        smartbuild: []
      };
      try {
        const res = await getData(data);
        setDataproduct(res.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, selectedFilter]);

 const filteredProducts = Dataproduct.filter((item) =>
    item.productName.toLowerCase().includes(inputValue.toLowerCase())
  );

  const onSelected = (productId) => {
    toast.success("Chọn sản phẩm thành công!");
    onProductSelected(productId);
  };

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-full flex flex-col gap-y-3 max-h-[300px] lg:max-h-[450px] 2xl:max-h-[600px] overflow-y-scroll">
      {currentItems.map((item) => (
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
      <div className="flex justify-between mt-4">
        <Button className="bg-gray-500 hover:bg-gray-400" onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button className="bg-gray-500 hover:bg-gray-400" onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
