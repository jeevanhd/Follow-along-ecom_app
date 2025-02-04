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
    formDataBody.append("category", category);
    formDataBody.append("token", localStorage.getItem("token"));

    images?.map((ele) => {
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
    <div className="flex justify-center items-center  bg-gray-100">
      <form
        onSubmit={HandelSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Title
          </label>
          <input
            type="text"
            onChange={HandelChange}
            value={formData.title}
            name="title"
            placeholder="Enter product title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={HandelChange}
            placeholder="Enter product description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Discount Price
          </label>
          <input
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={HandelChange}
            placeholder="Discounted price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Original Price
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={HandelChange}
            placeholder="Original price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={HandelChange}
            placeholder="Enter Stock quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            multiple
            onChange={handelImageUpload}
            className="block w-full text-sm text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Category
          </label>
          <input
            type="text"
            onChange={HandelChange}
            name="category"
            value={formData.category}
            placeholder="Enter Category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Rating of product
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={HandelChange}
            placeholder="Enter Rating of product"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errorInput && <p className="text-red-500">{errorInput}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductEntryPage;
