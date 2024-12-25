import { useState } from "react";
import Card from "../component/ProductCard/Card";

function HomePage() {
  const [data, setdata] = useState(
    new Array(20).fill({ title: "Product Title" })
  );

  return (
    <>
      <h1 className="text-center">'Home Page fro Follow along';</h1>

      <div className=" grid-cols-3">
        {data.map((ele, index) => {
          return (
            <div style={{ margin: "auto" }}>
              <Card title={ele.title} Index={index} />;
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
