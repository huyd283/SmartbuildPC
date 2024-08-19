"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { changeStatus, ListAccountForAdmin } from "@/service/Admin-service/admin-orders";

export default function Account() {
  const [listData, setlistData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await ListAccountForAdmin();
      setlistData(res?.result);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeUnbanStatus = async(id) => {
    const body = {
        "status": 1,
        "accountID": id
      }
      await changeStatus(body);
      await fetchData();
  }

  const changeBanStatus = async(id) => {
    const body = {
        "status": 0,
        "accountID": id
      }
      await changeStatus(body);
      await fetchData();
  }
  return (
    <div
      className="p-4 bg-card text-card-foreground bg-slate-100"
      style={{ marginLeft: "256px" }}
    >
      <h2 className="text-xl font-semibold mb-4">List Account</h2>
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
              <th className="px-4 py-2 border border-border">UserName</th>
              <th className="px-4 py-2 border border-border">Email</th>
              <th className="px-4 py-2 border border-border">AccountType</th>
              <th className="px-4 py-2 border border-border">Status</th>
              <th className="px-4 py-2 border border-border">Action</th>
          
            </tr>
          </thead>
          <tbody>
            {listData?.filter(x => x.accountType != "ADMIN").map((data, index) => (
              <tr key={index}>
                <td className="px-1 py-1 text-center border">{index + 1}</td>
              
                <td className="px-1 py-1 text-center border">
                  {data.username}
                </td>
                <td className="px-1 py-1 text-center border">
                  {data.email}
                </td>
              
                <td className="px-1 py-1 text-center border">{data.accountType}</td>
                <td className="px-1 py-1 text-center border">
                  <span>{data.status == 1 ? "Active" : "Not working"}</span>
                </td>
                <td className="px-1 py-1 text-center border">
                    {data.status == 1 ? (
                    <a onClick={() => changeBanStatus(data.accountID)} className="text-center" style={{cursor:'pointer'}}>Ban</a>
                    ):(
                        <a onClick={() => changeUnbanStatus(data.accountID)} className="text-center" style={{cursor:'pointer'}}>Unban</a>
                    )}
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
