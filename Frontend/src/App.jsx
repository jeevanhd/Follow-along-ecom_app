import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ProductEntryPage from "./Pages/ProductEntryPage";
import Signup from "./Pages/Signup";
import SinglePageProduct from "./Pages/SingleProductPage";
import UpdateForm from "./Pages/updateForm";

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
      </Routes>
    </>
  );
}

export default App;
