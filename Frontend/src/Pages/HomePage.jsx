import { useState } from "react";
import Card from "../Components/ProductCard/Card.jsx";
import { Link } from "react-router-dom";

function HomePage() {
  const [data, setdata] = useState(
    new Array(2).fill({ title: "Product Title" })
  );

  console.log(data);

  return (
    <div>
      <h1 className="text-center">'Home Page fror Follow along'</h1>

      <div className="grid grid-cols-3">
        {data.map((ele, index) => {
          return (
            <div style={{ margin: "auto" }} className="border border-white">
              <Card title={ele.title} Index={index} />
            </div>
          );
        })}
      </div>

      <div>
        <Link to={"/login"} className="text-blue-500">
          login
        </Link> 
        { " " }
        <Link to={"/signup"} className="text-blue-500">
          signup
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
