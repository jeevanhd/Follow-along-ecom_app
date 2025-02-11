import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartCard from "../Components/ProductCard/CartCard";

const CartPage = () => {
  const [UsersCartData, setUsersCartData] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      const token = localStorage.getItem("token"); 
      console.log("Token retrieved:", token);


      if (!token) {
        return alert("Token is missing");
      }

      const response = await axios.get(
        `http://localhost:8080/cart/get-cart-data?token=${token}`
      );
      console.log(response);
      setUsersCartData(response.data.cartData);
    };

    getCartData();
  }, []);

  return (
    <div>
      {UsersCartData.length > 0 ? (
        <>
          <Link to={`/select-address`}>
            <button className="bg-slate-800 text-white px-5 py-2 rounded-md ml-40">
              Checkout
            </button>
          </Link>
          {UsersCartData?.map((data, index) => {
            return (
              <div key={index}>
                <CartCard
                  title={data.productId.title}
                  images={data.productId.images[0]}
                  //   Index={index}
                  description={data.productId.description}
                  originalPrice={data.productId.originalPrice}
                  discountedPrice={data.productId.discountedPrice}
                  id={data.productId._id}
                  createdBy={"jeev@hd.com"}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex justify-center max-h-[100vh] items-center">
          <h1>Cart is empty</h1>
        </div>
      )}
    </div>
  );
};

export default CartPage;
