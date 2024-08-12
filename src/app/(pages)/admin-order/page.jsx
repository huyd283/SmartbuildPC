"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { getListOrders } from "@/service/Admin-service/admin-orders";

export default function Orders() {
  const [listData, setlistData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const fetchData = async (page = 1) => {
    try {
      const res = await getListOrders(page, itemsPerPage); // Giả sử API hỗ trợ phân trang
      setlistData(res?.result);
      setTotalItems(res?.totalItems || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div
      className="p-4 bg-card text-card-foreground bg-slate-100"
      style={{ marginLeft: "256px" }}
    >
      <h2 className="text-xl font-semibold mb-4">List Orders</h2>
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
                <td className="px-1 py-1 text-center border">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
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
                <td className="px-1 py-1 text-center border">
                  {data.warranty}
                </td>
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
          {Math.min(itemsPerPage * currentPage, totalItems)} trong {totalItems}{" "}
          mục
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border border-border rounded-md"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-2 py-1 border border-border rounded-md ${
                currentPage === i + 1
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-2 py-1 border border-border rounded-md"
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            »
          </button>
          <span>Hiện</span>
          <select
            className="border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm"
            value={itemsPerPage}
            disabled
          >
            <option>10</option>
          </select>
          <span>mục</span>
        </div>
      </div>
    </div>
  );
}
