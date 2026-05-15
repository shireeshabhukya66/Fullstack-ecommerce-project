import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import EditProduct from "./EditProduct.jsx";
import About from "./About.jsx";
import Navbar from "./Navbar.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
