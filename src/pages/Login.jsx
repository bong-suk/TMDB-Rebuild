import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../contexts/useSupabaseAuth";
import { useUser } from "../contexts/UserContext";
import { validateEmail, validatePassword } from "../utils/validation";
import "./Login.css";
import SocialLogin from "../components/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result?.user) {
      setUser(result.user);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">로그인</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="이메일"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}

          <input
            type="password"
            className="login-input"
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="login-options">
          <a href="/signup" className="login-option-link">
            사이트가 처음이신가요? 회원가입
          </a>
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
