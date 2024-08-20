"use client";
import { useEffect, useState } from "react";
import { editUser, getDataProfile } from "@/service/Api-service/apiAccount";
import toast from "react-hot-toast";
import Modal from "antd/es/modal/Modal";

export default function Widget() {
  const [dataUser, setDatUser] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    address: "",
    phone: "",
  });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchDataUser = async () => {
    try {
      const res = await getDataProfile();
      setDatUser(res?.result);
      setEditData({
        fullName: res?.result?.fullName || "",
        address: res?.result?.address || "",
        phone: res?.result?.phone || "",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editUser(editData);
      console.log(res);
      if(res.statusCode === 200 || res.statusCode === 201){
        toast.success(res.message);
      } else {
        toast.error(res.errorMessages);
      }
    } catch (error) {
      toast.error("Chỉnh sửa thất bại");
      console.error("Error submitting edit:", error);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log(passwordData);
    // Xử lý logic đổi mật khẩu ở đây
    try {
      // Ví dụ gọi API đổi mật khẩu ở đây
      // const res = await changePassword(passwordData);
      // toast.success(res.message);
      toast.success("Password changed successfully!");
      setShowChangePasswordModal(false);
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Thông tin cá nhân
      </h2>
      <form onSubmit={handleEditSubmit}>
        {/* Các trường thông tin cá nhân */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-muted-foreground"
            htmlFor="fullName"
          >
            Họ và tên
          </label>
          <input
            className="mt-1 block w-full border border-border rounded-md p-2"
            type="text"
            id="fullName"
            value={editData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-muted-foreground"
            htmlFor="address"
          >
            Địa chỉ
          </label>
          <input
            className="mt-1 block w-full border border-border rounded-md p-2"
            type="text"
            id="address"
            value={editData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-muted-foreground"
            htmlFor="username"
          >
            Tên tài khoản
          </label>
          <input
            className="mt-1 block w-full border border-border rounded-md p-2"
            type="text"
            id="username"
            value={dataUser?.username}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-muted-foreground"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 block w-full border border-border rounded-md p-2"
            type="email"
            id="email"
            value={dataUser?.email}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-muted-foreground"
            htmlFor="phone"
          >
            Số điện thoại
          </label>
          <input
            className="mt-1 block w-full border border-border rounded-md p-2"
            type="tel"
            id="phone"
            value={editData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-cyan-500 text-white hover:bg-cyan-500/80 px-4 py-2 rounded-md"
          >
            Chỉnh sửa
          </button>
          <button
            type="button"
            className="bg-emerald-500 text-white hover:bg-emerald-500/80 px-4 py-2 rounded-md"
            onClick={() => setShowChangePasswordModal(true)}
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>

      {showChangePasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4 text-center">Đổi Mật Khẩu</h3>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-muted-foreground"
                  htmlFor="oldPassword"
                >
                  Mật khẩu cũ
                </label>
                <input
                  className="mt-1 block w-full border border-border rounded-md p-2"
                  type="password"
                  id="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-muted-foreground"
                  htmlFor="newPassword"
                >
                  Mật khẩu mới
                </label>
                <input
                  className="mt-1 block w-full border border-border rounded-md p-2"
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-muted-foreground"
                  htmlFor="confirmPassword"
                >
                  Nhập lại mật khẩu mới
                </label>
                <input
                  className="mt-1 block w-full border border-border rounded-md p-2"
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white hover:bg-emerald-500/80 px-4 py-2 rounded-md"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
