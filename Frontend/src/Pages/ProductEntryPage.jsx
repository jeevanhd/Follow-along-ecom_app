import axios from "axios";
import { useState } from "react";

function ProductEntryPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: 0,
    discountedPrice: 0,
    originalPrice: 0,
    quantity: 0,
    category: "",
  });
  const [errorInput, setInputError] = useState("");
  const [images, setImages] = useState(null);

  const handelImageUpload = (e) => {
    const imageArray = Array.from(e.target.files);
    setImages(imageArray);
  };

  const HandelChange = (e) => {
    setInputError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      rating,
      discountedPrice,
      originalPrice,
      quantity,
      category,
    } = formData;

    if (
      title.length <= 0 ||
      description.length <= 0 ||
      discountedPrice <= 0 ||
      originalPrice <= 0 ||
      quantity <= 0 ||
      category.length <= 0
    ) {
      return setInputError("Enter the correct values");
    }

    let formDataBody = new FormData();
    formDataBody.append("title", title);
    formDataBody.append("description", description);
    formDataBody.append("rating", rating);
    formDataBody.append("discountedPrice", discountedPrice);
    formDataBody.append("originalPrice", originalPrice);
    formDataBody.append("quantity", quantity);
    formDataBody.append("rating", rating);
    formDataBody.append("token", localStorage.getItem("token"));

    images.map((ele) => {
      formDataBody.append("filepath", ele);
    });

    const token = localStorage.getItem("token");
    let requestData = axios
      .post(
        `http://localhost:8080/product/create-product?=${token}`,
        formDataBody,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="flex justify-center items-center border border-black"
      style={{ height: "100vh" }}
    >
      <form onSubmit={HandelSubmit}>
        <div>
          <label htmlFor="">Enter Title</label>
          <br />
          <input
            type="text"
            onChange={HandelChange}
            value={formData.title}
            name="title"
            placeholder="Enter product title"
          />
        </div>

        <div>
          <label htmlFor="">Enter Description</label>
          <br />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={HandelChange}
            placeholder="Enter product description"
          />
        </div>
        <div>
          <label htmlFor="">Discount Price</label>
          <br />
          <input
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={HandelChange}
            placeholder="Discounted price"
          />
        </div>

        <div>
          <label htmlFor="">Original Price</label>
          <br />
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={HandelChange}
            placeholder="Original price"
          />
        </div>
        <div>
          <label htmlFor="">Stock Quantity</label>
          <br />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={HandelChange}
            placeholder="Enter Stock quantity"
          />
        </div>
        <div>
          <label htmlFor="">Product Image</label>
          <br />
          <input type="file" multiple onChange={handelImageUpload} />
        </div>

        <div>
          <label htmlFor="">Enter Category</label>
          <br />
          <input
            type="text"
            onChange={HandelChange}
            name="category"
            value={formData.category}
            placeholder="Enter Category"
          />
        </div>

        <div>
          <label htmlFor="">Enter Rating of product</label>
          <br />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={HandelChange}
            placeholder="Enter Rating of product"
            className="border border-black"
          />
        </div>

        {errorInput && <p>{errorInput}</p>}
        <button type="submit" className="bg-blue-400 text-white px-5 py-1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductEntryPage;
