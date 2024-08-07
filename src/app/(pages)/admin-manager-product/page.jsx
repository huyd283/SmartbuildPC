"use client";

import { getData } from "@/service/Admin-service/admin-product";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
  const [listData, setlistData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getData();
      setlistData(res?.result);
      console.log(listData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="p-4 bg-card text-card-foreground bg-slate-100"
      style={{ marginLeft: "256px" }}
    >
      <h2 className="text-xl font-semibold mb-4">Danh Sách Sản Phẩm</h2>
      {/* <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium">Chọn ngày:</label>
              <input type="date" id="date" className="mt-1 block w-full border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm" placeholder="Ngày/ Tháng/ Năm" />
            </div>
            <div>
              <label htmlFor="device" className="block text-sm font-medium">Chọn thiết bị:</label>
              <input type="text" id="device" className="mt-1 block w-full border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm" placeholder="Thiết bị" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium">Chọn trạng thái:</label>
              <select id="status" className="mt-1 block w-full border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm">
                <option>Trạng thái</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md">Tìm kiếm</button>
            </div>
          </div> */}
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
              <th className="px-4 py-2 border border-border">Trạng thái</th>
              <th className="px-4 py-2 border border-border">Ngày tạo</th>
              <th className="px-4 py-2 border border-border">Quản lý</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((data, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
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
                <td className="px-4 py-2 border">{data.productId}</td>
                <td className="px-4 py-2 border">{data.productName}</td>
                <td className="px-4 py-2 border">{data.tdp}</td>
                <td className="px-4 py-2 border">{data.price}</td>
                <td className="px-4 py-2 border">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full">
                    {data.tdp}
                  </span>
                </td>
                <td className="px-4 py-2 border">{data.date}</td>
                <td className="px-4 py-2 border text-center">
                  <i class="fa-solid fa-pencil"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm">Hiện 1 đến 5 trong 5 mục</span>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border border-border rounded-md"
            disabled
          >
            «
          </button>
          <span className="px-2 py-1 border border-border rounded-md bg-primary text-primary-foreground">
            1
          </span>
          <button
            className="px-2 py-1 border border-border rounded-md"
            disabled
          >
            »
          </button>
          <span>Hiện</span>
          <select className="border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm">
            <option>10</option>
          </select>
          <span>mục</span>
        </div>
      </div>
    </div>
  );
}
