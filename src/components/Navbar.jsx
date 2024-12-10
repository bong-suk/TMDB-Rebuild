import React, { useEffect, useState } from "react";
import "./Navbar.css/";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "./useDebounce";

const Navbar = () => {
  const [value, setValue] = useState("");
  const debouncedSearchTerm = useDebounce(value, 500);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`/search?q=${debouncedSearchTerm}`);
      setValue("");
    }
  }, [debouncedSearchTerm, navigate]);

  return (
    <header>
      <nav className="navbar">
        <div
          className="navbar-logo"
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          OZ무비
        </div>
        <div className="nav-search-container">
          <input
            type="text"
            placeholder="찾고 싶은 영화를 검색."
            className="nav-search-input"
            value={value}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="navbar-button">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
