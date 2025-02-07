import axios from "axios";
import React, { useEffect, useState } from "react";

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

    const reverseData = response.data.orders.reverse();
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
      {orderData?.map((singleCartObject, index) => {
        return (
          <div key={index}>
            <CartCard
              title={singleCartObject.orderItems.title}
              images={singleCartObject.orderItems.images[0]}
              //   Index={index}
              description={singleCartObject.orderItems.description}
              originalPrice={singleCartObject.orderItems.originalPrice}
              discountedPrice={singleCartObject.orderItems.discountedPrice}
              id={singleCartObject._id}
              orderStatus={singleCartObject.orderStatus}
              createdBy={"jeev@hd.com"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistoryPage;
