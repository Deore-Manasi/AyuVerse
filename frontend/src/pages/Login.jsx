import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translate";

import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { language } = useLanguage();
  const txt = t[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = txt.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = txt.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = txt.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = txt.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Store user session (in real app, this would be handled by backend)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h1>{txt.welcomeBack}</h1>
          <p>{txt.loginSubtitle}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{txt.emailAddress}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder={txt.emailPlaceholder}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">{txt.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder={txt.loginPasswordPlaceholder}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>{txt.rememberMe}</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              {txt.forgotPassword}
            </Link>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? txt.signingIn : txt.signIn}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {txt.noAccount}{" "}
            <Link to="/register" className="link-text">
              {txt.signUpHere}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
