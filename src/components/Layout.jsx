import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx"; // Navbar.jsx로 수정 (파일 이름과 정확히 일치)
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar /> {/* 컴포넌트 사용시에도 Navbar로 수정 */}
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
