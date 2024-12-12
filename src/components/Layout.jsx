import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar.jsx"; // 수정된 부분
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <NavBar /> {/* 수정된 부분 */}
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
