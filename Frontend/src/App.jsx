import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ProductEntryPage from "./Pages/ProductEntryPage";
import Signup from "./Pages/Signup";
import UpdateForm from "./Pages/updateFormPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-entry-page" element={<ProductEntryPage />} />
        <Route path="/update-product" element={<UpdateForm />} />
      </Routes>
    </>
  );
}

export default App;
