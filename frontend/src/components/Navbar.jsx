// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLanguage } from "../context/LanguageContext";
// import { t } from "../utils/translate";
// import "./Navbar.css";
// import logo from "../assets/LOGO1.png"; // Import logo

// const Navbar = ({ theme, toggleTheme }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   //---- for the languge context ----
//   const { language, setLanguage } = useLanguage();
//   const txt = t[language];

//   // ----- State & refs -----
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   // ----- Check auth on location change -----
//   useEffect(() => {
//     const authStatus = localStorage.getItem("isAuthenticated");
//     const name =
//       localStorage.getItem("userName") || localStorage.getItem("userEmail");
//     setIsAuthenticated(authStatus === "true");
//     setUserName(name || "");
//   }, [location]);

//   // ----- Close dropdown on outside click -----
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // ----- Logout handler -----
//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     setIsAuthenticated(false);
//     setUserName("");
//     setShowDropdown(false);
//     navigate("/");
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* --- LOGO + TITLE SECTION --- */}
//         <Link to="/" className="navbar-logo">
//           <motion.img
//             src={logo}
//             alt="AyurVerse Logo"
//             className="logo-image"
//             whileHover={{ scale: 1.1 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           />
//           <div className="logo-text-container">
//             <span className="logo-text">आयुVerse</span>
//             <span className="logo-subtitle">{txt.tagline}</span>
//           </div>
//         </Link>

//         {/* --- MENU LINKS --- */}
//         <ul className="navbar-menu">
//           <li>
//             <Link
//               to="/"
//               className={`navbar-link ${isActive("/") ? "active" : ""}`}
//             >
//               {txt.home}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/explore-plants"
//               className={`navbar-link ${
//                 isActive("/explore-plants") ? "active" : ""
//               }`}
//             >
//               {txt.explorePlants}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/herbal-chatbot"
//               className={`navbar-link ${
//                 isActive("/herbal-chatbot") ? "active" : ""
//               }`}
//             >
//               {txt.herbalChatbot}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/diet-chart"
//               className={`navbar-link ${
//                 isActive("/diet-chart") ? "active" : ""
//               }`}
//             >
//               {txt.dietChart}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/virtual-tour"
//               className={`navbar-link ${
//                 isActive("/virtual-tour") ? "active" : ""
//               }`}
//             >
//               {txt.virtualTour}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/store-locator"
//               className={`navbar-link ${
//                 isActive("/store-locator") ? "active" : ""
//               }`}
//             >
//               {txt.storeLocator}
//             </Link>
//           </li>
//         </ul>

//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           style={{
//             padding: "8px 12px",
//             borderRadius: "20px",
//             border: "1.5px solid #d0e8d8",
//             background: "#f8fdf9",
//             color: "#2d6a4f",
//             fontWeight: "600",
//             fontSize: "0.85rem",
//             cursor: "pointer",
//             outline: "none",
//           }}
//         >
//           <option value="English">🇬🇧 ENGLISH</option>
//           <option value="Hindi">🇮🇳 HINDI</option>
//           <option value="Marathi">🇮🇳 MARATHI</option>
//         </select>

//         {/* --- THEME + PROFILE BUTTONS --- */}
//         <div className="navbar-controls">
//           <button
//             className="theme-toggle"
//             onClick={toggleTheme}
//             aria-label="Toggle theme"
//           >
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>

//           <div className="profile-container" ref={dropdownRef}>
//             <button
//               className="profile-icon"
//               onClick={() => setShowDropdown(!showDropdown)}
//               aria-label="Profile"
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//             </button>

