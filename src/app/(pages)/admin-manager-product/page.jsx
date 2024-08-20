"use client";
import { getDataCate, getDataStore } from "@/service/Api-service/apiCategorys";

import {
  GetAllProducts,
  deleteProduct,
  getTagbyCategory,
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
import { TreeSelect } from "antd";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pencil, Trash2 } from "lucide-react";

const { TreeNode } = TreeSelect;
export default function Product() {
  const [listData, setListData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [listCate, setListCate] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productWarranty, setProductWarranty] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productTag, setProductTag] = useState("");
  const [productTPD, setProductTPD] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productId, setProductId] = useState(null);
  const [dataTreeselect, setDataTreeselect] = useState([]);

  const fetchDataCate = async () => {
    try {
      const res = await getDataCate();
      const sortedData = res.result.sort((a, b) => a.categoryId - b.categoryId);
      setListCate(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async (page = 1, category = "") => {
    try {
      const res = await GetAllProducts({ page, limit: itemsPerPage, category });
      setListData(res?.result?.products);
      setTotalItems(res?.result?.totalItems || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchDataTag = async (categoryId) => {
      setProductTag([]);
      try {
        const res = await getTagbyCategory(categoryId);
        const mappedData = res.result.map((item) => ({
          title: item.name,
          value: item.name,
          key: item.name,
          children: item.values.map((value) => ({
            title: value,
            value: value,
            key: value,
          })),
        }));
        setDataTreeselect(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (productCategory) {
      fetchDataTag(productCategory);
    }
  }, [productCategory]);
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchData(currentPage);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    console.log(product);
    setProductId(product.productId);
    setProductBrand(product.brand);
    setProductCategory(product.categoryID);
    setProductDescription(product.description);
    setProductImage(product.imageLink);
    setProductName(product.productName);
    setProductPrice(product.price);
    setProductQuantity;
    setProductStatus;
    setProductTPD(product.tdp);
    setProductTag(product.tag);
    setProductWarranty(product.warranty);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("ProductName", productName);
      formData.append("Description", productDescription);
      formData.append("Price", productPrice);
      formData.append("Warranty", productWarranty);
      formData.append("Brand", productBrand);
      formData.append("Tag", productTag);
      formData.append("TDP", productTPD);
      formData.append("Status", productStatus);
      formData.append("CategoryID", productCategory);
      formData.append("Quantity", productQuantity);
      formData.append("ImageFile", productImage);
      const response = await updateProduct(productId, formData);
      if (response.statusCode === 200 || response.statusCode === 201) {
        setIsEditModalOpen(false);
        fetchData(currentPage);
        toast.success("Sửa sản phẩm thành công");
      } else {
        toast.error(response.title);
      }
    } catch (error) {
      toast.error("Sửa sản phẩm thất bại");
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setProductImage(file);
    } else {
      alert("Chỉ được phép tải lên file JPG.");
    }
  };
  useEffect(() => {
    fetchData(currentPage);
    fetchDataCate();
  }, [currentPage, itemsPerPage]);
  const onChangeTag = (newValue) => {
    if (productCategory === "2") {
      const uniqueValues = new Set(newValue.map((val) => val.split("-")[0]));
      const filteredValues = Array.from(uniqueValues).flatMap((key) => {
        return newValue.filter((val) => val.startsWith(key)).slice(0, 1);
      });
      setProductTag(filteredValues);
    } else {
      setProductTag(newValue);
    }
  };
  const handleCategoryChange = (categoryId) => {
    fetchData(currentPage, categoryId);
  };
  return (
    <div
      className="p-4 bg-card text-card-foreground bg-slate-100"
      style={{ marginLeft: "256px" }}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh Sách Sản Phẩm</h2>
        <div className="flex items-center">
          <label
            htmlFor="category-filter"
            className="mr-2 text-primary font-semibold"
          >
            Lọc theo danh mục:
          </label>
          <select
            id="category-filter"
            className="p-2 border border-border rounded"
            value={productCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {listCate.map((item) => (
              <option key={item.categoryId} value={item.categoryId}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>
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
                    data.quantity > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span>{data.quantity}</span>
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
                    <Pencil />
                  </button>
                  {/* Delete Confirmation Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setSelectedProduct(data.productId)}
                      >
                                          <Trash2 />                  

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
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90%] min-w-[40%] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Sửa Sản Phẩm</h2>
            <formData>
              <div className="mb-4">
                <label
                  htmlFor="product-category"
                  className="block text-primary font-semibold mb-2"
                >
                  Danh mục sản phẩm
                </label>
                <select
                  id="product-category"
                  className="w-full p-2 border border-border rounded"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {listCate.map((item) => (
                    <option key={item.categoryId} value={item.categoryId}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-tag"
                  className="block text-primary font-semibold mb-2"
                >
                  Tag
                </label>
                <TreeSelect
                  showSearch
                  style={{ width: "100%" }}
                  value={productTag}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  multiple={
                    productCategory === "9" ||
                    productCategory === "2" ||
                    productCategory === "7"
                  }
                  onChange={onChangeTag}
                >
                  {dataTreeselect?.map((item) => (
                    <TreeNode
                      key={item.key}
                      value={`${item.key}-${item.value}`}
                      title={item.title}
                    >
                      {item.children &&
                        item.children.map((child) => (
                          <TreeNode
                            key={child.key}
                            value={`${item.key}-${child.value}`}
                            title={child.title}
                          />
                        ))}
                    </TreeNode>
                  ))}
                </TreeSelect>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-name"
                  className="block text-primary font-semibold mb-2"
                >
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="product-name"
                  className="w-full p-2 border border-border rounded"
                  placeholder="Enter tên sản phẩm"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-description"
                  className="block text-primary font-semibold mb-2"
                >
                  Mô tả
                </label>
                <input
                  type="text"
                  id="product-description"
                  className="w-full p-2 border border-border rounded"
                  placeholder="Enter mô tả"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-price"
                  className="block text-primary font-semibold mb-2"
                >
                  Giá sản phẩm
                </label>
                <input
                  type="number"
                  id="product-price"
                  className="w-full p-2 border border-border rounded"
                  placeholder="Enter giá"
                  min={0}
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-warranty"
                  className="block text-primary font-semibold mb-2"
                >
                  Bảo hành
                </label>
                <select
                  id="product-warranty"
                  className="w-full p-2 border border-border rounded"
                  value={productWarranty}
                  onChange={(e) => setProductWarranty(e.target.value)}
                  required
                >
                  <option value="" hidden>
                    Chọn thời gian
                  </option>
                  <option value="12 Months">12 Months</option>
                  <option value="24 Months">24 Months</option>
                  <option value="36 Months">36 Months</option>
                  <option value="48 Months">48 Months</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-brand"
                  className="block text-primary font-semibold mb-2"
                >
                  Thương hiệu
                </label>
                <input
                  type="text"
                  id="product-brand"
                  className="w-full p-2 border border-border rounded"
                  placeholder="Enter brand"
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-tpd"
                  className="block text-primary font-semibold mb-2"
                >
                  TPD
                </label>
                <input
                  type="text"
                  id="product-tpd"
                  className="w-full p-2 border border-border rounded"
                  placeholder="Enter TPD"
                  value={productTPD}
                  onChange={(e) => setProductTPD(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-status"
                  className="block text-primary font-semibold mb-2"
                >
                  Trạng thái 
                </label>
                <select
                  id="product-status"
                  className="w-full p-2 border border-border rounded"
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value)}
                  required
                >
                  <option value="0">Ngừng kinh doanh</option>
                  <option value="1">Đang kinh doanh</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-quantity"
                  className="block text-primary font-semibold mb-2"
                >
                  Số lượng
                </label>
                <input
                  type="number"
                  id="product-quantity"
                  className="w-full p-2 border border-border rounded"
                  placeholder="Enter số lượng"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="product-image"
                  className="block text-primary font-semibold mb-2"
                >
                  Hình ảnh sản phẩm
                </label>
                <input
                  type="file"
                  id="product-image"
                  className="w-full p-2 border border-border rounded"
                  accept="image/jpeg"
                  onChange={handleImageChange}
                  required
                />
              </div>
            </formData>
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
