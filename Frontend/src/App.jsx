import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import CartPage from "./Pages/CartPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import ProductEntryPage from "./Pages/ProductEntryPage.jsx";
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
        <Route path="/product-details/:id" element={<SinglePageProduct />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
