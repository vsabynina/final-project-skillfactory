import React from "react";
import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
  // const { setToken } = props;
  return (
    <>
      {/*<Header setToken={setToken} />*/}
      <Header />
      <div className={css.wrapper}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
