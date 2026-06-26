// import Forest from "../components/Forest";

// const VataZone = () => {
//   const plants = [{ position: [-4, 1.5, -3] }, { position: [3, 1.5, -2] }];

//   return (
//     <div style={{ height: "100vh" }}>
//       <Forest zoneColor="#a6e3e9" plants={plants} />
//     </div>
//   );
// };

// export default VataZone;

// import ForestScene from "../components/ForestScene";

// export default function PittaZone() {
//   return <ForestScene />;
// }

// import { useEffect, useState } from "react";
// import ForestScene from "../components/ForestScene";
// import PlantInfoCard from "../components/PlantInfoCard";

// export default function VataZone() {
//   const [plants, setPlants] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8080/listings/tour/vata")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched plants:", data); // Debugging
//         setPlants(data);
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   }, []);

//   return (
//     <div style={{ height: "100vh", position: "relative" }}>
//       {/* 🌳 Forest Scene handles its own Canvas */}
//       <ForestScene plants={plants} onPlantClick={setSelectedPlant} />

//       {/* 🌿 Floating UI Card OUTSIDE 3D Canvas */}
//       {selectedPlant && (
//         <PlantInfoCard
//           plant={selectedPlant}
//           onClose={() => setSelectedPlant(null)}
//         />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ForestScene from "../components/ForestScene";
import PlantInfoCard from "../components/PlantInfoCard";

export default function VataZone() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [fetchProgress, setFetchProgress] = useState(0); // ← ADD

  // ── Online/Offline detection ──────────────────────
  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      setFetchError(false);
    };
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // ── Fetch plants ──────────────────────────────────
  useEffect(() => {
    if (!navigator.onLine) {
      setFetchError(true);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch("http://localhost:8080/listings/tour/vata", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        clearTimeout(timeout);
        setPlants(data);
        setIsLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeout);
        // ✅ Ignore abort errors — caused by React StrictMode double-invoke
        if (err.name === "AbortError") return;
        console.error("Fetch error:", err);
        setFetchError(true);
        setIsLoading(false);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  // ── Simulate scene loading progress ──────────────
  useEffect(() => {
    if (isLoading || fetchError) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12;
      if (progress >= 100) {
        progress = 100;
        setSceneProgress(100);
        clearInterval(interval);
        setTimeout(() => setSceneReady(true), 400);
      } else {
        setSceneProgress(Math.round(progress));
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, fetchError]);

  // ── OFFLINE / ERROR STATE ─────────────────────────
  if (fetchError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "16px",
          background: "#0a1a0a",
        }}
      >
        <div style={{ fontSize: "56px" }}>🌿</div>
        <h3 style={{ color: "#fff", margin: 0, fontSize: "20px" }}>
          Vata Zone unavailable
        </h3>
        <p
          style={{
            color: "#888",
            textAlign: "center",
            maxWidth: "300px",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {isOnline
            ? "Couldn't connect to the server. It may be temporarily down."
            : "You're offline. Connect to the internet and try again."}
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => {
              setFetchError(false);
              setIsLoading(true);
              setSceneProgress(0);
              setSceneReady(false);
            }}
            style={{
              padding: "10px 28px",
              background: "#4a9e6b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Retry
          </button>
          <Link
            to="/virtual-tour"
            style={{
              padding: "10px 20px",
              border: "1px solid #444",
              borderRadius: "8px",
              color: "#aaa",
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Back to Tour
          </Link>
        </div>
      </div>
    );
  }

  // ── LOADING PROGRESS BAR STATE ────────────────────
  if (!sceneReady) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "24px",
          background: "#0a1a0a",
        }}
      >
        <div style={{ fontSize: "48px" }}>💨</div>
        <h3
          style={{
            color: "#7eba6a",
            margin: 0,
            fontSize: "22px",
            letterSpacing: "0.05em",
          }}
        >
          Vata Zone
        </h3>
        <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>
          {sceneProgress < 30
            ? "Fetching plant data..."
            : sceneProgress < 60
              ? "Loading forest environment..."
              : sceneProgress < 90
                ? "Placing 3D plants..."
                : "Almost ready..."}
        </p>

        {/* Game-style progress bar */}
        <div style={{ width: "320px" }}>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "#1a2e1a",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid #2a4a2a",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${sceneProgress}%`,
                background: "linear-gradient(90deg, #2d6a3f, #4a9e6b, #7eba6a)",
                borderRadius: "4px",
                transition: "width 0.2s ease",
                boxShadow: "0 0 8px rgba(74,158,107,0.6)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <span
              style={{
                color: "#4a9e6b",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              LOADING
            </span>
            <span
              style={{
                color: "#4a9e6b",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              {sceneProgress}%
            </span>
          </div>
        </div>

        {/* Tick marks like a game loading bar */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "28px",
                height: "4px",
                borderRadius: "2px",
                background:
                  sceneProgress >= (i + 1) * 12.5 ? "#4a9e6b" : "#1a2e1a",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── ACTUAL SCENE ──────────────────────────────────
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <ForestScene
        plants={plants}
        onPlantClick={setSelectedPlant}
        baseProgress={fetchProgress}
        zoneName="Vata Zone" // ← this line should exist
      />
      {selectedPlant && (
        <PlantInfoCard
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
}
