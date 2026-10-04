import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Fragment>
      <p>Banner</p>
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
