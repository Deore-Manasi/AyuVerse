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
              <Route path="/explore-plants" element={<ExplorePlants />} />
              <Route path="/plant/:name" element={<PlantDetail />} />
              <Route path="/herbal-chatbot" element={<HerbalChatbot />} />
              <Route path="/3d-visualizer" element={<Visualizer3D />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/vata" element={<VataZone />} />
              <Route path="/pitta" element={<PittaZone />} />
              <Route path="/kapha" element={<KaphaZone />} />
              <Route path="/store-locator" element={<StoreLocator />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              {/* ── Protected Routes ── */}
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
