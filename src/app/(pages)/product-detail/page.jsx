"use client";
import "../../../css/style2020_zip.css";
import "../../../css/media2020.css";
import "../../../css/otherstyle2020.css";

import { useEffect, useState } from "react";
import { getDetailProduct } from "@/service/Api-service/apiProducts";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function ProductDetal() {
  const [productdetail, setProductDetail] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.search;
      if (!queryString) {
        return;
      }
      const urlParams = new URLSearchParams(queryString);
      const searchQuery = urlParams.get("idProduct");

      const response = await getDetailProduct(searchQuery);
      setProductDetail(response.result);
    };
    fetchData();
  }, []);

  const onOk = () => {
    const existingItemsStr = Cookies.get("selectedItem");
    let existingItems = [];

    if (existingItemsStr) {
      try {
        existingItems = JSON.parse(decodeURIComponent(existingItemsStr));
      } catch (e) {
        console.error("Error parsing JSON from cookie:", e);
      }
    }
    const existingItem = existingItems.find(
      (i) => i.productId === productdetail.productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingItems.push({ ...productdetail, quantity: 1 });
    }
    const selectedItemStr = JSON.stringify(existingItems);
    Cookies.set("selectedItem", encodeURIComponent(selectedItemStr), {
      expires: 7,
    });
    toast.success("Product has been added to the cart!");
  };

  return (
    <>
      <div className="container mx-auto mt-11 px-4">
        <div className="bg-white rounded-md shadow-md p-4 flex flex-wrap">
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <h1 className="text-2xl font-bold mb-4">{productdetail?.productName}</h1>
            <img
              src={productdetail?.imageLink}
              alt="Product"
              className="w-full max-w-sm h-auto rounded-md"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col lg:pl-6">
            <div className="flex flex-wrap mb-4">
              <div className="mr-4">Product ID: <span className="font-semibold">PCHP838</span></div>
              <div className="mr-4">Rating: <span className="font-semibold">0</span></div>
              <div className="mr-4">Comment: <span className="font-semibold">0</span></div>
              <div>View Number: <span className="font-semibold">1244</span></div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Product Specification</div>
              <ul className="list-disc pl-5">
                <li>CategoryName: {productdetail?.categoryName}</li>
                <li>Price: {productdetail?.price}</li>
                <li>Warranty: {productdetail?.warranty}</li>
                <li>Brand: {productdetail?.brand}</li>
                <li>Tag: {productdetail?.tag}</li>
                <li>Tdp: {productdetail?.tdp}</li>
              </ul>
            </div>
            <button
              onClick={onOk}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Order Now
            </button>
            <div className="mt-4">
              <div className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold mb-2">
                REST ASSURED TO BUY
              </div>
              <ul className="list-disc pl-5">
                <li><a href="https://hacom.vn/gioi-thieu-ve-hacom" className="text-blue-600 hover:underline">Prestige 24 years Top in the market</a></li>
                <li><a href="https://www.hacom.vn/chinh-sach-hang-chinh-hang" className="text-blue-600 hover:underline">100% Genuine Products</a></li>
                <li><a href="https://www.hacom.vn/huong-dan-mua-hang-tra-gop" className="text-blue-600 hover:underline">0% interest installment for the entire shopping cart</a></li>
                <li><a href="https://www.hacom.vn/chinh-sach-bao-hanh" className="text-blue-600 hover:underline">Return the warranty to the place of use</a></li>
                <li><a href="https://www.hacom.vn/chinh-sach-cho-doanh-nghiep" className="text-blue-600 hover:underline">On-site warranty for businesses</a></li>
                <li><a href="https://www.hacom.vn/den-hacom-ve-sinh-may-tinh-mien-phi-tren-toan-he-thong" className="text-blue-600 hover:underline">PC lifetime free cleaning</a></li>
              </ul>
            </div>
            <div className="mt-4">
              <div className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold mb-2">
                FREE SHIP
              </div>
              <ul className="list-disc pl-5">
                <li>Free delivery to all of the country</li>
                <li>Receive payment at the bank (ship COD)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="bg-white rounded-md shadow-md p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Rate: {productdetail?.productName}</h2>
              <div id="js-product-description">
                <strong>Note: </strong>
                <p>
                  The image is for reference only because the product specification may vary according to the market for each version. If you need a specific configuration, please see the technical specification sheet or ask the business before purchasing.
                </p>
                <h3 className="font-semibold mt-4">Description:</h3>
                <p>{productdetail?.description}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Specifications</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">CategoryName</td>
                    <td className="px-6 py-4 whitespace-nowrap">{productdetail?.categoryName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Warranty</td>
                    <td className="px-6 py-4 whitespace-nowrap">{productdetail?.warranty}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Brand</td>
                    <td className="px-6 py-4 whitespace-nowrap">{productdetail?.brand}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Tag</td>
                    <td className="px-6 py-4 whitespace-nowrap">{productdetail?.tag}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">TDP</td>
                    <td className="px-6 py-4 whitespace-nowrap">{productdetail?.tdp}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
