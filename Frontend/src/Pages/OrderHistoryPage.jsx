import axios from "axios";
import React, { useEffect, useState } from "react";
import CartCard from "../Components/ProductCard/CartCard";

const OrderHistoryPage = () => {
  const [orderData, setOrderData] = useState([]);

  const fetchOrderProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
    }

    const response = await axios.get(
      `http://localhost:8080/orders/user-orders-data?token=${token}`
    );

    const reverseData = response.data.orders?.reverse();
    setOrderData(reverseData);
    console.log(response.data.orders);
  };

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  const handelCancelOrder = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
    }

    await axios.patch(
      `http://localhost:8080/orders/cancel-order?token=${token}&orderId=${id}`
    );
    fetchOrderProducts();
  };

  return (
    <div>
      {orderData?.map((data, index) => {
        return (
          <div key={index}>
            <CartCard
              title={data.orderItems.title}
              images={data.orderItems.images[0]}
              //   Index={index}
              description={data.orderItems.description}
              originalPrice={data.orderItems.originalPrice}
              discountedPrice={data.orderItems.discountedPrice}
              id={data._id}
              orderStatus={data.orderStatus}
              createdBy={"jeev@hd.com"}
              handelCancelOrder={handelCancelOrder}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistoryPage;
