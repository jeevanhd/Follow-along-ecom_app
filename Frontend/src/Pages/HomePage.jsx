import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/ProductCard/Card.jsx";

function HomePage() {
  const [data, setData] = useState();

  const fetchedProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/products/get-products"
    );
    setData(response.data.data);
  };

  useEffect(() => {
    const callHandel = async () => {
      fetchedProducts();
    };
    callHandel();
  }, []);

  console.log(data);

  const handelDelete = async (id) => {
    const data = await axios.delete(`http://localhost:8080/product/${id}`);
    setData(data.data.data);
  };

  return (
    <div>
      <div className="grid grid-cols-3">
        {data?.map((ele, index) => {
          return (
            <div
              key={index}
              style={{ margin: "auto" }}
              className="border border-white"
            >
              <Card
                title={ele.title}
                image={ele.image[0] ? ele.image[0] : "No image :/"}
                Index={index}
                description={ele.description}
                originalPrice={ele.originalPrice}
                discountedPrice={ele.discountPrice}
                rating={ele.rating}
                id={ele._id}
                handelDelete={handelDelete}
              />
            </div>
          );
        })}
      </div>

      <div>
        <Link to={"/login"} className="text-blue-500">
          login
        </Link>{" "}
        <Link to={"/signup"} className="text-blue-500">
          signup
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
