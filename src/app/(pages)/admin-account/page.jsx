"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  changeStatus,
  ListAccountForAdmin,
} from "@/service/Admin-service/admin-orders";
import { createUser } from "@/service/Api-service/apiAccount";
import toast from "react-hot-toast";

export default function Account() {
  const [listData, setlistData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    accounType: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const fetchData = async (page = 1) => {
    try {
      const res = await ListAccountForAdmin(page, itemsPerPage);
      setlistData(res?.result);
      setTotalItems(res?.totalItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, itemsPerPage]);

  const changeUnbanStatus = async (id) => {
    const body = {
      status: 1,
      accountID: id,
    };
    await changeStatus(body);
    await fetchData(currentPage);
  };

  const changeBanStatus = async (id) => {
    const body = {
      status: 0,
      accountID: id,
    };
    await changeStatus(body);
    await fetchData(currentPage);
  };

  const handleAddNew = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPasswordError("");
    setFormData({
      username: "",
      email: "",
      password: "",
      fullName: "",
      accounType: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.password) {
      setPasswordError("Mật khẩu không khớp!");
    } else {
      setPasswordError("");
      try {
        const res = await createUser(formData);
        if (res.statusCode === 200 || res.statusCode === 201) {
          toast.success(res.message);
          closePopup();
        } else {
          toast.error(res.errorMessages);
        }
      } catch (error) {
        toast.error("Thêm mới thất bại");
        console.error("Error submitting edit:", error);
      }
    }
  };

  return (
    <div
      className="p-4 bg-card text-card-foreground bg-slate-100"
      style={{ marginLeft: "256px" }}
    >
      <h2 className="text-xl font-semibold mb-4">List Account</h2>

      <button
        onClick={handleAddNew}
        className="bg-green-500 text-white hover:bg-green-500/80 px-4 py-2 rounded-md mb-4"
      >
        Thêm mới
      </button>

      {/* Popup thêm mới */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <h3 className="text-lg font-semibold mb-4">Thêm tài khoản mới</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">UserName</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-input rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-input rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-input rounded-md shadow-sm"
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-sm font-medium">Nhập lại mật khẩu</label>
              <input
                type="password"
                value={setConfirmPassword}
                className="mt-1 block w-full border border-input rounded-md shadow-sm"
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div> */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-input rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Loại tài khoản
              </label>
              <select
                name="accounType"
                value={formData.accounType}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-input rounded-md shadow-sm"
              >
                <option value="" hidden>
                  Chọn loại tài khoản
                </option>
                {/* <option value="CUSTOMER">CUSTOMER</option> */}
                <option value="STAFF">STAFF</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

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
            {listData
              ?.filter((x) => x.accountType != "ADMIN")
              .map((data, index) => (
                <tr key={index}>
                  <td className="px-1 py-1 text-center border">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="px-1 py-1 text-center border">
                    {data.username}
                  </td>
                  <td className="px-1 py-1 text-center border">{data.email}</td>
                  <td className="px-1 py-1 text-center border">
                    {data.accountType}
                  </td>
                  <td className="px-1 py-1 text-center border">
                    <span>{data.status == 1 ? "Active" : "Not working"}</span>
                  </td>
                  <td className="px-1 py-1 text-center border">
                    {data.status == 1 ? (
                      <a
                        onClick={() => changeBanStatus(data.accountID)}
                        className="text-center"
                        style={{ cursor: "pointer" }}
                      >
                        Ban
                      </a>
                    ) : (
                      <a
                        onClick={() => changeUnbanStatus(data.accountID)}
                        className="text-center"
                        style={{ cursor: "pointer" }}
                      >
                        Unban
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm">
          Hiện {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} đến{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} trong {totalItems}{" "}
          mục
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-2 py-1 border border-border rounded-md"
            disabled={currentPage === 1}
          >
            «
          </button>
          <span className="px-2 py-1 border border-border rounded-md bg-primary text-primary-foreground">
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-2 py-1 border border-border rounded-md"
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            »
          </button>
          <span>Hiện</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>mục</span>
        </div>
      </div>
    </div>
  );
}
