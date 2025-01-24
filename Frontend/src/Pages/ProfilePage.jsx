import React from "react";
import AddressCard from "../Components/Profile/AddressCard.jsx"; // Import AddressCard

const ProfilePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <AddressCard /> {/* Include AddressCard component */}
    </div>
  );
};

export default ProfilePage;
