import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translate";
import "./StoreLocator.css";

const StoreLocator = () => {
  const [plant, setPlant] = useState("");
  const [location, setLocation] = useState("");
  const [mapSrc, setMapSrc] = useState("");
  const [searched, setSearched] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [error, setError] = useState("");
  const [plants, setPlants] = useState([]); // from MongoDB
  const [filtered, setFiltered] = useState([]); // dropdown suggestions
  const [showDropdown, setShowDropdown] = useState(false);

  const { language } = useLanguage();
  const txt = t[language];

  // Auto-detect GPS on load
  useEffect(() => {
    detectLocation();
    fetchPlants();
  }, []);

  // Fetch plant names from MongoDB
  const fetchPlants = async () => {
    try {
      const res = await fetch("http://localhost:8080/listings");
      const data = await res.json();
      // extract plant names — adjust field name if yours is different
      const names = data.map((p) => p.plantName || p.name).filter(Boolean);
      setPlants(names);
    } catch (err) {
      console.error("Could not load plants from DB");
    }
  };

  // Filter dropdown as user types
  const handlePlantInput = (val) => {
    setPlant(val);
    if (val.trim().length > 0) {
      const matches = plants.filter((p) =>
        p.toLowerCase().includes(val.toLowerCase()),
      );
      setFiltered(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setFiltered([]);
      setShowDropdown(false);
    }
  };

  const selectPlant = (name) => {
    setPlant(name);
    setShowDropdown(false);
  };

  // GPS detection
  const detectLocation = () => {
    setDetecting(true);
    setError("");
    if (!navigator.geolocation) {
      setError(txt.geoNotSupported);
      setDetecting(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "your location";
          setLocation(city);
          setLocationDetected(true);
        } catch {
          setLocation("current location");
          setLocationDetected(true);
        }
        setDetecting(false);
      },
      () => {
        setError(txt.locationDetectionFailed);
        setDetecting(false);
      },
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError(txt.locationRequired);
      return;
    }
    if (!plant.trim()) {
      setError(txt.plantRequired);
      return;
    }
    setError("");
    const query = `${plant} Ayurvedic store near ${location}`;
    const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&z=13`;
    setMapSrc(src);
    setSearched(true);
  };

  const handleReset = () => {
    setPlant("");
    setMapSrc("");
    setSearched(false);
    setError("");
    setShowDropdown(false);
  };

  const openInGoogleMaps = () => {
    const query = `${plant} Ayurvedic store near ${location}`;
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(query)}`,
      "_blank",
    );
  };

  return (
    <div className="store-locator-page">
      {/* Hero */}
      <div className="store-hero">
        <div className="store-hero-content">
          <span className="store-hero-badge">🗺️ {txt.storeLocator}</span>
          <h1 className="store-hero-title">{txt.storeTitle}</h1>
          <p className="store-hero-subtitle">{txt.storeSubtitle}</p>
        </div>
        <div className="store-hero-leaves">
          <span className="leaf leaf-1">🍃</span>
          <span className="leaf leaf-2">🌱</span>
          <span className="leaf leaf-3">🍃</span>
        </div>
      </div>

      <div className="store-main">
        {/* Search Card */}
        <div className="search-card">
          <h2 className="search-card-title">🌿 {txt.searchStores}</h2>

          {/* Location Status */}
          <div
            className={`location-status ${locationDetected ? "detected" : ""}`}
          >
            <span>📍</span>
            {detecting ? (
              <span className="detecting-text">
                <span className="spinner-small"></span> {txt.detectingLocation}
              </span>
            ) : locationDetected ? (
              <span className="detected-text">
                {txt.locationDetected} <strong>{location}</strong>
                <button className="redetect-btn" onClick={detectLocation}>
                  ↺ {txt.redetect}
                </button>
              </span>
            ) : (
              <span>
                {txt.locationNotDetected}{" "}
                <button className="redetect-btn" onClick={detectLocation}>
                  {txt.tryAgain}
                </button>
              </span>
            )}
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            {/* Plant Input with dropdown */}
            <div className="search-input-group">
              <label className="search-label">🌿 {txt.plantHerbName}</label>
              <div className="plant-input-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder={txt.plantPlaceholder}
                  value={plant}
                  onChange={(e) => handlePlantInput(e.target.value)}
                  onFocus={() => plant && setShowDropdown(filtered.length > 0)}
                  autoComplete="off"
                />
                {showDropdown && (
                  <ul className="plant-dropdown">
                    {filtered.map((name, i) => (
                      <li
                        key={i}
                        className="plant-dropdown-item"
                        onClick={() => selectPlant(name)}
                      >
                        🌿 {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Location Input */}
            <div className="search-input-group">
              <label className="search-label">📍 {txt.yourLocation}</label>
              <div className="location-input-row">
                <input
                  type="text"
                  className="search-input"
                  placeholder={txt.locationPlaceholder}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocationDetected(false);
                  }}
                />
                <button
                  type="button"
                  className="gps-btn"
                  onClick={detectLocation}
                  title="Use my current location"
                >
                  {detecting ? <span className="spinner-small"></span> : "📡"}
                </button>
              </div>
            </div>

            {error && <p className="search-error">⚠️ {error}</p>}

            <div className="search-btn-row">
              <button type="submit" className="search-btn">
                🔍 {txt.findStores}
              </button>
              {searched && (
                <button
                  type="button"
                  className="reset-btn"
                  onClick={handleReset}
                >
                  ↺ {txt.reset}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Map Section */}
        {searched && mapSrc && (
          <div className="map-section">
            <div className="map-header">
              <div>
                <h3 className="map-title">
                  Stores selling "{plant}" near {location}
                </h3>
                <p className="map-subtitle">{txt.googleMapsPowered}</p>
              </div>
              <button className="open-maps-btn" onClick={openInGoogleMaps}>
                🗺️ {txt.openGoogleMaps}
              </button>
            </div>

            <div className="map-container">
              <iframe
                title="Store Locator Map"
                src={mapSrc}
                width="100%"
                height="480"
                style={{ border: 0, borderRadius: "16px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="quick-card" onClick={openInGoogleMaps}>
                <span className="quick-icon">🏪</span>
                <div>
                  <p className="quick-title">{txt.allStores}</p>
                  <p className="quick-desc">{txt.allStoresDesc}</p>
                </div>
                <span className="quick-arrow">→</span>
              </div>
              <div
                className="quick-card"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/${encodeURIComponent(`Ayurvedic doctor near ${location}`)}`,
                    "_blank",
                  );
                }}
              >
                <span className="quick-icon">👨‍⚕️</span>
                <div>
                  <p className="quick-title">{txt.ayurvedicDoctors}</p>
                  <p className="quick-desc">{txt.nearbyPractitioners}</p>
                </div>
                <span className="quick-arrow">→</span>
              </div>
              <div
                className="quick-card"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/${encodeURIComponent(`Ayurvedic clinic near ${location}`)}`,
                    "_blank",
                  );
                }}
              >
                <span className="quick-icon">🏥</span>
                <div>
                  <p className="quick-title">{txt.ayurvedicClinics}</p>
                  <p className="quick-desc">{txt.treatmentCenters}</p>
                </div>
                <span className="quick-arrow">→</span>
              </div>
            </div>
          </div>
        )}

        {/* Popular Plants - shown before search */}
        {!searched && (
          <div className="popular-section">
            <h3 className="popular-title">🌿 {txt.popularPlants}</h3>
            <div className="popular-tags">
              {plants.length > 0
                ? plants.slice(0, 8).map((p, i) => (
                    <button
                      key={i}
                      className="popular-tag"
                      onClick={() => setPlant(p)}
                    >
                      {p}
                    </button>
                  ))
                : [
                    "Ashwagandha",
                    "Tulsi",
                    "Neem",
                    "Triphala",
                    "Brahmi",
                    "Shatavari",
                    "Giloy",
                    "Amla",
                  ].map((p, i) => (
                    <button
                      key={i}
                      className="popular-tag"
                      onClick={() => setPlant(p)}
                    >
                      {p}
                    </button>
                  ))}
            </div>

            <div className="info-cards">
              <div className="info-card">
                <span className="info-icon">📍</span>
                <h4>{txt.autoLocation}</h4>
                <p>{txt.autoLocationDesc}</p>
              </div>
              <div className="info-card">
                <span className="info-icon">🌿</span>
                <h4>{txt.plantSearch}</h4>
                <p>{txt.plantSearchDesc}</p>
              </div>
              <div className="info-card">
                <span className="info-icon">🗺️</span>
                <h4>{txt.liveMap}</h4>
                <p>{txt.liveMapDesc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreLocator;
