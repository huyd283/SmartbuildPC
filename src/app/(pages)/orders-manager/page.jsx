"use client";
import { getListOrders } from "@/service/Api-service/apiOrders";
import { useEffect, useState } from "react";

export default function Widget() {
  const [listOrder, setListOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("All");

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
      setFilteredOrders(listOrder.filter(order => order.orderStatus === orderStatus));
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
          className="bg-muted text-muted-foreground p-2 rounded active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => setOrderStatus("PENDING")}
        >
          Pending
        </button>
        <button
          className="bg-muted text-muted-foreground p-2 rounded active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => setOrderStatus("APPROVED")}
        >
          Approved
        </button>
        <button
          className="bg-muted text-muted-foreground p-2 rounded active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => setOrderStatus("CANCEL")}
        >
          Cancel
        </button>
      </div>

      {filteredOrders.map((order) => (
        <div key={order.orderID} className="border-b border-border pb-4 mb-4">
          <h3 className="text-lg font-medium">Order ID: {order.orderID}</h3>
          {order.orderItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-4">
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
          <div className="text-right">
            <button className="bg-blue-500 text-primary-foreground p-2 rounded text-center">
              Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
