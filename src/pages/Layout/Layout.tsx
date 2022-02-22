import React from "react";
import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";
import Header from "src/pages/Header";
import Footer from "src/pages/Footer";

const Layout: React.VFC = () => {
  return (
    <>
      <Header />
      <div className={css.wrapper}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
