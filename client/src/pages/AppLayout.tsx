import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Banner from "../components/Banner";

const AppLayout = () => {
  return (
    <Fragment>
      <Banner />
      <p>Navbar</p>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <p>Footer</p>
      <p>Cart Sidebar</p>
    </Fragment>
  );
};

export default AppLayout;
