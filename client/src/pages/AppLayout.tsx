import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <Fragment>
      <Banner />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <p>Cart Sidebar</p>
    </Fragment>
  );
};

export default AppLayout;
