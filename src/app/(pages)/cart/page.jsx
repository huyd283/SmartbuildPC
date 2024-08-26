"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Image, Radio, Form, Input } from "antd";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import {
  createOrders,
  generateQrCode,
  checkPaymentOrGenerateQrCode,
} from "@/service/Api-service/apiOrders";
import { createBill, exportBill } from "@/service/Api-service/apiProducts";
import { downloadTxtFile } from "@/service/convert/convertFile";
import { ApproveOrder } from "@/service/Api-service/apiOrders";
export default function Cart() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [isOpenQRCode, setIsOpenQRCode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [qrUrl, setQrUrl] = useState();
  const [address, setAddress] = useState();
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  useEffect(() => {
    const selectedItemStr = Cookies.get("selectedItem");
    if (selectedItemStr) {
      try {
        const selectedItemArray = JSON.parse(
          decodeURIComponent(selectedItemStr)
        );
        setSelectedItems(
          selectedItemArray.map((i) => ({
            ...i,
            quantity: i.quantityBuy,
            isSelected: true,
          }))
        );
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
    setDate(new Date().toISOString());
  }, []);

  const updateCookie = (items) => {
    Cookies.set("selectedItem", encodeURIComponent(JSON.stringify(items)), {
      expires: 7,
    });
  };

  const handleIncrement = (productId) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.productId === productId) {
        if (item.quantity >= item.quantityOfProduct) {
          toast.error(`Quantity of Product is ${item.quantityOfProduct}!`);
          return item;
        }
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
          if (value > item.quantityOfProduct) {
            toast.error(`Quantity of Product is ${item.quantityOfProduct}!`);
            return item;
          }
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
      setIsOpenPayment(true);
    }
  };

  const xuatFile = async (orderId) => {
    const body = {
      orderId: orderId,
      billDate: date,
      taxIn: 0,
      address: address,
    };
    const response = await createBill(body);
    const responseexport = await exportBill(response.result);
    await downloadTxtFile(responseexport);
  };

  const confirmOrder = async (paymentType) => {
    const selectedProducts = selectedItems.filter((item) => item.isSelected);
    if (selectedProducts.length === 0) {
      toast.error("Product empty");
    } else {
      try {
        const data = {
          orderDate: date,
          orderStatus: 0,
          orderAddress: address,
          items: selectedProducts.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        };
        const resOrder = await createOrders(data);
        const updatedItems = selectedItems.filter(
          (item) =>
            !selectedProducts.some((p) => p.productId === item.productId)
        );
        setSelectedItems(updatedItems);
        updateCookie(updatedItems);
        if (paymentType === 2) {
          const total = selectedProducts.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          const resQR = await generateQrCode(resOrder.result);
          console.log("resQR: ", resQR);
          setQrUrl(resQR.result.replace("5000", total));
          setIsOpenQRCode(true);
          let intervalId = setInterval(async () => {
            const res = await checkPaymentOrGenerateQrCode(resOrder.result);
            if (res.result === "Payment pending or needs processing.") return;
            clearInterval(intervalId);
            toast.success(res.result);
            const data = {
              orderID: resOrder.result,
              orderStatus: "APPROVED",
            };
            const resStatus = await ApproveOrder(data);
            xuatFile(resOrder.result);
            window.location.href = "/orders-manager";
          }, 3000);
        } else {
          setIsOpenQRCode(false);
          window.location.href = "/orders-manager";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
              <div
                key={item.productId}
                className="flex flex-col md:flex-row items-center mb-4"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={item.isSelected || false}
                  onChange={(checked) => {
                    handleSelectItem(item.productId);
                  }}
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
                    {item.price?.toLocaleString() || 0}₫
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
                <span
                  className="text-white bg-[red] font-semibold p-1 rounded-sm ml-5"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCurrentItem(item);
                    setIsDialogOpen(true);
                  }}
                >
                  Delete
                </span>
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
                  .filter((i) => i.isSelected)
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
                  .filter((i) => i.isSelected)
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
      <Dialog
        open={isOpenPayment}
        onOpenChange={(open) => {
          setIsOpenPayment(open);
          // if (open) {
          //   handleClickSelect(false);
          // } else {
          //   setIsOpenPayment(false);
          // }
        }}
      >
        <DialogContent className="w-full sm:w-2/5 max-w-[1200px] h-auto min-h-[250px] lg:min-h-[350px] 2xl:min-h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Verify Order</DialogTitle>
          </DialogHeader>
          <h5 class="font-bold mt-4">Address Information</h5>
          <Input
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <h5 class="font-bold">Payment Type</h5>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              className="bg-red-600 hover:bg-red-500 mr-2 md:w-auto"
              style={{ width: "auto" }}
              onClick={() => {
                confirmOrder(1);
              }}
            >
              Payment upon receipt
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 md:w-auto"
              style={{ width: "auto" }}
              onClick={() => {
                confirmOrder(2);
              }}
            >
              Payment QR Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenQRCode} onOpenChange={setIsOpenQRCode}>
        <DialogContent className="w-full sm:w-2/5 max-w-[350px] h-auto min-h-[250px] lg:min-h-[350px] 2xl:min-h-[350px] flex flex-col">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
          </DialogHeader>
          <Image
            preview={false}
            src={qrUrl}
            alt={"QR Code"}
            width={"100%"}
            height={"auto"}
            className="bg-center bg-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
