"use client";
import { createProduct } from "@/service/Admin-service/admin-product";
import { getDataCate, getDataStore } from "@/service/Api-service/apiCategorys";
import { useEffect, useState } from "react";

export default function AddProduct() {
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
  const [productQuantity, setProductQuantity] = useState('');
  const [productImage, setProductImage] = useState(null);

  const fetchDataCate = async () => {
    try {
      const res = await getDataCate();
      const sortedData = res.result.sort((a, b) => a.categoryId - b.categoryId);
      setListCate(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataCate();
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
    formData.append("ProductName", productName);
    formData.append("Description", productDescription);
    formData.append("price", productPrice);
    formData.append("Warranty", productWarranty);
    formData.append("Brand", productBrand);
    formData.append("Tag", productTag);
    formData.append("tpd", productTPD);
    formData.append("status", productStatus);
    formData.append("categoryId", productCategory);
    formData.append("quantity", productQuantity)
    formData.append("ImageFile", productImage);
    try {
      const res = await createProduct(formData)
      console.log(res);
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
            <option value="" hidden>Chọn thời gian</option>
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
            htmlFor="product-tag"
            className="block text-primary font-semibold mb-2"
          >
            Tag
          </label>
          <input
            type="text"
            id="product-tag"
            className="w-full p-2 border border-border rounded"
            placeholder="Enter tag"
            value={productTag}
            onChange={(e) => setProductTag(e.target.value)}
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
            Status
          </label>
          <input
            type="text"
            id="product-status"
            className="w-full p-2 border border-border rounded"
            placeholder="Enter status"
            value={productStatus}
            onChange={(e) => setProductStatus(e.target.value)}
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
            htmlFor="product-store"
            className="block text-primary font-semibold mb-2"
          >
            Số lượng
          </label>
          <input
            type="number"
            id="product-store"
            className="w-full p-2 border border-border rounded"
            placeholder="Enter quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-image"
            className="block text-primary font-semibold
 mb-2"
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
