import React from "react";
import {Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import ProductListing from "./pages/ProductLisiting";
import ProductDetail from "./pages/ProductDetail";
import OrdersPage from "./pages/OrdersPage";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import CreateProduct from "./pages/CreateProduct";
import ProductsPage from "./pages/ProductsPage";
import UpdateProductPage from "./pages/UpdateProduct";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products/:categoryId" element={<ProductListing />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
        <Route path="/create-product/:categoryId" element={<CreateProduct />} />
        <Route path="/edit-product/:categoryId" element={<ProductsPage />} />
        <Route path="/update-product/:productId" element={<UpdateProductPage/>} />
      </Routes>
    </>
  );
};

export default App;