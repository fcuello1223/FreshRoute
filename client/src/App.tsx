import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import AppLayout from "./pages/AppLayout";
import Addresses from "./pages/Addresses";
import Checkout from "./pages/Checkout";
import FlashDeals from "./pages/FlashDeals";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";
import SearchResults from "./pages/SearchResults";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDeliveryPartners from "./pages/admin/AdminDeliveryPartners";
import DeliveryLogin from "./pages/delivery/DeliveryLogin";
import DeliveryLayout from "./pages/delivery/DeliveryLayout";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";

const App = () => {
  return (
    <Fragment>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1b3022",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
      <Routes>
        {/* Auth Pages - No Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        {/* Main Pages - With Navbar/Footer */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="deals" element={<FlashDeals />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>
        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="delivery-partners" element={<AdminDeliveryPartners />} />
        </Route>
        {/* Delivery Partner Pages */}
        <Route path="/delivery/login" element={<DeliveryLogin />} />
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
