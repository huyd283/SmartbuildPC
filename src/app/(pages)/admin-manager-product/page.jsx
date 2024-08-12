"use client";

import { GetAllProducts } from "@/service/Admin-service/admin-product";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
  const [listData, setListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(50); 

  const fetchData = async (page = 1) => {
    try {
      const res = await GetAllProducts({ page, limit: itemsPerPage });
      setListData(res?.result?.products);
      setTotalItems(res?.result?.totalItems || 0); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, itemsPerPage]);

  return (
    <div
      className="p-4 bg-card text-card-foreground bg-slate-100"
      style={{ marginLeft: "256px" }}
    >
      <h2 className="text-xl font-semibold mb-4">Danh Sách Sản Phẩm</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-border rounded-md">
          <thead className="bg-stone-500 text-primary-foreground">
            <tr>
              <th className="px-4 py-2 border border-border">#</th>
              <th className="px-4 py-2 border border-border">Ảnh</th>
              <th className="px-4 py-2 border border-border">Mã sản phẩm</th>
              <th className="px-4 py-2 border border-border">Tên Sản Phẩm</th>
              <th className="px-4 py-2 border border-border">Còn lại</th>
              <th className="px-4 py-2 border border-border">Số tiền</th>
              <th className="px-4 py-2 border border-border">Hãng</th>
              <th className="px-4 py-2 border border-border">Bảo hành</th>
              <th className="px-4 py-2 border border-border">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            {listData?.map((data, index) => (
              <tr key={index}>
                <td className="px-1 py-1 text-center border">{index + 1}</td>
                <td className="px-1 py-1 text-center border">
                  <Image
                    src={
                      data?.imageLink ||
                      "https://maytinh.sharekhoahoc.vn/wp-content/uploads/2021/12/8530d87af9fc1bf1a3617728d8954b16_63b594ba72d04e3bb9688047fa42ab2f_master-400x400.jpg"
                    }
                    unoptimized
                    alt={data.productName || "Product Image"}
                    width={100}
                    height={100}
                    className="bg-center bg-contain"
                  />
                </td>
                <td className="px-1 py-1 text-center border">
                  {data.productId}
                </td>
                <td className="px-1 py-1 text-center border">
                  {data.productName}
                </td>
                <td
                  className={`px-1 py-1 text-center border ${
                    data.tdp > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span>{data.tdp}</span>
                </td>
                <td className="px-1 py-1 text-center border">{data.price}</td>
                <td className="px-1 py-1 text-center border">
                  <span>{data.brand}</span>
                </td>
                <td className="px-1 py-1 text-center border">{data.warranty}</td>
                <td className="px-1 py-1 text-center border text-black">
                  <i className="fa-solid fa-pencil"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm">
          Hiện {itemsPerPage * (currentPage - 1) + 1} đến{" "}
          {Math.min(itemsPerPage * currentPage, totalItems)} trong {totalItems} mục
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border border-border rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </button>
          {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map((_, index) => (
            <span
              key={index}
              className={`px-2 py-1 border border-border rounded-md ${
                currentPage === index + 1
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <button
            className="px-2 py-1 border border-border rounded-md"
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </button>
          <span>Hiện</span>
          <select
            className="border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm"
            onChange={(e) => {
              setCurrentPage(1); // Reset về trang 1 khi thay đổi số lượng sản phẩm mỗi trang
              setItemsPerPage(Number(e.target.value));
            }}
            value={itemsPerPage}
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
          <span>mục</span>
        </div>
      </div>
    </div>
  );
}