//             <AnimatePresence>
//               {showDropdown && (
//                 <motion.div
//                   className="profile-dropdown"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {isAuthenticated ? (
//                     <>
//                       <div className="dropdown-header">
//                         <div className="user-info">
//                           <div className="user-avatar">
//                             {userName ? userName.charAt(0).toUpperCase() : "U"}
//                           </div>
//                           <div className="user-details">
//                             <div className="user-name">
//                               {userName || "User"}
//                             </div>
//                             <div className="user-email">
//                               {localStorage.getItem("userEmail") || ""}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="dropdown-divider"></div>
//                       <Link
//                         to="/profile"
//                         className="dropdown-item"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <svg
//                           width="18"
//                           height="18"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                         >
//                           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                           <circle cx="12" cy="7" r="4"></circle>
//                         </svg>
//                         <span>{txt.myProfile}</span>
//                       </Link>
//                       <Link
//                         to="/settings"
//                         className="dropdown-item"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <svg
//                           width="18"
//                           height="18"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                         >
//                           <circle cx="12" cy="12" r="3"></circle>
//                           <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
//                         </svg>
//                         <span>{txt.settings}</span>
//                       </Link>
//                       <div className="dropdown-divider"></div>
//                       <button
//                         className="dropdown-item logout"
//                         onClick={handleLogout}
//                       >
//                         <svg
//                           width="18"
//                           height="18"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                         >
//                           <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                           <polyline points="16 17 21 12 16 7"></polyline>
//                           <line x1="21" y1="12" x2="9" y2="12"></line>
//                         </svg>
//                         <span>{txt.logout}</span>
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link
//                         to="/login"
//                         className="dropdown-item"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <svg
//                           width="18"
//                           height="18"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                         >
//                           <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
//                           <polyline points="10 17 15 12 10 7"></polyline>
//                           <line x1="15" y1="12" x2="3" y2="12"></line>
//                         </svg>
//                         <span>{txt.signIn}</span>
//                       </Link>
//                       <Link
//                         to="/register"
//                         className="dropdown-item"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <svg
//                           width="18"
//                           height="18"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                         >
//                           <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                           <circle cx="8.5" cy="7" r="4"></circle>
//                           <line x1="20" y1="8" x2="20" y2="14"></line>
//                           <line x1="23" y1="11" x2="17" y2="11"></line>
//                         </svg>
//                         <span>{txt.signUp}</span>
//                       </Link>
//                     </>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translate";
import { useAuth } from "../context/AuthContext"; // ✅ NEW
import "./Navbar.css";
import logo from "../assets/LOGO1.png";

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { language, setLanguage } = useLanguage();
  const txt = t[language];

  const { user, logout } = useAuth(); // ✅ NEW — replaces localStorage

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ REMOVED — no more localStorage useEffect needed

  // ----- Close dropdown on outside click -----
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ----- Logout handler -----
  const handleLogout = async () => {
    await logout(); // ✅ calls backend + clears cookie
    setShowDropdown(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* --- LOGO + TITLE SECTION --- */}
        <Link to="/" className="navbar-logo">
          <motion.img
            src={logo}
            alt="AyurVerse Logo"
            className="logo-image"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="logo-text-container">
            <span className="logo-text">आयुVerse</span>
            <span className="logo-subtitle">{txt.tagline}</span>
          </div>
        </Link>

        {/* --- MENU LINKS --- */}
        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              className={`navbar-link ${isActive("/") ? "active" : ""}`}
            >
              {txt.home}
            </Link>
          </li>
          <li>
            <Link
              to="/explore-plants"
              className={`navbar-link ${isActive("/explore-plants") ? "active" : ""}`}
            >
              {txt.explorePlants}
            </Link>
          </li>
          <li>
            <Link
              to="/herbal-chatbot"
              className={`navbar-link ${isActive("/herbal-chatbot") ? "active" : ""}`}
            >
              {txt.herbalChatbot}
            </Link>
          </li>
          <li>
            <Link
              to="/diet-chart"
              className={`navbar-link ${isActive("/diet-chart") ? "active" : ""}`}
            >
              {txt.dietChart}
            </Link>
          </li>
          <li>
            <Link
              to="/virtual-tour"
              className={`navbar-link ${isActive("/virtual-tour") ? "active" : ""}`}
            >
              {txt.virtualTour}
            </Link>
          </li>
          <li>
            <Link
              to="/store-locator"
              className={`navbar-link ${isActive("/store-locator") ? "active" : ""}`}
            >
              {txt.storeLocator}
            </Link>
          </li>
        </ul>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1.5px solid #d0e8d8",
            background: "#f8fdf9",
            color: "#2d6a4f",
            fontWeight: "600",
            fontSize: "0.85rem",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="English">🇬🇧 ENGLISH</option>
          <option value="Hindi">🇮🇳 HINDI</option>
          <option value="Marathi">🇮🇳 MARATHI</option>
        </select>

        {/* --- THEME + PROFILE BUTTONS --- */}
        <div className="navbar-controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className="profile-container" ref={dropdownRef}>
            <button
              className="profile-icon"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Profile"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  className="profile-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {user ? ( // ✅ uses user from useAuth() instead of isAuthenticated
                    <>
                      <div className="dropdown-header">
                        <div className="user-info">
                          <div className="user-avatar">
                            {user.username
                              ? user.username.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          <div className="user-details">
                            <div className="user-name">
                              {user.username || "User"}
                            </div>
                            <div className="user-email">{user.email || ""}</div>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>{txt.myProfile}</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
                        </svg>
                        <span>{txt.settings}</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item logout"
                        onClick={handleLogout}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>{txt.logout}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                          <polyline points="10 17 15 12 10 7"></polyline>
                          <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        <span>{txt.signIn}</span>
                      </Link>
                      <Link
                        to="/register"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                        <span>{txt.signUp}</span>
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
