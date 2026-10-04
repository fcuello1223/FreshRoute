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
import Product from "./pages/Product";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";



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
          <Route path="products/:id" element={<Product />} />
          <Route path="deals" element={<FlashDeals />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
