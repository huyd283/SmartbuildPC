"use client";
import { getStatistics } from "@/service/Admin-service/admin-dashboard";
import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [listData, setlistData] = useState({});

  const fetchData = async () => {
    try {
      const res = await getStatistics();
      setlistData(res?.result || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lấy dữ liệu từ listData và chuẩn bị cho biểu đồ
  const ordersByStatus = listData.ordersByStatus || {};
  const data = {
    labels: Object.keys(ordersByStatus),
    datasets: [
      {
        label: '# of Orders',
        data: Object.values(ordersByStatus),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Tổng số sản phẩm</h2>
          <p className="text-3xl">{listData?.totalProducts}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Tổng số đơn hàng</h2>
          <p className="text-3xl">{listData?.totalOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Tổng doanh thu</h2>
          <p className="text-3xl">{listData?.totalSales?.toLocaleString('vi-VN')} VND</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-1/2 mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
