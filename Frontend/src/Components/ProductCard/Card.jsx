import axios from "axios";
import { Link } from "react-router-dom";

function Card({
  title,
  image,
  Index,
  description,
  originalPrice,
  discountedPrice,
  rating,
  id,
  handelDelete,
}) {
  const handelAddToCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8080/cart/add-to-cart?token=${token}`,
        { productId: id, quantity: 1 }
      );
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-4 mb-4">
      <Link to={`/product-details/${id}`}>
        <img
          src={image}
          alt="Product"
          className="rounded-lg object-cover w-full h-48"
        />
      </Link>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">{"★".repeat(rating)}</span>
          <span className="text-gray-600 ml-2">({rating})</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold">₹{originalPrice}</span>
            <span className="text-gray-500 line-through ml-2">
              ₹{discountedPrice}
            </span>
          </div>
        </div>
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-lg transition-colors duration-200"
            onClick={handelAddToCart}
          >
            Add to cart
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-lg transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              handelDelete(id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
