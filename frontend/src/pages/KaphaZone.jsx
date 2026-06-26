// import Forest from "../components/Forest";

// const KaphaZone = () => {
//   const plants = [{ position: [-2, 1.5, -5] }, { position: [2, 1.5, -3] }];

//   return (
//     <div style={{ height: "100vh" }}>
//       <Forest zoneColor="#8ad3b8" plants={plants} />
//     </div>
//   );
// };

// export default KaphaZone;

// import { useEffect, useState } from "react";
// import ForestScene from "../components/ForestScene";
// import PlantInfoCard from "../components/PlantInfoCard";

// export default function KaphaZone() {
//   const [plants, setPlants] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8080/listings/tour/kapha")
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

export default function KaphaZone() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [fetchProgress, setFetchProgress] = useState(0);

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

  useEffect(() => {
    if (!navigator.onLine) {
      setFetchError(true);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch("http://localhost:8080/listings/tour/kapha", {
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
        if (err.name === "AbortError") return;
        setFetchError(true);
        setIsLoading(false);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (isLoading || fetchError) return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12;
      if (progress >= 100) {
        setSceneProgress(100);
        clearInterval(interval);
        setTimeout(() => setSceneReady(true), 400);
      } else {
        setSceneProgress(Math.round(progress));
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isLoading, fetchError]);

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
          background: "#0a0a1a",
        }}
      >
        <div style={{ fontSize: "56px" }}>🌊</div>
        <h3 style={{ color: "#fff", margin: 0 }}>Kapha Zone unavailable</h3>
        <p
          style={{
            color: "#888",
            textAlign: "center",
            maxWidth: "300px",
            fontSize: "14px",
          }}
        >
          {isOnline
            ? "Couldn't connect to the server."
            : "You're offline. Please reconnect."}
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
              background: "#4a7fa5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
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
          background: "#050a1a",
        }}
      >
        <div style={{ fontSize: "48px" }}>🌊</div>
        <h3
          style={{
            color: "#6aaed6",
            margin: 0,
            fontSize: "22px",
            letterSpacing: "0.05em",
          }}
        >
          Kapha Zone
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
        <div style={{ width: "320px" }}>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "#0a1a2e",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid #0a2a4a",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${sceneProgress}%`,
                background: "linear-gradient(90deg, #0a3a6b, #4a7fa5, #6aaed6)",
                borderRadius: "4px",
                transition: "width 0.2s ease",
                boxShadow: "0 0 8px rgba(74,127,165,0.6)",
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
                color: "#4a7fa5",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              LOADING
            </span>
            <span
              style={{
                color: "#4a7fa5",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              {sceneProgress}%
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "28px",
                height: "4px",
                borderRadius: "2px",
                background:
                  sceneProgress >= (i + 1) * 12.5 ? "#4a7fa5" : "#0a1a2e",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <ForestScene
        plants={plants}
        onPlantClick={setSelectedPlant}
        baseProgress={fetchProgress}
        zoneName="Kapha Zone"
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
