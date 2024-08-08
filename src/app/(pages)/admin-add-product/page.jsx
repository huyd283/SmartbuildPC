"use client";
import { getDataCate } from "@/service/Api-service/apiCategorys";
import { createProduct } from "@/service/Api-service/apiProducts"; // Giả sử bạn có hàm này để gọi API tạo sản phẩm
import { useEffect, useState } from "react";

export default function AddProduct() {
  const [listCate, setListCate] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getDataCate();
      const sortedData = res.result.sort((a, b) => a.categoryId - b.categoryId);
      setListCate(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setProductImage(file);
    } else {
      alert("Chỉ được phép tải lên file JPG.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productImage) {
      alert("Vui lòng chọn một ảnh sản phẩm.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("categoryId", productCategory);
    formData.append("image", productImage); // Gửi file ảnh qua API

    try {
      // const response = await createProduct(formData); // Giả sử bạn có hàm này để gọi API
      // console.log("Sản phẩm đã được tạo:", formData);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      console.log("Sản phẩm đã được tạo:", formData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-card text-card-foreground rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
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
            placeholder="Nhập tên sản phẩm"
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
            placeholder="Nhập mô tả"
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
            placeholder="Nhập giá"
            min={0}
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
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
            htmlFor="product-image"
            className="block text-primary font-semibold mb-2"
          >
            Ảnh sản phẩm
          </label>
          <input
            type="file"
            id="product-image"
            className="w-full p-2 border border-border rounded"
            accept=".jpg"
            onChange={handleImageChange}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-green-600 text-white font-semibold rounded hover:bg-green-400"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}
