import React from "react";

import Register from "./login/Register";
import { Route, Routes } from "react-router-dom";
import DetailProduct from "./utils/detailsProducts/DetailProduct";
import Cart from "./cart/Cart";
import History from "./history/History";
import AdminOrders from "./admin/AdminOrders";
import Product from "./products/Product";
import Login from "./login/Login";
import AdminDashboard from "./admin/AdminDashboard";
import CreateProduct from "./createProduct/CreateProduct";
import Category from "./admin/categories/Categories";
import CategoryPage from "./utils/categories/CategoryPage";
import Profile from "./profile/Profile";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import AdminProductList from "./admin/adminProductList/AdminProductList";
import Checkout from "./checkout/Checkout";
import Success from "./success/Success";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
      <Route path="/history" element={<History />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/create-product" element={<CreateProduct />} />
      <Route path="/admin/category" element={<Category />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/admin/products" element={<AdminProductList />} />
      <Route path="/admin/edit-product/:id" element={<CreateProduct />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/Success" element={<Success />} />
    </Routes>
  );
}

export default Pages;
