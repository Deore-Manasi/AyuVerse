import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import ExplorePlants from "./pages/ExplorePlants";
import PlantDetail from "./pages/PlantDetail";
import HerbalChatbot from "./pages/HerbalChatbot";
import VirtualTour from "./pages/VirtualTour";
import VataZone from "./pages/VataZone";
import PittaZone from "./pages/PittaZone";
import KaphaZone from "./pages/KaphaZone";
import Visualizer3D from "./pages/Visualizer3D";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DietChart from "./pages/DietChart";
import StoreLocator from "./pages/StoreLocator";
import ResetPassword from "./pages/ResetPassword";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import axios from "axios";

function App() {
  // Your original backend communication setup — untouched
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      console.log(response);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <LanguageProvider>
      {" "}
      {/* ✅ outermost */}
      <AuthProvider>
        {" "}
        {/* ✅ inside LanguageProvider */}
        <Router>
          <div className="App">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
              {/* ── Public Routes ── */}
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/explore-plants" element={<ExplorePlants />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              {/* ── Protected Routes ── */}
              <Route
                path="/plant/:name"
                element={
                  <ProtectedRoute>
                    <PlantDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/herbal-chatbot"
                element={
                  <ProtectedRoute>
                    <HerbalChatbot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/3d-visualizer"
                element={
                  <ProtectedRoute>
                    <Visualizer3D />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/virtual-tour"
                element={
                  <ProtectedRoute>
                    <VirtualTour />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vata"
                element={
                  <ProtectedRoute>
                    <VataZone />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pitta"
                element={
                  <ProtectedRoute>
                    <PittaZone />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kapha"
                element={
                  <ProtectedRoute>
                    <KaphaZone />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/store-locator"
                element={
                  <ProtectedRoute>
                    <StoreLocator />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/diet-chart"
                element={
                  <ProtectedRoute>
                    <DietChart />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
