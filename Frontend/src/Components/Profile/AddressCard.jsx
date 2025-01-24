import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressCard = () => {
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    add1: "",
    add2: "",
    zipCode: 0,
    addressType: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http:localhost:8080/user/add-address?token=${token}`,
        formData
      );
      console.log("Address submitted:", response.data);
    } catch (error) {
      console.error("Error submitting address:", error);
    }
    navigate("/profile");
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Address Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="add1"
          placeholder="Address Line 1"
          value={formData.add1}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="add2"
          placeholder="Address Line 2"
          value={formData.add2}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <select
          name="addressType"
          value={formData.addressType}
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
          required
        >
          <option value="">Select Address Type</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddressCard;
