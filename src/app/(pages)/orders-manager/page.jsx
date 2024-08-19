"use client";
import { CancelOrder, getListOrders } from "@/service/Api-service/apiOrders";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { createBill, exportBill } from "@/service/Api-service/apiProducts";
import { downloadTxtFile } from "@/service/convert/convertFile";

export default function Widget() {
  const [listOrder, setListOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("All");
  const [openOrderId, setOpenOrderId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getListOrders();
      setListOrder(res?.result || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orderStatus, listOrder]);

  const filterOrders = () => {
    if (orderStatus === "All") {
      setFilteredOrders(listOrder);
    } else {
      setFilteredOrders(
        listOrder.filter((order) => order.orderStatus === orderStatus)
      );
    }
  };

  const toggleDetail = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  function formatDateTime(datetime) {
    const date = new Date(datetime);
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
  
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
  
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  
    return `${formattedTime} - ${formattedDate}`;
  }
  const xuatFile = async(orderId) => {
      const body = {
        "orderId": orderId,
        "billDate": "2024-08-18T17:02:52.368Z",
        "taxIn": 0,
        "address": ""
      }
     const response =  await createBill(body);
     const responseexport = await exportBill(response.result)
     await downloadTxtFile(responseexport)
     
  }
  const handleCancel = async (orderID) => {
    try {
      const data = {
        orderID: orderID,
        orderStatus: "CANCEL",
      };
      const res = await CancelOrder(data);
      console.log(res);
      fetchData();
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <div className="p-6 bg-background">
      <h2 className="text-2xl font-semibold mb-4">Order List</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className="bg-secondary text-secondary-foreground p-2 rounded active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => setOrderStatus("All")}
        >
          All ({listOrder.length})
        </button>
        <button
          className="bg-muted text-muted-foreground p-2 rounded active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          onClick={() => setOrderStatus("PENDING")}
        >
          Pending
        </button>
        <button
          className="bg-muted text-muted-foreground p-2 rounded active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          onClick={() => setOrderStatus("APPROVED")}
        >
          Approved
        </button>
        <button
          className="bg-muted text-muted-foreground p-2 rounded active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          onClick={() => setOrderStatus("DONE")}
        >
          Done
        </button>
        <button
          className="bg-muted text-muted-foreground p-2 rounded active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          onClick={() => setOrderStatus("CANCEL")}
        >
          Cancel
        </button>
      </div>

      {filteredOrders.map((order) => (
        <Collapsible key={order.orderID} open={openOrderId === order.orderID}>
          <div className="border-b border-border pb-4 mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium">
                  Order ID: {order.orderID}
                </h3>
                <h3 className="text-lg font-medium">
                  Created At: {formatDateTime(order.orderDate)}
                </h3>
                <h3 className="text-lg font-medium">
                  Created By: {order.orderAddress}
                </h3>
              </div>
              <div
                className={`text-lg font-medium ${
                  order.orderStatus === "CANCEL"
                    ? "text-red-500"
                    : order.orderStatus === "PENDING" ||
                      order.orderStatus === "APPROVE"
                    ? "text-green-500"
                    : ""
                }`}
              >
                Order Status: {order.orderStatus}
              </div>
            </div>
            <div className="flex justify-between">
              <CollapsibleTrigger asChild>
                <button
                  className="bg-blue-500 text-primary-foreground p-2 rounded text-center"
                  onClick={() => toggleDetail(order.orderID)}
                >
                  Detail
                </button>
                
              </CollapsibleTrigger>
              <CollapsibleTrigger asChild>
                <button
                  className="bg-blue-500 text-primary-foreground p-2 rounded text-center"
                  onClick={() => xuatFile(order.orderID)}
                >
                  Xuất file
                </button>
                
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent asChild>
              <div>
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.imageLink}
                        alt={item.productName}
                        className="mr-4"
                        style={{ width: 100, height: 100 }}
                      />
                      <div>
                        <h4 className="font-semibold">{item.productName}</h4>
                        <p>{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4">
                        {item.quantity} × {item.price.toLocaleString()} VND
                      </span>
                      <span className="font-semibold">
                        {(item.quantity * item.price).toLocaleString()} VND
                      </span>
                    </div>
                  </div>
                ))}
                {order.orderStatus === "PENDING" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="bg-red-500 text-primary-foreground p-2 rounded text-center">
                        Cancel order
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Cancellation
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this order? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-blue-500"
                          onClick={() => handleCancel(order.orderID)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
}
