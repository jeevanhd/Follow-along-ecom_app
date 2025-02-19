import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Components/ProductCard/Card.jsx";

function HomePage() {
  const [data, setData] = useState();
  const dataRedux = useSelector((state) => state.user);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/get-products`
      );

      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const callHandel = async () => {
      fetchProducts();
    };
    callHandel();
  }, []);

  const handelDelete = async (id) => {
    const data = await axios.delete(`http://localhost:8080/product/?id=${id}`);
    setData(data.data.data);
  };

  return (
    <div>
      <h1>Home Page</h1>

      <div className="grid grid-cols-3">
        {data?.map((ele, index) => {
          return (
            <div
              key={ele._id}
              style={{ margin: "auto" }}
              className="border border-white"
            >
              <Card
                title={ele.title}
                image={ele.images[0] ? ele.images[0] : "Product Image Missing"}
                Index={index}
                description={ele.description}
                originalPrice={ele.originalPrice}
                discountedPrice={ele.discountedPrice}
                rating={ele.rating}
                id={ele._id}
                handelDelete={handelDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
