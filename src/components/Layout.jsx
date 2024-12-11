import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <NavBar />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
