"use client";
import { useEffect, useState } from "react";
import { changePassword, editUser, getDataProfile } from "@/service/Api-service/apiAccount";
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
    oldPass: "",
    newPass: "",
    resetPass: "",
  });


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
      const res = await changePassword(passwordData);
        if(res.statusCode === 200 || res.statusCode === 201) {
          toast.success("Password changed successfully!");
        } else {
          toast.error(res.errorMessages)
        }
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại");
      console.error("Error changing password:", error);
    }
  };
  const exitPopup = () => {
    setShowChangePasswordModal(false);
  }
  return (
    <div className="max-w-lg mx-auto p-6 bg-card rounded-lg  mt-56">
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4 text-center">Đổi Mật Khẩu</h3>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-muted-foreground"
                  htmlFor="oldPass"
                >
                  Mật khẩu cũ
                </label>
                <input
                  className="mt-1 block w-full border border-border rounded-md p-2"
                  type="password"
                  id="oldPass"
                  value={passwordData.oldPass}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-muted-foreground"
                  htmlFor="newPass"
                >
                  Mật khẩu mới
                </label>
                <input
                  className="mt-1 block w-full border border-border rounded-md p-2"
                  type="password"
                  id="newPass"
                  value={passwordData.newPass}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-muted-foreground"
                  htmlFor="resetPass"
                >
                  Nhập lại mật khẩu mới
                </label>
                <input
                  className="mt-1 block w-full border border-border rounded-md p-2"
                  type="password"
                  id="resetPass"
                  value={passwordData.resetPass}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex justify-between">
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
    </div>
  );
}
