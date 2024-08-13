"use client";

import {
  GetAllProducts,
  deleteProduct,
  updateProduct,
} from "@/service/Admin-service/admin-product";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function Product() {
  const [listData, setListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    categoryName: "",
    categoryID: "",
    productName: "",
    description: "",
    price: "",
    warranty: "",
    brand: "",
    tag: "",
    tdp: "",
    imageLink: "",
  });

  const fetchData = async (page = 1) => {
    try {
      const res = await GetAllProducts({ page, limit: itemsPerPage });
      setListData(res?.result?.products);
      setTotalItems(res?.result?.totalItems || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageLink: e.target.files[0],
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        updatedFormData.append(key, formData[key]);
      });
      await updateProduct(formData.productId, updatedFormData);
      setIsEditModalOpen(false);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error updating product:", error);
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
                <td className="px-1 py-1 text-center border">
                  {data.warranty}
                </td>
                <td className="px-1 py-1 text-center border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEdit(data)}
                  >
                    Sửa
                  </button>

                  {/* Delete Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setSelectedProduct(data.productId)}
                      >
                        Xóa
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <h2 className="text-lg font-semibold">
                          Bạn có chắc chắn muốn xóa sản phẩm này không? Hành
                          động không thể hoàn tác!
                        </h2>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <button className="px-4 py-2 bg-gray-200 text-black rounded">
                            Hủy
                          </button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <button
                            onClick={() => handleDelete(selectedProduct)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                          >
                            Xác nhận
                          </button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Sửa Sản Phẩm</h2>
            <form>
              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Giá</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Bảo hành</label>
                <input
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Hãng</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">TDP</label>
                <input
                  type="number"
                  name="tdp"
                  value={formData.tdp}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Ảnh</label>
                <input
                  type="file"
                  name="imageLink"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </form>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleUpdateProduct}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm">
          Hiện {itemsPerPage * (currentPage - 1) + 1} đến{" "}
          {Math.min(itemsPerPage * currentPage, totalItems)} trong {totalItems}{" "}
          mục
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border border-border rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </button>
          {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map(
            (_, index) => (
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
            )
          )}
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
