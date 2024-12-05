import React from "react";
import "./Layout.css/";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">OZ무비</div>
      <div className="navbar-button">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
};

export default Navbar;
