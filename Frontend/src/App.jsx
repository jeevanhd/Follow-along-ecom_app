import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import AddressCard from "./Components/Profile/AddressCard.jsx";
import CartPage from "./Pages/CartPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
import OrdersConformation from "./Pages/OrdersConformationPage.jsx";
import ProductEntryPage from "./Pages/ProductEntryPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SelectAddressPage from "./Pages/SelectAddressPage.jsx";
import Signup from "./Pages/Signup.jsx";
import SinglePageProduct from "./Pages/SingleProductPage.jsx";
import UpdateForm from "./Pages/updateForm.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-entry-page" element={<ProductEntryPage />} />
        <Route path="/update-form/:id" element={<UpdateForm />} />
        <Route path="/product-details" element={<SinglePageProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-address" element={<AddressCard />} />
        <Route path="/select-address" element={<SelectAddressPage />} />
        <Route path="/order-confirmation" element={<OrdersConformation />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
