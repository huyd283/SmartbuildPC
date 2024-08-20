"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { createOrders } from "@/service/Api-service/apiOrders";
export default function Cart() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState(null)
  useEffect(() => {
    const selectedItemStr = Cookies.get("selectedItem");
    if (selectedItemStr) {
      try {
        const selectedItemArray = JSON.parse(
          decodeURIComponent(selectedItemStr)
        );
        setSelectedItems(selectedItemArray);
        console.log(selectedItemArray);
      } catch (e) {
        console.error("Error parsing JSON from cookie:", e);
      }
    }

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const decodedToken = jwtDecode(parsedUser?.tokenInformation?.accessToken);
      setCurrentUser(parsedUser);
      setName(decodedToken.unique_name);
    }
    setDate(new Date().toISOString())
  }, []);

  const updateCookie = (items) => {
    Cookies.set("selectedItem", encodeURIComponent(JSON.stringify(items)), {
      expires: 7,
    });
  };

  const handleIncrement = (productId) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setSelectedItems(updatedItems);
    updateCookie(updatedItems);
  };

  const handleDecrement = (productId) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.productId === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          setCurrentItem(item);
          setIsDialogOpen(true);
        }
      }
      return item;
    });
    setSelectedItems(updatedItems);
    updateCookie(updatedItems);
  };

  const handleQuantityChange = (e, productId) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      const updatedItems = selectedItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: value };
        }
        return item;
      });
      setSelectedItems(updatedItems);
      updateCookie(updatedItems);
    }
  };

  const handleConfirmDelete = () => {
    const updatedItems = selectedItems.filter(
      (item) => item.productId !== currentItem.productId
    );
    setSelectedItems(updatedItems);
    updateCookie(updatedItems);
    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isSelected: !selectAll }))
    );
  };

  const handleSelectItem = (productId) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setSelectedItems(updatedItems);
  };

  const handleProceedToCheckout = () => {
    if (!currentUser) {
      toast.error("You need to log in to proceed to checkout.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      const selectedProducts = selectedItems.filter((item) => item.isSelected);
      if (selectedProducts.length === 0) {
        toast.error("Product empty");
      } else {
        try {
          const data = {
            orderDate: date,
            orderStatus: 0,
            orderAddress: name,
            items: selectedProducts.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          }
          const res = createOrders(data);
          const updatedItems = selectedItems.filter((item) => !selectedProducts.some((p) => p.productId === item.productId));
          setSelectedItems(updatedItems);
          updateCookie(updatedItems);
          window.location.href = "/orders-manager";

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ml-4">Shopping Cart</h2>
      <div className="flex items-center mb-4 ml-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <span>Select All ({selectedItems.length} items)</span>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 border-r pr-4 pb-4 mb-4">
          {selectedItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            selectedItems.map((item) => (
              <div key={item.productId} className="flex flex-col md:flex-row items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={item.isSelected || false}
                  onChange={() => handleSelectItem(item.productId)}
                />
                <img
                  src={
                    item.imageLink ||
                    "https://drive.google.com/file/d/1ieHm5StVSB_mciaAk80jIYjQCdFBL8Ji/view?usp=sharing"
                  }
                  alt={item.productName}
                  className="w-24 h-24 mr-4"
                />
                <div className="flex-1">
                  <div className="font-bold">{item.productName}</div>
                  <div className="text-sm text-zinc-500">
                    Product ID: {item.productId}
                  </div>
                </div>
                <div className="text-right md:text-left">
                  <div className="text-lg font-bold text-red-500">
                    {item.price.toLocaleString()}₫
                  </div>
                </div>
                <div className="flex items-center mt-2 md:mt-0 md:ml-4">
                  <button
                    onClick={() => handleDecrement(item.productId)}
                    className="border px-2"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.productId)}
                    className="w-12 text-center border-t border-b"
                  />
                  <button
                    onClick={() => handleIncrement(item.productId)}
                    className="border px-2"
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-bold text-red-500 mt-2 md:mt-0 md:ml-4">
                  {(item.price * item.quantity).toLocaleString()}₫
                </div>
  
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <div className="hidden" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this item?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This item will be removed from your cart. Please confirm
                        to proceed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={handleCancelDelete}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500"
                        onClick={handleConfirmDelete}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-1/4 pl-4">
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>
                {selectedItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
                ₫
              </span>
            </div>
            <div className="flex justify-between font-bold text-red-500 mb-4">
              <span>Total</span>
              <span>
                {selectedItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
                ₫
              </span>
            </div>
            <div className="text-sm text-zinc-500 mb-4">
              (Includes VAT if applicable)
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="bg-blue-500 text-white w-full py-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}
