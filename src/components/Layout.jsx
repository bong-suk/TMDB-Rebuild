import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // 확장자 제거
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
