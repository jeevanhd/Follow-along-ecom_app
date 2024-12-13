import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import SignupForm from "./Components/signup";
function App() {
  return (
    <>
      {/* <Login /> */}
      {/* <SignupForm /> */}
      <Routes>
        <Route path="/" element={ <h1>hello</h1>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
