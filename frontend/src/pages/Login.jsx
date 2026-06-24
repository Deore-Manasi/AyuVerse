// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useLanguage } from "../context/LanguageContext";
// import { t } from "../utils/translate";

// import "./Login.css";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const { language } = useLanguage();
//   const txt = t[language];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = txt.emailRequired;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = txt.emailInvalid;
//     }

//     if (!formData.password) {
//       newErrors.password = txt.passwordRequired;
//     } else if (formData.password.length < 6) {
//       newErrors.password = txt.passwordMinLength;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       // Store user session (in real app, this would be handled by backend)
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("userEmail", formData.email);
//       setIsLoading(false);
//       navigate("/");
//     }, 1000);
//   };

//   return (
//     <div className="login-page">
//       <motion.div
//         className="login-container"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="login-header">
//           <h1>{txt.welcomeBack}</h1>
//           <p>{txt.loginSubtitle}</p>
//         </div>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">{txt.emailAddress}</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={errors.email ? "error" : ""}
//               placeholder={txt.emailPlaceholder}
//             />
//             {errors.email && (
//               <span className="error-message">{errors.email}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">{txt.password}</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={errors.password ? "error" : ""}
//               placeholder={txt.loginPasswordPlaceholder}
//             />
//             {errors.password && (
//               <span className="error-message">{errors.password}</span>
//             )}
//           </div>

//           <div className="form-options">
//             <label className="remember-me">
//               <input type="checkbox" />
//               <span>{txt.rememberMe}</span>
//             </label>
//             <Link to="/forgot-password" className="forgot-password">
//               {txt.forgotPassword}
//             </Link>
//           </div>

//           <button type="submit" className="submit-button" disabled={isLoading}>
//             {isLoading ? txt.signingIn : txt.signIn}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p>
//             {txt.noAccount}{" "}
//             <Link to="/register" className="link-text">
//               {txt.signUpHere}
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translate";
import { useAuth } from "../context/AuthContext"; // ✅ NEW
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "", // ✅ supports both username and email
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(""); // ✅ NEW

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // ✅ NEW

  const { language } = useLanguage();
  const txt = t[language];

  // Redirect to where they were trying to go, or home
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Email or username is required.";
    }

    if (!formData.password) {
      newErrors.password = txt.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = txt.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ UPDATED handleSubmit — replaces the fake setTimeout
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError("");

    try {
      await login(formData.usernameOrEmail, formData.password);
      navigate(from, { replace: true }); // go back to where they came from
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
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

        {/* ✅ Server error banner */}
        {serverError && (
          <div className="server-error-banner">{serverError}</div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Email or Username</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className={errors.usernameOrEmail ? "error" : ""}
              placeholder="Enter email or username"
            />
            {errors.usernameOrEmail && (
              <span className="error-message">{errors.usernameOrEmail}</span>
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
