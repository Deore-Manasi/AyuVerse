// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useLanguage } from "../context/LanguageContext";
// import { t } from "../utils/translate";
// import "./Register.css";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
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

//     if (!formData.name.trim()) {
//       newErrors.name = txt.nameRequired;
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = txt.nameMinLength;
//     }

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

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = txt.confirmPasswordRequired;
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = txt.passwordMismatch;
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
//       localStorage.setItem("userName", formData.name);
//       setIsLoading(false);
//       navigate("/");
//     }, 1000);
//   };

//   return (
//     <div className="register-page">
//       <motion.div
//         className="register-container"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="register-header">
//           <h1>{txt.createAccount}</h1>
//           <p>{txt.registerSubtitle}</p>
//         </div>

//         <form className="register-form" onSubmit={handleSubmit}>
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="name">{txt.fullName}</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={errors.name ? "error" : ""}
//                 placeholder={txt.fullNamePlaceholder}
//               />
//               {errors.name && (
//                 <span className="error-message">{errors.name}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">{txt.emailAddress}</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={errors.email ? "error" : ""}
//                 placeholder={txt.emailPlaceholder}
//               />
//               {errors.email && (
//                 <span className="error-message">{errors.email}</span>
//               )}
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="password">{txt.password}</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={errors.password ? "error" : ""}
//                 placeholder={txt.passwordPlaceholder}
//               />
//               {errors.password && (
//                 <span className="error-message">{errors.password}</span>
//               )}
//             </div>

//             <div className="form-group">
//               <label htmlFor="confirmPassword">{txt.confirmPassword}</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={errors.confirmPassword ? "error" : ""}
//                 placeholder={txt.confirmPasswordPlaceholder}
//               />
//               {errors.confirmPassword && (
//                 <span className="error-message">{errors.confirmPassword}</span>
//               )}
//             </div>
//           </div>
//           <div className="form-options">
//             <label className="terms-checkbox">
//               <input type="checkbox" required />
//               <span>
//                 {txt.agreeTerms}{" "}
//                 <Link to="/terms" className="terms-link">
//                   {txt.termsConditions}
//                 </Link>
//               </span>
//             </label>
//           </div>

//           <button type="submit" className="submit-button" disabled={isLoading}>
//             {isLoading ? txt.creatingAccount : txt.createAccount}
//           </button>
//         </form>

//         <div className="register-footer">
//           <p>
//             {txt.alreadyAccount}?{" "}
//             <Link to="/login" className="link-text">
//               {txt.signInHere}
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translate";
import { useAuth } from "../context/AuthContext"; // ✅ NEW
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // ✅ NEW — backend requires this
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(""); // ✅ NEW
  const navigate = useNavigate();
  const { register } = useAuth(); // ✅ NEW

  const { language } = useLanguage();
  const txt = t[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError(""); // ✅ clear server error on typing
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = txt.nameRequired;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = txt.nameMinLength;
    }

    if (!formData.email.trim()) {
      newErrors.email = txt.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = txt.emailInvalid;
    }

    // ✅ NEW — phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formData.password) {
      newErrors.password = txt.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = txt.confirmPasswordRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = txt.passwordMismatch;
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
      await register({
        username: formData.name, // backend field is "username"
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      navigate("/"); // redirect on success
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <motion.div
        className="register-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="register-header">
          <h1>{txt.createAccount}</h1>
          <p>{txt.registerSubtitle}</p>
        </div>

        {/* ✅ Server error banner */}
        {serverError && (
          <div className="server-error-banner">{serverError}</div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">{txt.fullName}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder={txt.fullNamePlaceholder}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

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
          </div>

          {/* ✅ NEW phone field */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
              placeholder="10-digit mobile number"
              maxLength={10}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">{txt.password}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder={txt.passwordPlaceholder}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{txt.confirmPassword}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
                placeholder={txt.confirmPasswordPlaceholder}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="form-options">
            <label className="terms-checkbox">
              <input type="checkbox" required />
              <span>
                {txt.agreeTerms}{" "}
                <Link to="/terms" className="terms-link">
                  {txt.termsConditions}
                </Link>
              </span>
            </label>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? txt.creatingAccount : txt.createAccount}
          </button>
        </form>

        <div className="register-footer">
          <p>
            {txt.alreadyAccount}?{" "}
            <Link to="/login" className="link-text">
              {txt.signInHere}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
